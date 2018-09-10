import { TurnContext } from 'botbuilder';

export default async function (context: TurnContext) {
  await context.sendActivity({
    type: 'message',
    textFormat: 'markdown',
    text: `You are saying in *${ context.activity.locale }*`
  });
}
