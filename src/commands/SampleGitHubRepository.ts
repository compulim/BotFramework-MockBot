import { TurnContext } from 'botbuilder';

const name = 'Demo for GitHub repository sample';

function help() {
  return {
    'sample:github-repository': 'Demo for GitHub repository sample'
  };
}

async function processor(context: TurnContext, name: string, value: string) {
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

export { help, name, processor }
