import { TurnContext } from 'botbuilder';

const name = 'Plain text message';

function help() {
  return {
    'text': 'Show a plain text message without rendering Markdown'
  };
}

async function processor(context: TurnContext) {
  await context.sendActivity({
    text: '** Plain text **\r\n\r\nLine 1\r\nLine 2\r\nLine 3',
    textFormat: 'plain',
    type: 'message'
  });
}

export { help, name, processor }
