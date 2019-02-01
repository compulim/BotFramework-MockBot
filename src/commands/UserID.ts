import { TurnContext } from 'botbuilder';

const name = 'User ID';

function help() {
  return {
    'userid': 'Dump the user ID and username'
  };
}

async function processor(context: TurnContext) {
  await context.sendActivity({
    text: `Your user ID is \`${ context.activity.from.id }\`.\n\nAnd your user name is "${ context.activity.from.name }".`,
    type: 'message'
  });
}

export { help, name, processor }
