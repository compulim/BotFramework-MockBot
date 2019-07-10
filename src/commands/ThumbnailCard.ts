import { TurnContext } from 'botbuilder';

const name = 'Hero card';
const mode = 'line';

function help() {
  return {
    'thumbnailcard': 'Show a thumbnail card',
    'thumbnailcard long title': 'Show a thumbnail card with a long title'

  };
}

async function processor(context: TurnContext, args: string) {
  const { PUBLIC_URL } = process.env;

  switch (args.trim().toLowerCase()) {
    case 'thumbnailcard long title':
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
            title: 'This is a ThumbnailCard with a really, really long title that is intended to test the richCardsWrapTitle style option.',
          }
        }],
      });
      break;
    default:
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
}

export { help, mode, name, processor }
