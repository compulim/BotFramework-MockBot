import { TurnContext } from 'botbuilder';

const name = 'Sign-in card';

function help() {
  return {
    'signin': 'Show a signin card'
  };
}

async function processor(context: TurnContext) {
  await context.sendActivity({
    type: 'message',
    attachments: [{
      contentType: 'application/vnd.microsoft.card.signin',
      content: {
        text: 'Login to signin sample',
        buttons: [{
          type: 'signin',
          title: 'Signin',
          value: 'https://login.live.com/'
        }]
      }
    }]
  });
}

export { help, name, processor }
