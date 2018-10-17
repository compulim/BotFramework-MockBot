import { TurnContext } from 'botbuilder';

const name = 'Hero card';

function help() {
  return {
    'herocard': 'Show a hero card'
  };
}

async function processor(context: TurnContext) {
  const { PUBLIC_URL } = process.env;

  await context.sendActivity({
    type: 'message',
    text: '',
    attachmentLayout: 'carousel',
    attachments: [{
      contentType: 'application/vnd.microsoft.card.hero',
      content: {
        title: 'Details about image 1',
        subtitle: 'This is the subtitle',
        text: 'Price: $XXX.XX USD',
        images: [{
          url: `${ PUBLIC_URL }assets/surface1.jpg`,
          alt: 'Microsoft Surface Alt',
          tap: {
            type: 'openUrl',
            title: 'Tapped it!',
            value: `${ PUBLIC_URL }testurl1.html`
          }
        }],
        buttons: [
          {
            type: 'imBack',
            value: 'imBack Button',
            title: 'imBack Action'
          },
          {
            type: 'postBack',
            value: 'postBack Button',
            title: 'postBack Action'
          }
        ],
        tap: {
          type: 'openUrl',
          title: 'Tapped it!',
          value: `${ PUBLIC_URL }testurl2.html`
        }
      }
    }]
  });
}

export { help, name, processor }
