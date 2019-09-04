import { TurnContext } from 'botbuilder';

const name = 'Input hint';

function help() {
  return {
    'input-hint accepting': 'Send an activity with input hint set to "accepting input"',
    'input-hint expecting': 'Send an activity with input hint set to "expecting input"',
    'input-hint ignoring': 'Send an activity with input hint set to "ignoring input"'
  };
}

function sleep(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendInputHint(adapter, reference, inputHint) {
  await adapter.continueConversation(reference, async context => {
    await sleep(1000);

    try {
      switch ((inputHint || '').trim().substr(0, 1)) {
        case 'a':
          console.log({
            inputHint: 'acceptingInput',
            text: 'This activity is accepting input.',
            type: 'message'
          });

          await context.sendActivity({
            inputHint: 'acceptingInput',
            text: 'This activity is accepting input.',
            type: 'message'
          });

          break;

        case 'e':
          console.log({
            inputHint: 'expectingInput',
            text: 'This activity is expecting input.\n\nIt should start the microphone if it was from a microphone.',
            type: 'message'
          });

          await context.sendActivity({
            inputHint: 'expectingInput',
            text: 'This activity is expecting input.\n\nIt should start the microphone if it was from a microphone.',
            type: 'message'
          });

          break;

        default:
          console.log({
            inputHint: 'ignoringInput',
            text: 'This activity is ignoring input.\n\nIt should not start the microphone.',
            type: 'message'
          });

          await context.sendActivity({
            inputHint: 'ignoringInput',
            text: 'This activity is ignoring input.\n\nIt should not start the microphone.',
            type: 'message'
          });

          break;
      }
    } catch (err) {
      console.error(err);
    }
  });
}

async function processor(context: TurnContext, ...inputHints: string[]) {
  console.log('input hint: processor');

  (async function (adapter, reference) {
    console.log(adapter);
    console.log(reference);

    // This loop is intentionally executed in a serial manner (instead of using Promise.all for parallelism)
    while (inputHints.length) {
      const inputHint = inputHints.shift();

      inputHint && await sendInputHint(adapter, reference, inputHint);
    }
  })(context.adapter, TurnContext.getConversationReference(context.activity));
}

export { help, name, processor }
