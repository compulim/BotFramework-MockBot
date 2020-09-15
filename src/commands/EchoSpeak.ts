import { TurnContext } from 'botbuilder';
import onErrorResumeNext from 'on-error-resume-next';

const mode = 'line';
const name = 'Echo';

function help() {
  return {
    'echoSpeak': 'Echo back the message with empty speak property',
  };
}

async function processor(context: TurnContext, line: string) {
  line = line.substr(10);

  const text = line[0] === '"' ? onErrorResumeNext(() => JSON.parse(line)) || '[Error while parsing the JSON]' : line;

  await context.sendActivity({
    type: 'message',
    text,
    speak: '<speak >'
  });
}

export { help, mode, name, processor }
