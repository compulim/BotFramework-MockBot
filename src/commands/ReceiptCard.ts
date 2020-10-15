import { TurnContext } from 'botbuilder';

const mode = 'line';
const name = 'Receipt card';

function help() {
  return {
    receiptcard: 'Show a receipt card',
    receiptcard2: 'Show a receipt card with quantity'
  };
}

async function processor(context: TurnContext, args: string) {
  const { PUBLIC_URL } = process.env;

  const command = args.trim().toLowerCase();

  switch (command) {
    case 'receiptcard2':
      await context.sendActivity({
        type: 'message',
        text: '',
        attachmentLayout: 'carousel',
        attachments: [
          {
            contentType: 'application/vnd.microsoft.card.receipt',
            content: {
              title: 'John Doe',
              facts: [
                {
                  key: 'Order Number',
                  value: '1234'
                },
                {
                  key: 'Payment Method',
                  value: 'VISA 5555-****'
                }
              ],
              items: [
                {
                  tap: {
                    type: 'openUrl',
                    title: 'Open bing',
                    value: `https://www.bing.com/`
                  },
                  title: 'Data Transfer',
                  price: '$38.45',
                  quantity: 368,
                  image: {
                    alt: 'Traffic manager',
                    url: 'https://github.com/amido/azure-vector-icons/raw/master/renders/traffic-manager.png'
                  }
                },
                {
                  title: 'App Service',
                  price: '$45.00',
                  quantity: 720,
                  image: {
                    alt: 'Cloud service',
                    url: 'https://github.com/amido/azure-vector-icons/raw/master/renders/cloud-service.png'
                  }
                }
              ],
              tax: '$7.50',
              total: '$90.95',
              buttons: [
                {
                  type: 'imBack',
                  title: 'imBack Button',
                  value: 'imBack Action'
                },
                {
                  type: 'postBack',
                  title: 'postBack Button',
                  value: 'postBack Action'
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
            contentType: 'application/vnd.microsoft.card.receipt',
            content: {
              title: 'Surface Pro 4',
              subtitle: 'This is the subtitle',
              items: [
                {
                  title: 'Surface Pro 4',
                  subtitle: 'Surface Pro 4 is a powerful, versatile, lightweight laptop.',
                  text:
                    'Surface does more. Just like you. For one device that does everything, you need more than a mobile OS.',
                  image: {
                    alt: 'Microsoft Surface Alt',
                    tap: {
                      type: 'openUrl',
                      title: 'Tapped it!',
                      value: `${PUBLIC_URL}testurl1.html`
                    },
                    url: `${PUBLIC_URL}assets/surface1.jpg`
                  },
                  price: '$XXX'
                },
                {
                  title: 'Surface Pro 4 (2) - No subtitle, No text.',
                  image: {
                    alt: 'Microsoft Surface Alt',
                    tap: {
                      type: 'call',
                      title: 'Call back!',
                      value: '1234567890'
                    },
                    url: `${PUBLIC_URL}assets/surface2.jpg`
                  },
                  price: '$XXX'
                },
                {
                  title: 'Surface Pro 4 (3) - No subtitle, No text, No image',
                  price: '$XXX'
                }
              ],
              facts: [
                {
                  key: 'Order Number',
                  value: 'Value 1'
                },
                {
                  key: 'Expected Delivery Time',
                  value: 'Value 2'
                },
                {
                  key: 'Payment Method',
                  value: 'Value 3'
                },
                {
                  key: 'Delivery Address',
                  value: 'Value 4'
                }
              ],
              vat: '0.01',
              total: '0.10',
              tax: 'XXX.XX',
              buttons: [
                {
                  type: 'imBack',
                  title: 'imBack Button',
                  value: 'imBack Action'
                },
                {
                  type: 'postBack',
                  title: 'postBack Button',
                  value: 'postBack Action'
                }
              ],
              tap: {
                type: 'openUrl',
                title: 'Tapped it!',
                value: `${PUBLIC_URL}testurl2.html`
              }
            }
          }
        ]
      });
      break;
  }
}

export { help, mode, name, processor };
