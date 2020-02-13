import { TurnContext } from 'botbuilder';

const name = 'Arabic carousel';
const help = () => ({
  'arabic carousel': 'Show a carousel of product details'
});

async function processor(context: TurnContext) {
  const { PUBLIC_URL } = process.env;

  await context.sendActivity({
    type: 'message',
    text: '',
    attachmentLayout: 'carousel',
    attachments: [
      {
        contentType: 'application/vnd.microsoft.card.hero',
        content: {
          title: 'تفاصيل عن الصورة 1',
          subtitle: 'هذا عنوان فرعي',
          text: 'السعر: $###.## دولار امريكي',
          images: [
            {
              url: `${PUBLIC_URL}assets/surface1.jpg`
            }
          ],
          buttons: [
            {
              type: 'imBack',
              value: 'مكان الشراء',
              title: 'اماكن الشراء'
            },
            {
              type: 'imBack',
              value: 'المنتجات ذات الصلة',
              title: 'المنتجات ذات الصلة'
            }
          ]
        }
      },
      {
        contentType: 'application/vnd.microsoft.card.hero',
        content: {
          title: 'تفاصيل عن الصورة 2',
          subtitle: 'هذا عنوان فرعي',
          text: 'السعر: $###.## دولار امريكي',
          images: [
            {
              url: `${PUBLIC_URL}assets/surface2.jpg`
            }
          ],
          buttons: [
            {
              type: 'imBack',
              value: 'مكان الشراء',
              title: 'اماكن الشراء'
            },
            {
              type: 'imBack',
              value: 'المنتجات ذات الصلة',
              title: 'المنتجات ذات الصلة'
            }
          ]
        }
      },
      {
        contentType: 'application/vnd.microsoft.card.hero',
        content: {
          title: 'تفاصيل عن الصورة 3',
          subtitle: 'هذا عنوان فرعي',
          text: 'السعر: $###.## دولار امريكي',
          images: [
            {
              url: `${PUBLIC_URL}assets/surface3.jpg`
            }
          ],
          buttons: [
            {
              type: 'imBack',
              value: 'مكان الشراء',
              title: 'اماكن الشراء'
            },
            {
              type: 'imBack',
              value: 'المنتجات ذات الصلة',
              title: 'المنتجات ذات الصلة'
            }
          ]
        }
      },
      {
        contentType: 'application/vnd.microsoft.card.hero',
        content: {
          title: 'تفاصيل عن الصورة 4',
          subtitle: 'هذا عنوان فرعي',
          text: 'السعر: $###.## دولار امريكي',
          images: [
            {
              url: `${PUBLIC_URL}assets/surface4.jpg`
            }
          ],
          buttons: [
            {
              type: 'imBack',
              value: 'مكان الشراء',
              title: 'اماكن الشراء'
            },
            {
              type: 'imBack',
              value: 'المنتجات ذات الصلة',
              title: 'المنتجات ذات الصلة'
            }
          ]
        }
      }
    ]
  });
}

export { help, name, processor };
