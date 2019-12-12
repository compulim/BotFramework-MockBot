import '@babel/polyfill';
import config from './config';

config();

import { BotFrameworkAdapter } from 'botbuilder';
import { join } from 'path';
import { MicrosoftAppCredentials } from 'botframework-connector';
import createAutoResetEvent from 'auto-reset-event';
import delay from 'delay';
import fetch from 'node-fetch';
import prettyMs from 'pretty-ms';
import restify from 'restify';
import serveHandler from 'serve-handler';

import Bot from './Bot';

import generateDirectLineToken from './generateDirectLineToken';
import renewDirectLineToken from './renewDirectLineToken';

const {
  BING_SPEECH_SUBSCRIPTION_KEY,
  COGNITIVE_SERVICE_KEY,
  COGNITIVE_SERVICE_REGION,
  DIRECT_LINE_SECRET,
  PORT = 3978
} = process.env;

// Create server
const server = restify.createServer({ handleUpgrades: true });

server.use(restify.plugins.queryParser());

MicrosoftAppCredentials.trustServiceUrl('https://api.scratch.botframework.com');
MicrosoftAppCredentials.trustServiceUrl('https://state.scratch.botframework.com');
MicrosoftAppCredentials.trustServiceUrl('https://token.scratch.botframework.com');

MicrosoftAppCredentials.trustServiceUrl('https://api.ppe.botframework.com');
MicrosoftAppCredentials.trustServiceUrl('https://state.ppe.botframework.com');
MicrosoftAppCredentials.trustServiceUrl('https://token.ppe.botframework.com');

// const {
//   DIRECTLINE_EXTENSION_VERSION
// } = process.env;

const ADAPTER_SETTINGS = {
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD,
  enableWebSockets: true,
  oAuthEndpoint: process.env.OAUTH_ENDPOINT,
  openIdMetadata: process.env.OPENID_METADATA
};

// Create bot
const bot = new Bot();

// Create adapter
const adapter = new BotFrameworkAdapter(ADAPTER_SETTINGS);

// const storage = new MemoryStorage();
// const convoState = new ConversationState(storage);
// const userState = new UserState(storage);

// adapter.use(new BotStateSet(convoState, userState));

const up = Date.now();

server.get('/', async (_, res) => {
  const message = `MockBot v4 is up since ${ prettyMs(Date.now() - up) } ago, processed ${ bot.numActivities } activities.`;
  const separator = new Array(message.length).fill('-').join('');

  res.set('Content-Type', 'text/plain');
  res.send(JSON.stringify({
    human: [
      separator,
      message,
      separator
    ],
    computer: {
      numActivities: bot.numActivities,
      up
    }
  }, null, 2));
});

server.get('/logs', async (req, res) => {
  res.set('Content-Type', 'text/plain');

  if (req.query.format === 'simple') {
    res.send(JSON.stringify({
      logs: bot.logs.map(log => {
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
      logs: bot.logs
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

    // This is for Docker tests
    || /^https?:\/\/webchat([\/:]|$)/.test(origin)

    || /^https?:\/\/[\d\w]+\.ngrok\.io(\/|$)/.test(origin)
    || /^https?:\/\/webchat-playground\.azurewebsites\.net(\/|$)/.test(origin)
    || /^https?:\/\/([\d\w]+\.)+botframework\.com(\/|$)/.test(origin)
    || /^https:\/\/compulim\.github\.io(\/|$)/.test(origin)
    || /^https:\/\/microsoft\.github\.io(\/|$)/.test(origin)
    || /^https:\/\/bfxwebchatfullbundle\.azurewebsites\.net(\/|$)/.test(origin)
    || /^https:\/\/webchattest\.blob\.core\.windows\.net(\/|$)/.test(origin)
    || /^https:\/\/webchat-mockbot-streaming\.azurewebsites\.net(\/|$)/.test(origin)

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
    headers: { 'Ocp-Apim-Subscription-Key': BING_SPEECH_SUBSCRIPTION_KEY },
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

  const cres = await fetch(`https://${ COGNITIVE_SERVICE_REGION }.api.cognitive.microsoft.com/sts/v1.0/issueToken`, {
    headers: { 'Ocp-Apim-Subscription-Key': COGNITIVE_SERVICE_KEY },
    method: 'POST'
  });

  if (cres.status === 200) {
    res.send({
      region: COGNITIVE_SERVICE_REGION,
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
server.get('/api/messages', (req, res) => {
  console.log(`GET /api/messages`);

  // adapter.processActivity(req, res, context => bot.run(context));

  const upgrade = res.claimUpgrade();

  adapter.useWebSocket(req, upgrade.socket, upgrade.head, context => bot.run(context));
});

server.post('/api/messages', (req, res) => {
  adapter.processActivity(req, res, context => bot.run(context));
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

server.listen(PORT, () => {
  console.log(`${ server.name } listening to ${ server.url }`);
});
