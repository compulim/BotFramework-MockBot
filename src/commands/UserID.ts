import { TurnContext } from 'botbuilder';

const name = 'User ID';

function help() {
  return {
    'userid': 'Dump the user ID'
  };
}

async function processor(context: TurnContext) {
  await context.sendActivity({
    text: `Your user ID is \`${ context.activity.from.id }\``,
    type: 'message'
  });
}

export { help, name, processor }
