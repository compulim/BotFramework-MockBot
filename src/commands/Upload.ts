import { Attachment, TurnContext } from 'botbuilder';

export default async function (context: TurnContext, attachments: Attachment[]) {
  if (attachments.length) {
    await context.sendActivity({
      text: 'You have uploaded:',
      type: 'message',
      attachments: attachments.map(({ contentUrl, name }) => ({
        contentType: 'application/octet-stream',
        contentUrl,
        name
      }))
    });
  } else {
    await context.sendActivity({
      text: 'You have uploaded no files.',
      type: 'message'
    });
  }
}
