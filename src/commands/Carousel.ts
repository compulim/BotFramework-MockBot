import { TurnContext } from 'botbuilder';

const name = 'Carousel layout';

function help() {
  return {
    'carousel': 'Show a carousel of product details'
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
          alt: 'Details about image 1'
        }],
        buttons: [{
          type: 'imBack',
          value: 'Place to buy',
          title: 'Places To Buy'
        }, {
          type: 'imBack',
          value: 'Related Products',
          title: 'Related Products'
        }]
      }
    }, {
      contentType: 'application/vnd.microsoft.card.hero',
      content: {
        title: 'Details about image 2',
        subtitle: 'This is the subtitle',
        text: 'Price: $XXX.XX USD',
        images: [{
          url: `${ PUBLIC_URL }assets/surface2.jpg`,
          alt: 'Details about image 2'
        }],
        buttons: [{
          type: 'imBack',
          value: 'Place to buy',
          title: 'Places To Buy'
        }, {
          type: 'imBack',
          value: 'Related Products',
          title: 'Related Products'
        }]
      }
    }, {
      contentType: 'application/vnd.microsoft.card.hero',
      content: {
        title: 'Details about image 3',
        subtitle: 'This is the subtitle',
        text: 'Price: $XXX.XX USD',
        images: [{
          url: `${ PUBLIC_URL }assets/surface3.jpg`,
          alt: 'Details about image 3'
        }],
        buttons: [{
          type: 'imBack',
          value: 'Place to buy',
          title: 'Places To Buy'
        }, {
          type: 'imBack',
          value: 'Related Products',
          title: 'Related Products'
        }]
      }
    }, {
      contentType: 'application/vnd.microsoft.card.hero',
      content: {
        title: 'Details about image 4',
        subtitle: 'This is the subtitle',
        text: 'Price: $XXX.XX USD',
        images: [{
          url: `${ PUBLIC_URL }assets/surface4.jpg`,
          alt: 'Details about image 4'
        }],
        buttons: [{
          type: 'imBack',
          value: 'Place to buy',
          title: 'Places To Buy'
        }, {
          type: 'imBack',
          value: 'Related Products',
          title: 'Related Products'
        }]
      }
    }]
  });
}

export { help, name, processor }
