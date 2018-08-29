import { TurnContext } from 'botbuilder';

function sleep(ms = 2000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function (context: TurnContext) {
  const { PUBLIC_URL } = process.env;

  await context.sendActivity({
    type: 'message',
    text: 'Please wait while we load your account profile.'
  });

  await context.sendActivity({
    type: 'typing'
  });

  await sleep();

  await context.sendActivity({
    type: 'message',
    text: 'Hello, John Doe!'
  });
}
