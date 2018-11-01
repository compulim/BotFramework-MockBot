import { TurnContext } from 'botbuilder';

const name = 'Empty card';

function help() {
  return {
    'emptycard': 'Show a empty message with suggested actions'
  };
}

async function processor(context: TurnContext) {
  const { PUBLIC_URL } = process.env;

  await context.sendActivity({
    text: '',
    type: 'message',
    suggestedActions: {
      actions: [{
        type: 'imBack',
        title: 'Blue',
        value: 'Blue',
        image: `${ PUBLIC_URL }assets/square-icon.png`
      }, {
        type: 'imBack',
        title: 'Red',
        value: 'Red',
        image: `${ PUBLIC_URL }assets/square-icon-red.png`
      }, {
        type: 'imBack',
        title: 'Green',
        value: 'Green',
        image: `${ PUBLIC_URL }assets/square-icon-green.png`
      }],
      // TODO: Should we fill in the "to"?
      to: []
    }
  });
}

export { help, name, processor }
