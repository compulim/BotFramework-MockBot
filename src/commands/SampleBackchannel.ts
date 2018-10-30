import delay from 'delay';
import { TurnContext } from 'botbuilder';

const EVENT_ACTIVITY = {
  type: 'event',
  name: 'sample:backchannel',
  value: {
    message: 'This is one of the content of the "event" activity.'
  }
};

const name = 'Demo for backchannel sample';

function help() {
  return {
    'sample:backchannel': 'Demo for backchannel sample'
  };
}

async function processor(context: TurnContext) {
  await context.sendActivity({
    type: 'message',
    text: `I am sending an \`event\` activity like below:\n\n\`\`\`\n${ JSON.stringify(EVENT_ACTIVITY, null, 2) }\n\`\`\``
  });

  await delay(1000);

  await context.sendActivity(EVENT_ACTIVITY);
}

export { help, name, processor }
