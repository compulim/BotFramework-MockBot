import { TurnContext } from 'botbuilder';

const name = 'Animation card';

function help() {
  return {
    'animationcard': 'Show an animation card'
  };
}

async function processor(context: TurnContext) {
  const { PUBLIC_URL } = process.env;

  await context.sendActivity({
    type: 'message',
    attachments: [{
      contentType: 'application/vnd.microsoft.card.animation',
      content: {
        title: 'title',
        subtitle: 'animation',
        text: 'No buttons, No Image, Autoloop, Sharable',
        media: [{
          profile: 'animation',
          url: `${ PUBLIC_URL }assets/surface_anim.gif`,
        }],
        autoloop: true,
        autostart: false
      }
    }]
  });
}

export { help, name, processor }
