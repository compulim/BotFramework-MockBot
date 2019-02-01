import { TurnContext } from 'botbuilder';

const name = 'User ID';

function help() {
  return {
    'user': 'Dump the user ID and username',
    'user id': 'Dump the user ID',
    'user name': 'Dump the username'
  };
}

async function processor(context: TurnContext, arg: string = '') {
  switch (arg.trim().toLowerCase()) {
    case 'id':
      await context.sendActivity({
        text: `Your user ID is \`${ context.activity.from.id }\`.`,
        type: 'message'
      });

      break;

    case 'name':
      await context.sendActivity({
        text: `Your user name is "${ context.activity.from.name }".`,
        type: 'message'
      });

      break;

    default:
      await context.sendActivity({
        text: `Your user ID is \`${ context.activity.from.id }\`.\n\nAnd your user name is "${ context.activity.from.name }".`,
        type: 'message'
      });

      break;
  }
}

export { help, name, processor }
