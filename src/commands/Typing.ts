import { TurnContext } from 'botbuilder';

function sleep(ms = 2000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function (context: TurnContext, arg: string) {
  switch (arg.trim()) {
    case '1':
      await context.sendActivity({
        type: 'message',
        text: 'Typing indicator should go away after 5 seconds.'
      });

      await context.sendActivity({ type: 'typing' });

      break;

    default:
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

      return;
  }
}
