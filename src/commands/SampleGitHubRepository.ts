import { TurnContext } from 'botbuilder';

export default async function (context: TurnContext, name: string, value: string) {
  context.sendActivity({
    type: 'message',
    attachmentLayout: 'carousel',
    attachments: [{
      content: {
        owner: 'Microsoft',
        repo: 'BotFramework-WebChat'
      },
      contentType: 'application/vnd.microsoft.botframework.samples.github-repository'
    }, {
      content: {
        owner: 'Microsoft',
        repo: 'BotFramework-Emulator'
      },
      contentType: 'application/vnd.microsoft.botframework.samples.github-repository'
    }, {
      content: {
        owner: 'Microsoft',
        repo: 'BotFramework-DirectLineJS'
      },
      contentType: 'application/vnd.microsoft.botframework.samples.github-repository'
    }]
  });
}
