import { TurnContext } from 'botbuilder';

const name = 'Unknown type of activity or attachments';

function help() {
  return {
    'unknown activity': 'Show an activity of unknown type',
    'unknown attachment': 'Show an attachment of unknown type'
  };
}

async function processor(context: TurnContext, arg: string = '') {
  switch (arg.trim().toLowerCase()) {
    case 'attachment':
      await context.sendActivity({
        type: 'message',
        attachments: [{
          contentType: 'x-unknown-attachment',
          content: {}
        }]
      });

      break;

    case 'activity':
    default:
      await context.sendActivity({
        type: 'x-unknown-activity',
        attachments: [{
          contentType: 'x-unknown-attachment',
          content: {}
        }]
      });

      break;
  }
}

export { help, name, processor }
