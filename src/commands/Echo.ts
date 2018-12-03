import { TurnContext } from 'botbuilder';
import onErrorResumeNext from 'on-error-resume-next';

const mode = 'line';
const name = 'Echo';

function help() {
  return {
    'echo Hello, World!': 'Echo back the message after deserialized as JSON',
    'echo "Hello\nWorld!"': 'Parse the message as JSON and echo back'
  };
}

async function processor(context: TurnContext, line: string) {
  await context.sendActivity({
    type: 'message',
    text: 'Echoing back in a separate activity.'
  });

  line = line.substr(5);

  const text = line[0] === '"' ? onErrorResumeNext(() => JSON.parse(line)) || '[Error while parsing the JSON]' : line;

  await context.sendActivity({
    type: 'message',
    text
  });
}

export { help, mode, name, processor }
