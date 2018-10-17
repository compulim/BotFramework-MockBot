import { TurnContext } from 'botbuilder';

const name = 'Localization';

function help() {
  return {
    'localization': 'Find out user locale'
  };
}

async function processor(context: TurnContext) {
  await context.sendActivity({
    type: 'message',
    textFormat: 'markdown',
    text: `You are saying in *${ context.activity.locale }*`
  });
}

export { help, name, processor }
