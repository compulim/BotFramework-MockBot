import { TurnContext } from 'botbuilder';

const name = 'Audio attachment';

function help() {
  return {
    'audio': 'Show an audio attachment'
  };
}

async function processor(context: TurnContext) {
  const { PUBLIC_URL } = process.env;

  await context.sendActivity({
    type: 'message',
    text: '',
    attachments: [{
      contentType: 'audio/mpeg',
      contentUrl: `${ PUBLIC_URL }assets/bftest.mp3`,
      name: 'BotFramework Test'
    }]
  });
}

export { help, name, processor }
