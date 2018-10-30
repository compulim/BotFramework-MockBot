import { TurnContext } from 'botbuilder';

const name = 'Word document attachment';

function help() {
  return {
    'document-word': 'Show a Word document as attachment'
  };
}

async function processor(context: TurnContext) {
  const { PUBLIC_URL } = process.env;

  await context.sendActivity({
    type: 'message',
    attachments: [{
      contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      contentUrl: `${ PUBLIC_URL }assets/test.docx`,
      name: 'test.docx'
    }]
  });
}

export { help, name, processor }
