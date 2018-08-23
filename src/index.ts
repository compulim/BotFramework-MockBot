import 'babel-polyfill';
import config from './config';

config();

import { BotFrameworkAdapter } from 'botbuilder';
import { join } from 'path';
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

server.get('/public/:filename', async (req, res) => {
  await serveHandler(req, res, {
    path: join(__dirname, './public')
  });
});

server.get('/public/assets/:filename', async (req, res) => {
  await serveHandler(req, res, {
    path: join(__dirname, './public/assets')
  });
});

// Listen for incoming requests
server.post('/api/messages/', (req, res) => {
  adapter.processActivity(req, res, async context => {
    numActivities++;

    // On "conversationUpdate"-type activities this bot will send a greeting message to users joining the conversation.
    if (
      context.activity.type === 'conversationUpdate'
      && context.activity.membersAdded[0].id !== 'hawo-mockbot'
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
