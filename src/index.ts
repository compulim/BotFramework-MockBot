import 'babel-polyfill';
import config from './config';

config();

import { BotFrameworkAdapter, BotStateSet, ConversationState, MemoryStorage, UserState } from 'botbuilder';
import { join } from 'path';
import fetch from 'node-fetch';
import prettyMs from 'pretty-ms';
import restify from 'restify';
import serveHandler from 'serve-handler';

import commands from './commands';
import OAuthCard from './commands/OAuthCard';

// Create server
const server = restify.createServer();

server.listen(process.env.PORT, () => {
  console.log(`${ server.name } listening to ${ server.url }`);
});

server.use(restify.plugins.queryParser());

// Create adapter
const adapter = new BotFrameworkAdapter({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const storage = new MemoryStorage();
const convoState = new ConversationState(storage);
const userState = new UserState(storage);

adapter.use(new BotStateSet(convoState, userState));

let numActivities = 0;
let echoTyping = false;
const up = Date.now();

server.get('/', async (req, res) => {
  const message = `MockBot v4 is up since ${ prettyMs(Date.now() - up) } ago, processed ${ numActivities } activities.`;
  const separator = new Array(message.length).fill('-').join('');

  res.set('Content-Type', 'text/plain');
  res.send(JSON.stringify({
    human: [
      separator,
      message,
      separator
    ],
    computer: {
      numActivities,
      up
    }
  }, null, 2));
});

server.get('/health.txt', async (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('OK');
});

function trustedOrigin(origin) {
  return (
    /^https?:\/\/localhost([\/:]|$)/.test(origin)
    || /^https?:\/\/[\d\w]+\.ngrok\.io([\/:]|$)/.test(origin)
    || /^https?:\/\/webchat-playground\.azurewebsites\.net([\/:]|$)/.test(origin)
    || /^https?:\/\/([\d\w]+\.)+botframework\.com([\/:]|$)/.test(origin)
  );
}

server.post('/directline/token', async (req, res) => {
  const origin = req.header('origin');

  if (!trustedOrigin(origin)) {
    return res.send(403, 'not trusted origin');
  }

  const { token } = req.query;

  if (token) {
    console.log(`Refreshing Direct Line token for ${ origin }`);
  } else {
    console.log(`Requesting Direct Line token for ${ origin }`);
  }

  try {
    let cres;

    if (token) {
      cres = await fetch('https://directline.botframework.com/v3/directline/tokens/refresh', {
        body: JSON.stringify({ TrustedOrigins: [origin] }),
        headers: {
          authorization: `Bearer ${ token }`,
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
    } else {
      cres = await fetch('https://directline.botframework.com/v3/directline/tokens/generate', {
        body: JSON.stringify({ TrustedOrigins: [origin] }),
        headers: {
          authorization: `Bearer ${ process.env.DIRECT_LINE_SECRET }`,
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
    }

    const json = await cres.json();

    if ('error' in json) {
      res.send(500, {
        'Access-Control-Allow-Origin': '*'
      });
    } else {
      res.send(json, {
        'Access-Control-Allow-Origin': '*'
      });
    }
  } catch (err) {
    res.send(500);
  }
});

server.post('/speech/token', async (req, res) => {
  const origin = req.header('origin');

  if (!trustedOrigin(origin)) {
    return res.send(403, 'not trusted origin');
  }

  console.log(`Requesting speech token for ${ origin }`);

  const cres = await fetch('https://api.cognitive.microsoft.com/sts/v1.0/issueToken', {
    headers: { 'Ocp-Apim-Subscription-Key': process.env.SPEECH_API_KEY },
    method: 'POST'
  });

  if (cres.status === 200) {
    res.send({
      token: await cres.text()
    }, {
      'Access-Control-Allow-Origin': '*'
    });
  } else {
    res.send(500, {
      'Access-Control-Allow-Origin': '*'
    });
  }
});

server.get('/public/*', async (req, res) => {
  await serveHandler(req, res, {
    path: join(__dirname, './public')
  });
});

// Listen for incoming requests
server.post('/api/messages/', (req, res) => {
  adapter.processActivity(req, res, async context => {
    numActivities++;

    // On "conversationUpdate"-type activities this bot will send a greeting message to users joining the conversation.
    if (
      context.activity.type === 'conversationUpdate'
      && !/^webchat\-mockbot/.test(context.activity.membersAdded[0].id)
    ) {
      await context.sendActivity(`Welcome to Mockbot v4, ${ context.activity.membersAdded.map(({ id }) => id).join(', ') }!`);
    } else if (context.activity.type === 'event' && context.activity.name === 'tokens/response') {
      // Special handling for OAuth token exchange
      // This event is sent thru the non-magic code flow
      await OAuthCard(context);
    } else if (context.activity.type === 'message') {
      const { activity: { attachments = [], text } } = context;
      const cleanedText = (text || '').trim().replace(/\.$/, '');
      const command = commands.find(({ pattern }) => pattern.test(cleanedText));

      if (command) {
        const { pattern, processor } = command;
        const match = pattern.exec(cleanedText);

        await processor(context, ...[].slice.call(match, 1));
      } else if (/^echo-typing$/i.test(cleanedText)) {
        echoTyping = !echoTyping;

        if (echoTyping) {
          await context.sendActivity('Will echo `"typing"` event');
        } else {
          await context.sendActivity('Will stop echoing `"typing"` event');
        }
      } else if (/^help$/i.test(cleanedText)) {
        await context.sendActivity(`### Commands\r\n\r\n${ commands.map(({ pattern }) => `- \`${ pattern.source }\``).sort().join('\r\n') }`);
      } else if (attachments.length) {
        const { processor } = commands.find(({ pattern }) => pattern.test('upload'));

        await processor(context, attachments);
      } else if (context.activity.value) {
        await context.sendActivity(`You posted\r\n\r\n\`\`\`\r\n${ JSON.stringify(context.activity.value, null, 2) }\r\n\`\`\``);
      } else {
        await context.sendActivity(`Unknown command: \`${ cleanedText }\``);
      }
    } else if (context.activity.type === 'typing' && echoTyping) {
      await context.sendActivity({ type: 'typing' });
    }
  });
});
