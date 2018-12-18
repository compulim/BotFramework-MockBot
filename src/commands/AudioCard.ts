import { TurnContext } from 'botbuilder';

const name = 'Audio card';

function help() {
  return {
    'audiocard': 'Show an audio card'
  };
}

async function processor(context: TurnContext) {
  const { PUBLIC_URL } = process.env;

  await context.sendActivity({
    type: 'message',
    attachments: [{
      contentType: 'application/vnd.microsoft.card.audio',
      content: {
        title: 'BotFramework Test',
        subtitle: 'audio test',
        text: 'No buttons, No Image, Autoloop, Sharable',
        media: [{
          profile: 'audiocard',
          url: `${ PUBLIC_URL }assets/bftest.mp3`
        }],
        autoloop: true,
        autostart: false
      }
    }]
  });
}

export { help, name, processor }
