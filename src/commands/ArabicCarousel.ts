import { TurnContext } from 'botbuilder';

const name = 'Arabic carousel'
const help = () => ({
  'arabic carousel': 'Show a carousel of product details'
});

async function processor(context: TurnContext) {
  const { PUBLIC_URL } = process.env;

  await context.sendActivity({
    type: 'message',
    text: '',
    attachmentLayout: 'carousel',
    attachments: [
      {
        contentType: 'application/vnd.microsoft.card.hero',
        content: {
          title: 'Arabic<Details about image 1>',
          subtitle: 'Arabic<This is the subtitle>',
          text: 'Arabic<Price: $XXX.XX USD>',
          images: [
            {
              url: `${PUBLIC_URL}assets/surface1.jpg`
            }
          ],
          buttons: [
            {
              type: 'imBack',
              value: 'Arabic<Place to buy>',
              title: 'Arabic<Places To Buy>'
            },
            {
              type: 'imBack',
              value: 'Arabic<Related Products>',
              title: 'Arabic<Related Products>'
            }
          ]
        }
      },
      {
        contentType: 'application/vnd.microsoft.card.hero',
        content: {
          title: 'Arabic<Details about image 2>',
          subtitle: 'Arabic<This is the subtitle>',
          text: 'Arabic<Price: $XXX.XX USD>',
          images: [
            {
              url: `${PUBLIC_URL}assets/surface2.jpg`
            }
          ],
          buttons: [
            {
              type: 'imBack',
              value: 'Arabic<Place to buy>',
              title: 'Arabic<Places To Buy>'
            },
            {
              type: 'imBack',
              value: 'Arabic<Related Products>',
              title: 'Arabic<Related Products>'
            }
          ]
        }
      },
      {
        contentType: 'application/vnd.microsoft.card.hero',
        content: {
          title: 'Arabic<Details about image 3>',
          subtitle: 'Arabic<This is the subtitle>',
          text: 'Arabic<Price: $XXX.XX USD>',
          images: [
            {
              url: `${PUBLIC_URL}assets/surface3.jpg`
            }
          ],
          buttons: [
            {
              type: 'imBack',
              value: 'Arabic<Place to buy>',
              title: 'Arabic<Places To Buy>'
            },
            {
              type: 'imBack',
              value: 'Arabic<Related Products>',
              title: 'Arabic<Related Products>'
            }
          ]
        }
      },
      {
        contentType: 'application/vnd.microsoft.card.hero',
        content: {
          title: 'Arabic<Details about image 4>',
          subtitle: 'Arabic<This is the subtitle>',
          text: 'Arabic<Price: $XXX.XX USD>',
          images: [
            {
              url: `${PUBLIC_URL}assets/surface4.jpg`
            }
          ],
          buttons: [
            {
              type: 'imBack',
              value: 'Arabic<Place to buy>',
              title: 'Arabic<Places To Buy>'
            },
            {
              type: 'imBack',
              value: 'Arabic<Related Products>',
              title: 'Arabic<Related Products>'
            }
          ]
        }
      }
    ]
  });
};

export {
  help,
  name,
  processor
};
