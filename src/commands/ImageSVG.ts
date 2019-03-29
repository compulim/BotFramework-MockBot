import { TurnContext } from 'botbuilder';

const name = 'SVG image attachment';

function help() {
  return {
    'image-svg': 'Show a SVG image attachment'
  };
}

async function processor(context: TurnContext) {
  const { PUBLIC_URL } = process.env;

  await context.sendActivity({
    type: 'message',
    attachments: [{
      contentType: 'image/svg+xml',
      contentUrl: `${ PUBLIC_URL }assets/bf_square.svg`,
      name: 'Microsoft Bot Framework'
    }]
  });
}

export { help, name, processor }
