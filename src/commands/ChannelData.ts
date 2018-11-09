import { TurnContext } from 'botbuilder';

const name = 'Channel data';

function help() {
  return {
    'channel-data': 'Dump channel data from the activity sent by the user'
  };
}

async function processor(context: TurnContext) {
  await context.sendActivity({
    type: 'message',
    text: 'The attachment below contains the channel data',
    attachments: [{
      content: `\`\`\`\n${ JSON.stringify(context.activity.channelData, null, 2) }\n\`\`\``,
      contentType: 'text/markdown'
    }]
  });
}

export { help, name, processor }
