import { TurnContext } from 'botbuilder';

import createBotFrameworkAdapter from '../createBotFrameworkAdapter';

const name = 'Proactive message';
const WAIT_INTERVAL = 5000;

function help() {
  return {
    'proactive': 'Proactively send a message later'
  };
}

async function processor(context: TurnContext) {
  const reference = TurnContext.getConversationReference(context.activity);

  await context.sendActivity({
    speak: 'Will send a proactive message soon.',
    type: 'message',
    text: `Will send a proactive message after ${ WAIT_INTERVAL / 1000 } seconds. Attached is the JSON of the conversation \`reference\` that will be used to reinstantiate the \`TurnContext\`.`,
    attachments: [{
      content: `\`\`\`\n${ JSON.stringify(reference, null, 2) }\n\`\`\``,
      contentType: 'text/markdown'
    }]
  });

  (async function (reference) {
    // We specifically write this block of code to show how proactive message should work.
    // This block of code should run under another process and it will only have knowledge of adapter setup and conversation reference.

    // HACK: Currently, in DLSpeech, proactive messaging only works on single process (same Web Socket connection), and we need a hack to get it work.
    const streamingServer = context.adapter['streamingServer'];

    await sleep(WAIT_INTERVAL);

    const adapter = createBotFrameworkAdapter();

    adapter['streamingServer'] = streamingServer;

    try {
      await adapter.continueConversation(reference, async continuedContext => {
        await continuedContext.sendActivity({
          speak: 'This is a proactive message.',
          text: 'This is a proactive message.',
          type: 'message'
        });
      });

    } finally {
      // We need to release "streamingServer" reference because adapter will call addEventListener on the setter.
      adapter['streamingServer'] = null;
    }
  })(reference);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export { help, name, processor }
