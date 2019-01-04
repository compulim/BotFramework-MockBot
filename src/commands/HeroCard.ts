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
        buttons: [
          {
            title: 'imBack Action',
            type: 'imBack',
            value: 'imBack Button'
          },
          {
            title: 'postBack Action',
            type: 'postBack',
            value: 'postBack Button'
          },
          {
            displayText: 'Send messageBack with display text',
            title: 'messageBack Action with displayText',
            type: 'messageBack',
            value: 'messageBack Button'
          },
          {
            title: 'messageBack Action with no display text',
            type: 'messageBack',
            value: 'messageBack Button'
          },
        ],
        images: [{
          alt: 'Microsoft Surface Alt',
          tap: {
            type: 'openUrl',
            title: 'Tapped it!',
            value: `${ PUBLIC_URL }testurl1.html`
          },
          url: `${ PUBLIC_URL }assets/surface1.jpg`,
        }],
        tap: {
          type: 'openUrl',
          title: 'Tapped it!',
          value: `${ PUBLIC_URL }testurl2.html`
        },
        subtitle: 'This is the subtitle',
        text: 'Price: $XXX.XX USD',
        title: 'Details about image 1',
      }
    }],
  });
}

export { help, name, processor }
