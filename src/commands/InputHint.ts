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
        inputHint: 'acceptinginput',
        text: 'This activity contains input hint of "accepting input."',
        type: 'message'
      });

      break;

    case 'e':
      await context.sendActivity({
        inputHint: 'expectinginput',
        text: 'This activity contains input hint of "expecting input."',
        type: 'message'
      });

      break;

    default:
      await context.sendActivity({
        inputHint: 'ignoringinput',
        text: 'This activity contains input hint of "ignoring input."',
        type: 'message'
      });

      break;

  }
}

export { help, name, processor }
