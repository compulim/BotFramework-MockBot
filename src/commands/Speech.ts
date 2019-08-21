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
  <voice name="ja-JP-Ayumi-Apollo">
    <prosody pitch="+150%">素晴らしい!</prosody>
  </voice>
</speak>`,
    text: 'That\'d be just amazing! 素晴らしい!',
    type: 'message'
  }]);
}

export { help, name, processor }
