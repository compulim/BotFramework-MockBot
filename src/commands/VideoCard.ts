import { TurnContext, VideoCard } from 'botbuilder';

const name = 'Video card';

function help() {
  return {
    'videocard': 'Show a video card'
  };
}

async function processor(context: TurnContext) {
  const { PUBLIC_URL } = process.env;

  await context.sendActivity({
    type: 'message',
    attachments: [{
      contentType: 'application/vnd.microsoft.card.video',
      content: {
        title: 'Microsoft Band',
        subtitle: 'Large Video',
        text: 'No buttons, No Image, Autoloop, No Sharable',
        media: [{
          url: `${ PUBLIC_URL }assets/msband.mp4`,
          profile: 'videocard'
        }],
        image: { imageAltText: 'Microsoft Band', url: `${ PUBLIC_URL }assets/ms-band1.jpg` },
        autoloop: true,
        autostart: false
      }
    }]
  });
}

export { help, name, processor }
