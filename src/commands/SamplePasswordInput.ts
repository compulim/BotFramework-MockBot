import { TurnContext } from 'botbuilder';

const name = 'Demo for password input sample';

function help() {
  return {
    'sample:password-input': 'Demo for password input sample'
  };
}

async function processor(context: TurnContext) {
  context.sendActivity({
    name: 'passwordInput',
    type: 'event'
  });
}

export { help, name, processor }
