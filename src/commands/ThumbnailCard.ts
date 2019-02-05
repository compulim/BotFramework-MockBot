import { TurnContext } from 'botbuilder';

const name = 'Hero card';

function help() {
  return {
    'thumbnailcard': 'Show a thumbnail card'
  };
}

async function processor(context: TurnContext, args: string) {
  const { PUBLIC_URL } = process.env;

  await context.sendActivity({
    type: 'message',
    text: '',
    attachmentLayout: 'carousel',
    attachments: [{
      contentType: 'application/vnd.microsoft.card.thumbnail',
      content: {
        buttons: [],
        images: [{
          alt: 'Microsoft Surface Alt',
          url: `${ PUBLIC_URL }assets/surface1.jpg`,
        }],
        title: 'Microsoft Surface Pro',
      }
    }],
  });
}

export { help, name, processor }
