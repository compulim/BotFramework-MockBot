import { TurnContext } from 'botbuilder';

const name = 'Layout';

function help() {
  return {
    'layout single': 'Show a single attachment in stacked layout',
    'layout single carousel': 'Show a single attachment in carousel layout',
    'layout double': 'Show 2 attachments in carousel layout',
    'layout carousel': 'Show 4 attachments in carousel layout',
    'layout': 'Show 4 attachments in stacked layout'
  };
}

async function processor(context: TurnContext, ...args: string[]) {
  const { PUBLIC_URL } = process.env;
  const arg = args.map(arg => (arg || '').trim()).filter(arg => arg).join(' ');

  switch (arg) {
    case 'single':
      await context.sendActivity({
        type: 'message',
        text: 'This command show single attachment in **default (stacked)** layout',
        attachments: [{
          contentType: 'image/jpg',
          contentUrl: `${ PUBLIC_URL }assets/surface1.jpg`,
          name: 'Microsoft Surface'
        }]
      });

      break;

    case 'carousel single':
    case 'single carousel':
      await context.sendActivity({
        type: 'message',
        text: 'This command show single attachment in **carousel** layout',
        attachmentLayout: 'carousel',
        attachments: [{
          contentType: 'image/jpg',
          contentUrl: `${ PUBLIC_URL }assets/surface1.jpg`,
          name: 'Microsoft Surface'
        }]
      });

      break;

    case 'double':
      await context.sendActivity({
        type: 'message',
        text: 'This command show single attachment in **carousel** layout',
        attachmentLayout: 'carousel',
        attachments: [{
          contentType: 'image/jpg',
          contentUrl: `${ PUBLIC_URL }assets/surface1.jpg`,
          name: 'Microsoft Surface'
        }, {
          contentType: 'image/jpg',
          contentUrl: `${ PUBLIC_URL }assets/surface2.jpg`,
          name: 'Microsoft Surface'
        }]
      });

      break;

    case 'carousel':
      await context.sendActivity({
        type: 'message',
        text: 'This command show 4 attachments in **carousel** layout',
        attachmentLayout: 'carousel',
        attachments: [{
          contentType: 'image/jpg',
          contentUrl: `${ PUBLIC_URL }assets/surface1.jpg`,
          name: 'Microsoft Surface'
        }, {
          contentType: 'text/plain',
          content: '**Message with plain text**\r\nShould see asterisks.'
        }, {
          contentType: 'text/markdown',
          content: '**Message with Markdown**\r\nShould see bold text.'
        }, {
          contentType: 'text/xml',
          content: '**Message with XML**\r\nShould see asterisks and monospace fonts'
        }]
      });

      break;

    default:
      await context.sendActivity({
        type: 'message',
        text: 'This command show 4 attachments in **default (stacked)** layout',
        attachments: [{
          contentType: 'image/jpg',
          contentUrl: `${ PUBLIC_URL }assets/surface1.jpg`,
          name: 'Microsoft Surface'
        }, {
          contentType: 'text/plain',
          content: '**Message with plain text**\r\nShould see asterisks.'
        }, {
          contentType: 'text/markdown',
          content: '**Message with Markdown**\r\nShould see bold text.'
        }, {
          contentType: 'text/xml',
          content: '**Message with XML**\r\nShould see asterisks and monospace fonts'
        }]
      });
  }
}

export { help, name, processor }
