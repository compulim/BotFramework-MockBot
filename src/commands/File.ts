import { TurnContext } from 'botbuilder';

export default async function (context: TurnContext) {
  const { PUBLIC_URL } = process.env;

  await context.sendActivity({
    type: 'message',
    text: 'The reports is ready, see attached.',
    attachments: [{
      contentType: 'application/octet-stream',
      contentUrl: `${ PUBLIC_URL }assets/test.txt`,
      name: 'Plain text'
    }, {
      contentType: 'application/octet-stream',
      contentUrl: `${ PUBLIC_URL }assets/test.docx`,
      name: 'Word document'
    }]
  });
}
