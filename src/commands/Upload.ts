import { Attachment, TurnContext } from 'botbuilder';

const name = 'File upload';

function help() {
  return {
    'upload': 'Upload a file'
  };
}

async function processor(context: TurnContext, attachments: Attachment[] = []) {
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

export { help, name, processor }
