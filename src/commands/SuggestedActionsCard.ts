import { TurnContext } from 'botbuilder';

export default async function (context: TurnContext, arg: string) {
  const { PUBLIC_URL } = process.env;

  if (arg) {
    await context.sendActivity({
      type: 'message',
      text: `You selected "${ arg.trim() }"`
    });
  } else {
    await context.sendActivity({
      type: 'message',
      textFormat: 'plain',
      text: 'Message Text',
      suggestedActions: {
        actions: [
          {
            type: 'imBack',
            title: 'Blue',
            value: 'suggested-actions Blue',
            image: `${ PUBLIC_URL }assets/square-icon.png`
          },
          {
            type: 'imBack',
            title: 'Red',
            value: 'suggested-actions Red',
            image: `${ PUBLIC_URL }assets/square-icon-red.png`
          },
          {
            type: 'imBack',
            title: 'Green',
            value: 'suggested-actions Green',
            image: `${ PUBLIC_URL }assets/square-icon-green.png`
          }
        ],
        to: []
      }
    });
  }
}
