import { TurnContext } from 'botbuilder';

const name = 'Hero card';
// Read argument as a single line
const mode = 'line';

function help() {
  return {
    herocard: 'Show a hero card',
    'herocard long title': 'Show a hero card with a long title'
  };
}

async function processor(context: TurnContext, args: string) {
  const { PUBLIC_URL } = process.env;

  switch (args.trim().toLowerCase()) {
    case 'herocard long title':
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
                  title: 'messageBack Action with no display text',
                  type: 'messageBack',
                  value: 'messageBack Button'
                }
              ],
              images: [
                {
                  alt: 'Microsoft Surface Alt',
                  tap: {
                    type: 'openUrl',
                    title: 'Tapped it!',
                    value: `${PUBLIC_URL}testurl1.html`
                  },
                  url: `${PUBLIC_URL}assets/surface1.jpg`
                }
              ],
              tap: {
                type: 'openUrl',
                title: 'Tapped it!',
                value: `${PUBLIC_URL}testurl2.html`
              },
              subtitle: 'This is the subtitle',
              title:
                'This is a HeroCard with a really, really long title that is intended to test the richCardsWrapTitle style option.'
            }
          }
        ]
      });
      break;

    case 'herocard qna':
      await context.sendActivity({
        type: 'message',
        text: 'Where are you from?',
        attachments: [
          {
            contentType: 'application/vnd.microsoft.card.hero',
            content: {
              buttons: [
                {
                  title: 'United States',
                  type: 'imBack',
                  value: 'I am from United States.'
                },
                {
                  title: 'Hong Kong',
                  type: 'imBack',
                  value: 'I am from Hong Kong.'
                }
              ]
            }
          }
        ]
      });
      await context.sendActivity({
        type: 'message',
        text: 'What language do you speak?',
        attachments: [
          {
            contentType: 'application/vnd.microsoft.card.hero',
            content: {
              buttons: [
                {
                  title: 'English',
                  type: 'imBack',
                  value: 'I speak English.'
                },
                {
                  title: 'Cantonese',
                  type: 'imBack',
                  value: 'I speak Cantonese.'
                }
              ]
            }
          }
        ]
      });
      break;

    default:
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
                  title: 'imBack Action',
                  type: 'imBack',
                  value: 'imBack Button'
                },
                {
                  title: 'postBack Action',
                  type: 'postBack',
                  value: 'postBack Button'
                },
                {
                  displayText: 'Send messageBack with display text',
                  title: 'messageBack Action with displayText',
                  type: 'messageBack',
                  value: 'messageBack Button'
                },
                {
                  title: 'messageBack Action with no display text',
                  type: 'messageBack',
                  value: 'messageBack Button'
                }
              ],
              images: [
                {
                  alt: 'Microsoft Surface Alt',
                  tap: {
                    type: 'openUrl',
                    title: 'Tapped it!',
                    value: `${PUBLIC_URL}testurl1.html`
                  },
                  url: `${PUBLIC_URL}assets/surface1.jpg`
                }
              ],
              tap: {
                type: 'openUrl',
                title: 'Tapped it!',
                value: `${PUBLIC_URL}testurl2.html`
              },
              subtitle: 'This is the subtitle',
              text:
                '**Price: $XXX.XX USD**\r\n------\n Additional details\r\n' +
                '1. List item 1 \n' +
                '2. List item 2 \n' +
                '3. List item 3',
              title: '[Details about image 1](https://microsoft.com)'
            }
          }
        ]
      });
  }
}

export { help, mode, name, processor };
