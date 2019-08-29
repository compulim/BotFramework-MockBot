import '@babel/polyfill';
import config from './config';

config();

import { BotFrameworkAdapter, BotStateSet, ConversationState, MemoryStorage, UserState } from 'botbuilder';
import { BotFrameworkStreamingAdapter } from 'botbuilder-streaming-extensions';
import { MicrosoftAppCredentials } from 'botframework-connector';
import { join } from 'path';
import createAutoResetEvent from 'auto-reset-event';
import delay from 'delay';
import fetch from 'node-fetch';
import prettyMs from 'pretty-ms';
import restify from 'restify';
import serveHandler from 'serve-handler';

import { NodeWebSocket } from 'botframework-streaming-extensions';
import { request } from 'http';
import { URL } from 'url';
import { Watershed } from 'watershed';

import Bot from './Bot';

import generateDirectLineToken from './generateDirectLineToken';
import renewDirectLineToken from './renewDirectLineToken';

// Create server
const server = restify.createServer({ handleUpgrades: true });

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

const {
  DIRECTLINE_EXTENSION_VERSION
} = process.env;

const ADAPTER_SETTINGS = {
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD,
  oAuthEndpoint: process.env.OAUTH_ENDPOINT,
  openIdMetadata: process.env.OPENID_METADATA
};

const USE_STREAMING_EXTENSIONS = true;

// Create bot
const bot = new Bot();

// Create adapter
let adapter;

if (USE_STREAMING_EXTENSIONS) {
  adapter = new BotFrameworkStreamingAdapter(bot as any);

  // Checks if running under Azure
  if (DIRECTLINE_EXTENSION_VERSION) {
    console.log('Running with streaming extension running via Direct Line ASE.');
    adapter.connectNamedPipe();
  } else {
    console.log('Running with streaming extension running via proxy.');
    connectToASEViaWebSocketProxy(adapter);
  }
} else {
  console.log('Running without streaming extension.');
  adapter = new BotFrameworkAdapter(ADAPTER_SETTINGS);
}

// const adapter = new BotFrameworkStreamingAdapter(
//   activityHandler,
//   console,
//   ADAPTER_SETTINGS
// );

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
    res.send({
      region: process.env.SPEECH_SERVICES_REGION,
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
if (USE_STREAMING_EXTENSIONS) {
  // server.get('/api/messages', (req, res) => {
  //   adapter.connectWebSocket(req, res, ADAPTER_SETTINGS);
  // });
} else {
  server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, context => bot.run(context));
  });
}

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

// server.get('/directline/streamingextensions', async (req, res) => {
//   return await adapter.connectWebSocket(req, res, ADAPTER_SETTINGS);
// });

function connectToASEViaWebSocketProxy(adapter, urlString = 'https://webchat-mockbot-proxy.azurewebsites.net/') {
  const url = new URL(urlString);

  return new Promise((resolve, reject) => {
    const ws = new Watershed();
    const key = ws.generateKey();
    const req = request({
      headers: {
        connection: 'upgrade',
        upgrade: 'websocket',
        'sec-websocket-key': key,
        'sec-websocket-version': '13'
      },
      hostname: url.hostname,
      port: url.port || 80
    });

    req.on('upgrade', async (res, socket, head) => {
      console.log(`Connected Web Socket to proxy`);

      const wsc = ws.connect(res, socket, head, key);

      await adapter.startWebSocket(new NodeWebSocket(wsc));

      socket.on('close', hadError => !hadError && resolve());
      socket.on('error', reject);
    });

    req.on('error', err => {
      console.error(err);
      reject(err);
    });

    req.end();

    console.log(`Connecting Web Socket to ${ url }`);
  });
}
