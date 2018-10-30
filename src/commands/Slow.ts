import { TurnContext } from 'botbuilder';

const name = 'Images on emulated slow network';

function help() {
  return {
    'slow': 'Show 4 images with emulated slow network'
  };
}

async function processor(context: TurnContext, ...args: string[]) {
  const { PUBLIC_URL } = process.env;
  const arg = args.map(arg => (arg || '').trim()).filter(arg => arg).join(' ');

  switch (arg) {
    case 'carousel':
    default:
      await context.sendActivity({
        type: 'message',
        text: 'This command will slowly show 4 images in carousel',
        attachmentLayout: 'carousel',
        attachments: [{
          contentType: 'image/jpg',
          contentUrl: `${ PUBLIC_URL }assets/surface1.jpg?slow`,
          name: 'Microsoft Surface'
        }, {
          contentType: 'image/jpg',
          contentUrl: `${ PUBLIC_URL }assets/surface2.jpg?slow`,
          name: 'Microsoft Surface'
        }, {
          contentType: 'image/jpg',
          contentUrl: `${ PUBLIC_URL }assets/surface3.jpg?slow`,
          name: 'Microsoft Surface'
        }, {
          contentType: 'image/jpg',
          contentUrl: `${ PUBLIC_URL }assets/surface4.jpg?slow`,
          name: 'Microsoft Surface'
        }]
      });

      break;
  }
}

export { help, name, processor }
