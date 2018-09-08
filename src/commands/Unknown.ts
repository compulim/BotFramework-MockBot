import { TurnContext } from 'botbuilder';

export default async function (context: TurnContext, arg: string = '') {
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
