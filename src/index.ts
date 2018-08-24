import 'babel-polyfill';
import config from './config';

config();

import { BotFrameworkAdapter } from 'botbuilder';
import { join } from 'path';
import fetch from 'node-fetch';
import prettyMs from 'pretty-ms';
import restify from 'restify';
import serveHandler from 'serve-handler';

import commands from './commands';

// Create server
const server = restify.createServer();

server.listen(process.env.PORT, () => {
  console.log(`${ server.name } listening to ${ server.url }`);
});

// Create adapter
const adapter = new BotFrameworkAdapter({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

let numActivities = 0;
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

server.post('/token-generate', async (req, res) => {
  const origin = req.header('origin');

  console.log(`requesting token from ${ origin }`);

  if (!trustedOrigin(origin)) {
    return res.send(403, 'not trusted origin');
  }

  try {
    const cres = await fetch('https://directline.botframework.com/v3/directline/tokens/generate', {
      headers: {
        authorization: `Bearer ${ process.env.DIRECT_LINE_SECRET }`
      },
      method: 'POST'
    });

    const json = await cres.json();

    if ('error' in json) {
      res.send(500);
    } else {
      res.send(json, {
        'Access-Control-Allow-Origin': '*'
      });
    }
  } catch (err) {
    res.send(500);
  }
});

server.post('/token-refresh/:token', async (req, res) => {
  const origin = req.header('origin');

  console.log(`refreshing token from ${ origin }`);

  if (!trustedOrigin(origin)) {
    return res.send(403, 'not trusted origin');
  }

  try {
    const cres = await fetch('https://directline.botframework.com/v3/directline/tokens/refresh', {
      headers: {
        authorization: `Bearer ${ req.params.token }`
      },
      method: 'POST'
    });

    const json = await cres.json();

    if ('error' in json) {
      res.send(500);
    } else {
      res.send(json, {
        'Access-Control-Allow-Origin': '*'
      });
    }
  } catch (err) {
    res.send(500);
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
      && context.activity.membersAdded[0].id !== 'webchat-mockbot'
    ) {
      await context.sendActivity(`Welcome to Mockbot v4!`);
    } else if (context.activity.type === 'message') {
      const { activity: { text } } = context;
      const command = commands.find(({ pattern }) => pattern.test(text));

      if (command) {
        const { pattern, processor } = command;
        const match = pattern.exec(text);

        await processor(context, ...[].slice.call(match, 1));
      } else if (text === 'help') {
        await context.sendActivity(`### Commands\r\n\r\n${ commands.map(({ pattern }) => `- \`${ pattern.source }\``).sort().join('\r\n') }`);
      } else {
        await context.sendActivity(`Unknown command: \`${ text }\``);
      }
    }
  });
});
