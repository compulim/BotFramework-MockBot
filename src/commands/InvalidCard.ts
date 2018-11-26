import { TurnContext } from 'botbuilder';

const name = 'Invalid adaptive card';

function help() {
  return {
    'invalidCard': 'This is an invalid card and should fail to display.'
  };
}

async function processor(context: TurnContext) {
  const { PUBLIC_URL } = process.env;

  await context.sendActivity({
    type: 'message',
    attachmentLayout: 'carousel',
    attachments: [{
        contentType: 'application/vnd.microsoft.card.adaptive',
        content: 5
    }]
  });
}

export { help, name, processor }
