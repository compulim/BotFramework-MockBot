import { TurnContext } from 'botbuilder';

const name = 'Speech';

function help() {
  return {
    'speech': 'Speak in different language',
    'tell me a story': 'Tell me a story'
  };
}

async function processor(context: TurnContext) {
  await context.sendActivities([{
    locale: 'en-US',
    text: 'Pooh is very social. After Christopher Robin, his closest friend is Piglet.',
    type: 'message'
  }, {
    locale: 'zh-HK',
    text: '一天，悶悶不樂的愛麗絲跟姊姊同坐於河畔。',
    type: 'message'
  }]);
}

export { help, name, processor }
