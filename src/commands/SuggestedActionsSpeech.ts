import { TurnContext } from 'botbuilder';

const name = 'Speech';

function help() {
  return {
    'suggested action speech': 'Test speech with suggested actions'
  };
}

async function processor(context: TurnContext) {
  await context.sendActivity({
    inputHint: 'expectingInput',
    locale: 'en-US',
    speak: `<speak
        version="1.0"
        xmlns="https://www.w3.org/2001/10/synthesis"
        xmlns:mstts="https://www.w3.org/2001/mstts"
        xml:lang="en-US"
      >
        <voice name="en-US-JessaNeural">
          <mstts:express-as type="cheerful">Select an option below: op1, op2</mstts:express-as>
        </voice>
      </speak>`,
    text: 'Select an option below',
    type: 'message',
    suggestedActions: {
      actions: [
        {
          title: 'Option 1',
          type: 'imBack',
          value: 'postback imback-string',

        },
        {
          title: 'Option 2',
          type: 'postBack',
          value: 'postback postback-string',
        }
      ],
      to: []
    }
  });
}

export { help, name, processor }
