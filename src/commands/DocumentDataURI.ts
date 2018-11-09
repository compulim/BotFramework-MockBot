import { TurnContext } from 'botbuilder';

const name = 'Document Data URI';

function help() {
  return {
    'document-data-uri': 'Attachment with Data URI as the content'
  };
}

async function processor(context: TurnContext) {
  await context.sendActivity({
    type: 'message',
    attachments: [{
      contentType: 'text/plain',
      contentUrl: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==`,
      name: 'dot.png'
    }]
  });
}

export { help, name, processor }
