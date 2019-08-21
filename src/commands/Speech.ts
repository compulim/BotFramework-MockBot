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
  }, {
    locale: 'en-US',
    speak: `<speak
  version="1.0"
  xmlns="https://www.w3.org/2001/10/synthesis"
  xmlns:mstts="https://www.w3.org/2001/mstts"
  xml:lang="en-US"
>
  <voice name="en-US-JessaNeural">
    <mstts:express-as type="cheerful">That'd be just amazing!</mstts:express-as>
  </voice>
  <voice name="zh-HK-TracyRUS">
    <prosody pitch="+150%">太神奇啦！</prosody>
  </voice>
</speak>`,
    text: 'That\'d be just amazing! 太神奇啦！',
    type: 'message'
  }]);
}

export { help, name, processor }
