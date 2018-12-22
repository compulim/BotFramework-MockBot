import { TurnContext } from 'botbuilder';

const name = 'Input hint';

function help() {
  return {
    'input-hint accepting': 'Send an activity with input hint set to "accepting input"',
    'input-hint expecting': 'Send an activity with input hint set to "expecting input"',
    'input-hint ignoring': 'Send an activity with input hint set to "ignoring input"'
  };
}

async function processor(context: TurnContext, line: string) {
  switch ((line || '').trim().substr(0, 1)) {
    case 'a':
      await context.sendActivity({
        inputHint: 'acceptingInput',
        text: 'This activity is accepting input.',
        type: 'message'
      });

      break;

    case 'e':
      await context.sendActivity({
        inputHint: 'expectingInput',
        text: 'This activity is expecting input.\n\nIt should start the microphone if it was from a microphone.',
        type: 'message'
      });

      break;

    default:
      await context.sendActivity({
        inputHint: 'ignoringInput',
        text: 'This activity is ignoring input.\n\nIt should not start the microphone.',
        type: 'message'
      });

      break;

  }
}

export { help, name, processor }
