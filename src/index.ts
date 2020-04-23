import '@babel/polyfill';
import config from './config';

config();

import { BotFrameworkAdapter, BotStateSet, ConversationState, MemoryStorage, UserState } from 'botbuilder';
import { MicrosoftAppCredentials } from 'botframework-connector';
import { join } from 'path';
import createAutoResetEvent from 'auto-reset-event';
import delay from 'delay';
import fetch from 'node-fetch';
import prettyMs from 'pretty-ms';
import restify from 'restify';
import serveHandler from 'serve-handler';

import * as OAuthCard from './commands/OAuthCard2';
import commands from './commands';
import reduceMap from './reduceMap';

import generateDirectLineToken from './generateDirectLineToken';
import renewDirectLineToken from './renewDirectLineToken';

const LOG_LENGTH = 20;

// Create server
const server = restify.createServer();

server.listen(process.env.PORT, () => {
  console.log(`${ server.name } listening to ${ server.url }`);
});

server.use(restify.plugins.queryParser());

MicrosoftAppCredentials.trustServiceUrl('https://api.scratch.botframework.com');
MicrosoftAppCredentials.trustServiceUrl('https://state.scratch.botframework.com');
MicrosoftAppCredentials.trustServiceUrl('https://token.scratch.botframework.com');

MicrosoftAppCredentials.trustServiceUrl('https://api.ppe.botframework.com');
MicrosoftAppCredentials.trustServiceUrl('https://state.ppe.botframework.com');
MicrosoftAppCredentials.trustServiceUrl('https://token.ppe.botframework.com');

// Create adapter
const adapter = new BotFrameworkAdapter({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD,
  oAuthEndpoint: process.env.OAUTH_ENDPOINT,
  openIdMetadata: process.env.OPENID_METADATA
});

// const storage = new MemoryStorage();
// const convoState = new ConversationState(storage);
// const userState = new UserState(storage);

// adapter.use(new BotStateSet(convoState, userState));

let numActivities = 0;
let echoTypingConversations = new Set();
const up = Date.now();
const logs = [];

