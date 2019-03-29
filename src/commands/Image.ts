import { TurnContext } from 'botbuilder';

const name = 'Image attachment';

function help() {
  return {
    'image': 'Show an image attachment'
  };
}

async function processor(context: TurnContext) {
  const { PUBLIC_URL } = process.env;

  await context.sendActivity({
    type: 'message',
    attachments: [{
      contentType: 'image/jpeg',
      contentUrl: `${ PUBLIC_URL }assets/surface1.jpg`,
      name: 'Microsoft Surface'
    }]
  });
}

export { help, name, processor }
