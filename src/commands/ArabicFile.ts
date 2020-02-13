import { TurnContext } from 'botbuilder-core';

const name = 'Arabic file attachments'
const help = () => ({
  'arabic file': 'Show a message with a text file and Word document attachments'
});

async function processor(context: TurnContext) {
  const { PUBLIC_URL } = process.env;

  await context.sendActivity({
    type: 'message',
    text: 'التقارير جاهزة، إطَّلع على الملف الملحق',
    attachments: [
      {
        contentType: 'application/octet-stream',
        contentUrl: `${PUBLIC_URL}assets/test.txt`,
        name: 'نص صِرف'
      },
      {
        contentType: 'application/octet-stream',
        contentUrl: `${PUBLIC_URL}assets/test.docx`,
        name: 'Word مستند'
      }
    ]
  });
}

export {
  help,
  name,
  processor
};
