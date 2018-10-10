import delay from 'delay';
import { TurnContext } from 'botbuilder';

const EVENT_ACTIVITY = {
  type: 'event',
  name: 'sample:backchannel',
  value: {
    message: 'This is one of the content of the "event" activity.'
  }
};

export default async function (context: TurnContext) {
  await context.sendActivity({
    type: 'message',
    text: `I am sending an \`event\` activity like below:\n\n\`\`\`\n${ JSON.stringify(EVENT_ACTIVITY, null, 2) }\n\`\`\``
  });

  await delay(1000);

  await context.sendActivity(EVENT_ACTIVITY);
}
