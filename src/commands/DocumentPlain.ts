import { TurnContext } from 'botbuilder';

const name = 'Plain document attachment';

function help() {
  return {
    'document-plain': 'Show a plain document as attachment'
  };
}

async function processor(context: TurnContext) {
  const { PUBLIC_URL } = process.env;

  await context.sendActivity({
    type: 'message',
    attachments: [{
      contentType: 'text/plain',
      contentUrl: `${ PUBLIC_URL }assets/test.txt`,
      name: 'test.txt'
    }]
  });
}

export { help, name, processor }
