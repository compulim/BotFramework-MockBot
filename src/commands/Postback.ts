import { TurnContext } from 'botbuilder';

export default async function (context: TurnContext, arg: string) {
  if (arg) {
    await context.sendActivity({
      type: 'message',
      text: `You submitted "${ arg.trim() }"`
    });
  } else {
    await context.sendActivity({
      type: 'message',
      textFormat: 'plain',
      text: 'Please select one of the actions below',
      suggestedActions: {
        actions: [
          {
            type: 'imBack',
            title: 'IM back as string',
            value: 'postback imback-string'
          },
          {
            type: 'postBack',
            title: 'Post back as string',
            value: 'postback postback-string'
          },
          {
            type: 'postBack',
            title: 'Post back as JSON',
            value: {
              hello: 'World!'
            }
          }
        ],
        to: []
      }
    });
  }
}
