import { TurnContext } from 'botbuilder';

const name = 'Suggested actions';

function help() {
  return {
    'suggested-actions': 'Show a suggested actions demo'
  };
}

async function processor(context: TurnContext, arg: string) {
  const { PUBLIC_URL } = process.env;

  if (arg) {
    await context.sendActivity({
      type: 'message',
      text: `You selected "${ arg.trim() }"`
    });
  } else {
    await context.sendActivity({
      type: 'message',
      textFormat: 'plain',
      text: 'Message Text',
      suggestedActions: {
        actions: [
          {
            type: 'imBack',
            title: 'Blue',
            value: 'suggested-actions Blue',
            image: `${ PUBLIC_URL }assets/square-icon.png`
          },
          {
            type: 'imBack',
            title: 'Red',
            value: 'suggested-actions Red',
            image: `${ PUBLIC_URL }assets/square-icon-red.png`
          },
          {
            type: 'imBack',
            title: 'Green',
            value: 'suggested-actions Green',
            image: `${ PUBLIC_URL }assets/square-icon-green.png`
          }
        ],
        to: []
      }
    });
  }
}

export { help, name, processor }
