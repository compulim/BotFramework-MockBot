import { TurnContext } from 'botbuilder-core';

const name = 'Arabic file attachments'
const help = () => ({
  file: 'Show a message with a text file and Word document attachments'
});

async function processor(context: TurnContext) {
  const { PUBLIC_URL } = process.env;

  await context.sendActivity({
    type: 'message',
    text: 'Arabic<The reports are ready, see attached.>',
    attachments: [
      {
        contentType: 'application/octet-stream',
        contentUrl: `${PUBLIC_URL}assets/test.txt`,
        name: 'Arabic<Plain text>'
      },
      {
        contentType: 'application/octet-stream',
        contentUrl: `${PUBLIC_URL}assets/test.docx`,
        name: 'Arabic<Word document>'
      }
    ]
  });
}

export {
  help,
  name,
  processor
};
