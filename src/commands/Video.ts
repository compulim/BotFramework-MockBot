import { TurnContext } from 'botbuilder';

const name = 'Video attachment';

function help() {
  return {
    'video': 'Show a video attachment of MP4',
    'video vimeo': 'Show a video attachment from Vimeo',
    'video youtube': 'Show a video attachment from YouTube'
  };
}

async function processor(context: TurnContext, _: string, provider: string) {
  const { PUBLIC_URL } = process.env;

  switch (provider) {
    case 'vimeo':
      return await context.sendActivity({
        type: 'message',
        attachments: [{
          contentType: 'video/mp4',
          contentUrl: 'https://vimeo.com/269316124',
          name: 'Microsoft Surface Hub 2 (2018)'
        }]
      });

    case 'youtube':
      return await context.sendActivity({
        type: 'message',
        attachments: [{
          contentType: 'video/mp4',
          contentUrl: 'https://www.youtube.com/watch?v=rIJRFHDr1QE',
          name: 'Vision Keynote Highlights // Microsoft Build 2019'
        }]
      });

    default:
      return await context.sendActivity({
        type: 'message',
        attachments: [{
          contentType: 'video/mp4',
          contentUrl: `${ PUBLIC_URL }assets/msband.mp4`,
          name: 'Microsoft Band 2'
        }]
      });
  }
}

export { help, name, processor }
