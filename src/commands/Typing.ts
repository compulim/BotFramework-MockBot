import { TurnContext } from 'botbuilder';

const name = 'Typing indicator';

function sleep(ms = 2000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function help() {
  return {
    'typing 1': 'Send a typing indicator without ending it',
    'typing': 'Send a typing indicator and end it with a message'
  };
}

async function processor(context: TurnContext, arg: string = '') {
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
        text: 'I am sending typing, will send another message 2 seconds afterward.'
      });

      await context.sendActivity({
        type: 'typing'
      });

      await sleep();

      await context.sendActivity({
        type: 'message',
        text: 'This message should stop the typing indicator.'
      });

      return;
  }
}

export { help, name, processor }
