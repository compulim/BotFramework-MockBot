import { TurnContext } from 'botbuilder';

export default async function (context: TurnContext, arg?: string) {
  arg = (arg || '').trim();

  if (arg === 'default') {
    await context.sendActivity({
      type: 'message',
      text: 'Grouping timestamp using default settings.'
    });

    await context.sendActivity({
      type: 'event',
      name: 'timestamp'
    });
  } else if (arg === 'false') {
    await context.sendActivity({
      type: 'message',
      text: 'Ungrouping timestamps.'
    });

    await context.sendActivity({
      type: 'event',
      name: 'timestamp',
      value: false
    });
  } else if (arg && !isNaN(+arg)) {
    const value = +arg;

    await context.sendActivity({
      type: 'message',
      text: `Grouping timestamps by ${ value / 1000 } seconds.`
    });

    await context.sendActivity({
      type: 'event',
      name: 'timestamp',
      value
    });
  }

  await context.sendActivity({
    type: 'message',
    text: 'How would you like to group timestamps?',
    suggestedActions: {
      actions: [{
        type: 'imBack',
        title: 'Don\'t group',
        value: 'timestamp false'
      }, {
        type: 'imBack',
        title: 'Group using default value',
        value: 'timestamp default'
      }, {
        type: 'imBack',
        title: 'Group by 5 seconds',
        value: 'timestamp 5000'
      }, {
        type: 'imBack',
        title: 'Group by 5 minutes',
        value: 'timestamp 300000'
      }],
      to: null
    }
  });
}
