import { TurnContext } from 'botbuilder';

const name = 'Suggested actions';

function help() {
  return {
    'card-actions': 'Show a suggested action with different card actions'
  };
}

async function processor(context: TurnContext, arg: string) {
  await context.sendActivity({
    type: 'message',
    textFormat: 'plain',
    text: 'Please select one of the card actions below',
    suggestedActions: {
      actions: [
        {
          title: '"openUrl"',
          type: 'openUrl',
          value: 'https://microsoft.com/',
        }
      ],
      // TODO: Should we fill in the "to"?
      to: []
    }
  });
}

export { help, name, processor }
