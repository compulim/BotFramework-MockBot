import 'babel-polyfill';
import config from './config';

config();

import { BotFrameworkAdapter, BotStateSet, ConversationState, MemoryStorage, UserState } from 'botbuilder';
import { join } from 'path';
import { randomBytes } from 'crypto';
import createAutoResetEvent from 'auto-reset-event';
import delay from 'delay';
import fetch from 'node-fetch';
import prettyMs from 'pretty-ms';
import restify from 'restify';
import serveHandler from 'serve-handler';

import commands from './commands';
import * as OAuthCard from './commands/OAuthCard2';
import reduceMap from './reduceMap';

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

// const storage = new MemoryStorage();
// const convoState = new ConversationState(storage);
// const userState = new UserState(storage);

// adapter.use(new BotStateSet(convoState, userState));

let numActivities = 0;
let echoTypingConversations = new Set();
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
    || /^https?:\/\/webchat([\/:]|$)/.test(origin)
    || /^https?:\/\/[\d\w]+\.ngrok\.io([\/:]|$)/.test(origin)
    || /^https?:\/\/webchat-playground\.azurewebsites\.net([\/:]|$)/.test(origin)
    || /^https?:\/\/([\d\w]+\.)+botframework\.com([\/:]|$)/.test(origin)
    || /^https:\/\/compulim\.github\.io/.test(origin)
    || /^https:\/\/microsoft\.github\.io/.test(origin)
    || /^https:\/\/bfxwebchatfullbundle\.azurewebsites\.net/.test(origin)
  );
}

async function createUserID() {
  return new Promise((resolve, reject) => {
    randomBytes(16, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(`dl_${ buffer.toString('hex') }`);
      }
    })
  });
}

server.post('/directline/token', async (req, res) => {
  const origin = req.header('origin');

  if (!trustedOrigin(origin)) {
    return res.send(403, 'not trusted origin');
  }

  const userID = await createUserID();
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
        // body: JSON.stringify({ TrustedOrigins: [origin] }),
        headers: {
          authorization: `Bearer ${ token }`,
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
    } else {
      cres = await fetch('https://directline.botframework.com/v3/directline/tokens/generate', {
        // body: JSON.stringify({ TrustedOrigins: [origin] }),
        body: JSON.stringify({ User: { Id: userID } }),
        headers: {
          authorization: `Bearer ${ process.env.DIRECT_LINE_SECRET }`,
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
    }

    if (cres.status === 200) {
      const json = await cres.json();

      if ('error' in json) {
        res.send(500, { 'Access-Control-Allow-Origin': '*' });
      } else {
        // TODO: In latest build of Web Chat, we get user ID out of the token via JWT.decode
        //       We can safely remove userID from the response
        res.send({
          ...json,
          userID
        }, { 'Access-Control-Allow-Origin': '*' });
      }
    } else {
      res.send(500, `Direct Line service returned ${ cres.status } while exchanging for token`, { 'Access-Control-Allow-Origin': '*' });
    }
  } catch (err) {
    res.send(500);
  }
});

server.post('/bingspeech/token', async (req, res) => {
  const origin = req.header('origin');

  if (!trustedOrigin(origin)) {
    return res.send(403, 'not trusted origin');
  }

  console.log(`Requesting speech token for ${ origin }`);

  const cres = await fetch('https://api.cognitive.microsoft.com/sts/v1.0/issueToken', {
    headers: { 'Ocp-Apim-Subscription-Key': process.env.BING_SPEECH_SUBSCRIPTION_KEY },
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

server.post('/speechservices/token', async (req, res) => {
  const origin = req.header('origin');

  if (!trustedOrigin(origin)) {
    return res.send(403, 'not trusted origin');
  }

  console.log(`Requesting speech token for ${ origin }`);

  const cres = await fetch('https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken', {
    headers: { 'Ocp-Apim-Subscription-Key': process.env.SPEECH_SERVICES_SUBSCRIPTION_KEY },
    method: 'POST'
  });

  if (cres.status === 200) {
    res.send({
      region: 'westus',
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

const acquireSlowQueue = createAutoResetEvent();

server.get('/public/*', async (req, res) => {
  if ('slow' in req.query) {
    res.noCache();

    const release = await acquireSlowQueue();

    await delay(1000);
    release();
  }

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
    } else if (context.activity.type === 'event') {
      if (context.activity.name === 'tokens/response') {
        // Special handling for OAuth token exchange
        // This event is sent thru the non-magic code flow
        await OAuthCard.processor(context);
      } else if (context.activity.name === 'webchat/join') {
        await context.sendActivity(`Got \`webchat/join\` event, your language is \`${ (context.activity.value || {}).language }\``);
      }
    } else if (context.activity.type === 'message') {
      const { activity: { attachments = [], text } } = context;
      const cleanedText = (text || '').trim().replace(/\.$/, '');
      const command = commands.find(({ pattern }) => pattern.test(cleanedText));

      if (command) {
        const { mode, pattern, processor } = command;
        const match = pattern.exec(cleanedText);

        if (mode === 'line') {
          await processor(context, cleanedText);
        } else {
          await processor(context, ...[].slice.call(match, 1));
        }
      } else if (/^echo-typing$/i.test(cleanedText)) {
        // We should "echoTyping" in a per-conversation basis
        const { id: conversationID } = context.activity.conversation;

        if (echoTypingConversations.has(conversationID)) {
          echoTypingConversations.delete(conversationID);
          await context.sendActivity('Will stop echoing `"typing"` event');
        } else {
          echoTypingConversations.add(conversationID);
          await context.sendActivity('Will echo `"typing"` event');
        }
      } else if (/^help$/i.test(cleanedText)) {
        const attachments = commands.map(({ help, name }) => {
          return {
            contentType: 'application/vnd.microsoft.card.thumbnail',
            content: {
              buttons: reduceMap(
                help(),
                (result: [], title: string, value: string) => [
                  ...result,
                  {
                    title,
                    type: 'imBack',
                    value
                  }
                ],
                []
              ).sort(({ title: x }, { title: y }) => x > y ? 1 : x < y ? -1 : 0),
              title: name
            }
          };
        });

        await context.sendActivity({
          attachments: attachments.sort(({ content: { title: x } }, { content: { title: y } }) => x > y ? 1 : x < y ? -1 : 0)
        });
      } else if (/^help simple$/i.test(cleanedText)) {
        await context.sendActivity(`### Commands\r\n\r\n${ commands.map(({ pattern }) => `- \`${ pattern.source }\``).sort().join('\r\n') }`);
      } else if (attachments.length) {
        const { processor } = commands.find(({ pattern }) => pattern.test('upload'));

        await processor(context, attachments);
      } else if (context.activity.value) {

        const { text, value } = context.activity;
        const attachments = [];

        text && attachments.push({
          content: text,
          contentType: 'text/plain'
        });

        value && attachments.push({
          content: `\`\`\`\r\n${ JSON.stringify(value, null, 2) }\r\n\`\`\``,
          contentType: 'text/markdown'
        });

        await context.sendActivity({
          text: 'You posted',
          type: 'message',
          attachments
        });
      } else {
        await context.sendActivity({
          speak: `Unknown command: I don't know ${ cleanedText }. You can say "help" to learn more.`,
          text: `Unknown command: \`${ cleanedText }\`.\r\n\r\nType \`help\` to learn more.`,
          type: 'message'
        });
      }
    } else if (context.activity.type === 'typing' && echoTypingConversations.has(context.activity.conversation.id)) {
      await context.sendActivity({ type: 'typing' });
    }
  });
});
