import { TurnContext } from 'botbuilder';

const name = 'Hero card actions';
// Read argument as a single line
const mode = 'line';

function help() {
  return {
    herocardactions: 'Show a hero card with multiple actions'
  };
}

async function processor(context: TurnContext) {
  await context.sendActivity({
    type: 'message',
    text: '',
    attachmentLayout: 'carousel',
    attachments: [
      {
        contentType: 'application/vnd.microsoft.card.hero',
        content: {
          buttons: [
            {
              title: 'imBack',
              type: 'imBack',
              value: 'string'
            },
            {
              title: 'postBack (string)',
              type: 'postBack',
              value: 'string'
            },
            {
              title: 'postBack (JSON)',
              type: 'postBack',
              value: { value: 'value' }
            },
            {
              displayText: 'displayText',
              text: '"text"',
              title: 'messageBack (displayText + text + value)',
              type: 'messageBack',
              value: { value: 'value' }
            },
            {
              displayText: 'displayText',
              text: '"text"',
              title: 'messageBack (displayText + text)',
              type: 'messageBack',

              // There is a bug in DLJS that prevented it to send the activity without "value" field set
              value: null
            },
            {
              title: 'messageBack (value)',
              type: 'messageBack',
              value: { value: 'value' }
            },
            {
              title: 'postBack (empty)',
              type: 'postBack'
            },
            {
              title: 'messageBack (empty)',
              type: 'messageBack'
            }
          ],
          title: 'Hero Card Actions'
        }
      }
    ]
  });
}

export { help, mode, name, processor };
