import { TurnContext } from 'botbuilder';

export default async function (context: TurnContext) {
  const { PUBLIC_URL } = process.env;

  await context.sendActivity({
    text: '** Plain text **\r\n\r\nLine 1\r\nLine 2\r\nLine 3',
    textFormat: 'plain',
    type: 'message'
  });
}
