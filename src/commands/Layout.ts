import { TurnContext } from 'botbuilder';

export default async function (context: TurnContext, ...args: string[]) {
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
          content: {
            text: '**Message with plain text**\r\nShould see asterisks.',
            textFormat: 'plain'
          }
        }, {
          contentType: 'text/plain',
          content: {
            text: '**Message with Markdown**\r\nShould see bold text.',
            textFormat: 'markdown'
          }
        }, {
          contentType: 'text/plain',
          content: {
            text: '**Message with XML**\r\nShould see asterisks and monospace fonts',
            textFormat: 'xml'
          }
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
          content: {
            text: '**Message with plain text**\r\nShould see asterisks.',
            textFormat: 'plain'
          }
        }, {
          contentType: 'text/plain',
          content: {
            text: '**Message with Markdown**\r\nShould see bold text.',
            textFormat: 'markdown'
          }
        }, {
          contentType: 'text/plain',
          content: {
            text: '**Message with XML**\r\nShould see asterisks and monospace fonts',
            textFormat: 'xml'
          }
        }]
      });
  }
}
