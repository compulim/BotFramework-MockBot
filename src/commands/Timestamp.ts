import delay from 'delay';
import { TurnContext } from 'botbuilder';

const name = 'Timestamp grouping';

function help() {
  return {
    'timestamp': 'Show 4 messages at different time for testing timestamp grouping'
  };
}

async function processor(context: TurnContext, arg?: string) {
  await context.sendActivity({
    text: 'I am going to send 5 messages at different time _t_.',
    type: 'message'
  });

  await context.sendActivity({
    text: 'First message at time _t_ = 0.',
    type: 'message'
  });

  await delay(1000);

  await context.sendActivity({
    text: 'At time _t_ = 1.',
    type: 'message'
  });

  await delay(2000);

  await context.sendActivity({
    text: 'At time _t_ = 3.',
    type: 'message'
  });

  await delay(3000);

  await context.sendActivity({
    text: 'At time _t_ = 6.',
    type: 'message'
  });

  await delay(4000);

  await context.sendActivity({
    text: 'Final message at time _t_ = 10.',
    type: 'message'
  });
}

export { help, name, processor }
