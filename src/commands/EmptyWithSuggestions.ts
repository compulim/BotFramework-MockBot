import { TurnContext } from 'botbuilder';
export default async function (context: TurnContext) {
  const { PUBLIC_URL } = process.env;
   await context.sendActivity({
    text: '',
    type: 'message',
    suggestedActions: {
        actions: [
            {
                type: 'imBack',
                title: 'Empty',
                value: 'empty',
                image: `${ PUBLIC_URL }assets/square-icon.png`
            }
        ],
        to: []
    }
  });
}