server.get('/', async (_, res) => {
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

server.get('/logs', async (req, res) => {
  res.set('Content-Type', 'text/plain');

  if (req.query.format === 'simple') {
    res.send(JSON.stringify({
      logs: logs.map(log => {
        const { activity: { name, text, type, value } } = log;

        switch (type) {
          case 'event':
            return {
              ...log,
              activity: { type, name, value }
            };

          case 'message':
            return {
              ...log,
              activity: { type, text }
            };

          default:
            return {
              ...log,
              activity: { type }
            };
        }
      })
    }, null, 2));
  } else {
    res.send(JSON.stringify({
      logs
    }, null, 2));
  }
});

server.get('/health.txt', async (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('OK');
});

function trustedOrigin(origin) {
  return (
    /^https?:\/\/localhost([\/:]|$)/.test(origin)
    || /^https?:\/\/192\.168\.(0|1)\.\d{1,3}([\/:]|$)/.test(origin)
    || origin === 'null' // This is for file://index.html

    // This is for Docker tests, dotless domain
    || /^https?:\/\/[\d\w]+([\/:]|$)/.test(origin)

    || /^https?:\/\/[\d\w]+\.ngrok\.io(\/|$)/.test(origin)
    || /^https?:\/\/webchat-playground\.azurewebsites\.net(\/|$)/.test(origin)
    || /^https?:\/\/([\d\w]+\.)+botframework\.com(\/|$)/.test(origin)
    || /^https:\/\/compulim\.github\.io(\/|$)/.test(origin)
    || /^https:\/\/corinagum\.github\.io(\/|$)/.test(origin)
    || /^https:\/\/microsoft\.github\.io(\/|$)/.test(origin)
    || /^https:\/\/bfxwebchatfullbundle\.azurewebsites\.net(\/|$)/.test(origin)
    || /^https:\/\/webchattest\.blob\.core\.windows\.net(\/|$)/.test(origin)

    // This is CodePen
    || /^https:\/\/cdpn\.io(\/|$)/.test(origin)
    || /^https:\/\/s\.codepen\.io(\/|$)/.test(origin)
  );
}

server.post('/directline/token', async (req, res) => {
  const origin = req.header('origin');

  if (!trustedOrigin(origin)) {
    return res.send(403, 'not trusted origin');
  }

  const { token } = req.query;

  try {
    if (token) {
      res.send(await renewDirectLineToken(token), { 'Access-Control-Allow-Origin': '*' });
    } else {
      res.send(await generateDirectLineToken(), { 'Access-Control-Allow-Origin': '*' });
    }
  } catch (err) {
    res.send(500, err.message, { 'Access-Control-Allow-Origin': '*' });
  }

  const { DIRECT_LINE_SECRET } = process.env;

  if (token) {
    console.log(`Refreshing Direct Line token for ${ origin }`);
  } else {
    console.log(`Requesting Direct Line token for ${ origin } using secret "${ DIRECT_LINE_SECRET.substr(0, 3) }...${ DIRECT_LINE_SECRET.substr(-3) }"`);
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

  const cres = await fetch(`https://${ process.env.SPEECH_SERVICES_REGION }.api.cognitive.microsoft.com/sts/v1.0/issueToken`, {
    headers: { 'Ocp-Apim-Subscription-Key': process.env.SPEECH_SERVICES_SUBSCRIPTION_KEY },
    method: 'POST'
  });

  if (cres.status === 200) {
    const authorizationToken = await cres.text();

    res.send({
      authorizationToken,
      region: process.env.SPEECH_SERVICES_REGION,
      token: authorizationToken
    }, {
      'Access-Control-Allow-Origin': '*'
    });
  } else {
    res.send(500, {
      'Access-Control-Allow-Origin': '*'
    });
  }
});

function objectValues(map) {
  return Object.keys(map).map(x => map[x]);
}

let lastGetVersionAt = 0;
let lastGetVersionResponse = null;
const VERSION_REQUEST_VALID_FOR = 60000;

server.get('/versions/botframework-webchat', async (req, res) => {
  const now = Date.now();

  if (now - lastGetVersionAt > VERSION_REQUEST_VALID_FOR) {
    let json;

    try {
      const res = await fetch('https://registry.npmjs.org/botframework-webchat/', {
        headers: {
          accept: 'application/json'
        }
      });

      json = await res.json();
    } catch (err) {
      if (err) {
        return alert('Failed to fetch version list from NPMJS. Please check network trace for details.');
      }
    }

    const { time, versions } = json;

    lastGetVersionResponse = {
      refresh: new Date(now).toISOString(),
      versions: objectValues(versions).sort((x, y) => {
        x = new Date(time[x.version]);
        y = new Date(time[y.version]);

        return x > y ? -1 : x < y ? 1 : 0;
      }).map(({ version }) => ({
        time: time[version],
        version: version
      }))
    };

    lastGetVersionAt = now;
  }

  res.send(
    lastGetVersionResponse,
    trustedOrigin(req.header('origin')) ?
      { 'Access-Control-Allow-Origin': '*' }
    :
      {}
  );
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
server.post('/api/messages', (req, res) => {
  adapter.processActivity(req, res, async context => {
    const sendActivity = context.sendActivity.bind(context);

    logs.push({
      direction: 'incoming',
      now: new Date().toISOString(),
      activity: context.activity,
    });

    context.sendActivity = (...args) => {
      let activity = args[0];

      if (typeof activity === 'string') {
        activity = {
          type: 'message',
          text: activity
        };
      }

      logs.push({
        direction: 'outgoing',
        now: new Date().toISOString(),
        activity
      });

      return sendActivity(...args);
    };

    logs.splice(0, Math.max(0, logs.length - LOG_LENGTH));

    numActivities++;

    if (context.activity.type === 'event') {
      if (context.activity.name === 'tokens/response') {
        // Special handling for OAuth token exchange
        // This event is sent thru the non-magic code flow
        await OAuthCard.processor(context);
      } else if (context.activity.name === 'webchat/join') {
        await context.sendActivity(`Got \`webchat/join\` event, your language is \`${ (context.activity.value || {}).language }\``);
      } else if (context.activity.name === 'webchat/ping') {
        await context.sendActivity({ type: 'event', name: 'webchat/pong', value: context.activity.value });
      }
    } else if (context.activity.type === 'messageReaction') {
      const { activity: { reactionsAdded = [], reactionsRemoved = [] }} = context;
      const attachments = [...reactionsAdded, ...reactionsRemoved].map(reaction => ({
        content: `\`\`\`\n${ JSON.stringify(reaction, null, 2) }\n\`\`\``,
        contentType: 'text/markdown'
      }));

      await context.sendActivity({
        text: 'You posted',
        type: 'message',
        attachments
      });
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
          content: `\`\`\`\n${ JSON.stringify(value, null, 2) }\n\`\`\``,
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

let pregeneratedTokens = [];
const PREGENERATE_TOKEN_INTERVAL = 60000;

function setIntervalAndImmediate(fn, ms) {
  setImmediate(fn);

  return setInterval(fn, ms);
}

setIntervalAndImmediate(async () => {
  const now = Date.now();
  const { conversationId: conversationID, expires_in: expiresIn, token } = await generateDirectLineToken();
  const expiresAt = now + expiresIn * 1000;

  pregeneratedTokens.push({
    conversationID,
    expiresIn,
    expiresAt,
    token
  });

  pregeneratedTokens = pregeneratedTokens.filter(token => token.expiresAt > Date.now() - PREGENERATE_TOKEN_INTERVAL);
}, PREGENERATE_TOKEN_INTERVAL);

server.get('/directline/tokens', async (_, res) => {
  res.set('Content-Type', 'text/plain');
  res.set('Cache-Control', 'no-cache');

  res.send(JSON.stringify({
    tokens: pregeneratedTokens.map(token => {
      const message1 = `This token will expires at ${ new Date(token.expiresAt).toISOString() }`;
      const message2 = Date.now() > token.expiresAt ? 'And is expired.' : `Or in about ${ ~~((token.expiresAt - Date.now()) / 1000) } seconds`;
      const separator = new Array(Math.max(message1.length, message2.length)).fill('-').join('');

      return {
        human: [
          separator,
          message1,
          message2,
          separator
        ],
        ...token
      };
    })
  }, null, 2));
});
