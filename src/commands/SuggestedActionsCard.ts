import { TurnContext } from 'botbuilder';

const name = 'Suggested actions';

function help() {
  return {
    'suggested-actions': 'Show a suggested actions demo'
  };
}

async function processor(context: TurnContext, arg: string) {
  const { PUBLIC_URL } = process.env;

  if (arg) {
    await context.sendActivity({
      type: 'message',
      text: `You submitted "${ arg.trim() }"`
    });
  } else {
    await context.sendActivity({
      type: 'message',
      textFormat: 'plain',
      text: 'Please select one of the actions below',
      suggestedActions: {
        actions: [
          {
            image: `${ PUBLIC_URL }assets/square-icon.png`,
            title: 'IM back as string',
            type: 'imBack',
            value: 'postback imback-string',
          },
          {
            image: `${ PUBLIC_URL }assets/square-icon-red.png`,
            title: 'Post back as string',
            type: 'postBack',
            value: 'postback postback-string',
          },
          {
            image: `${ PUBLIC_URL }assets/square-icon-green.png`,
            title: 'Post back as JSON',
            text: 'Some text',
            type: 'postBack',
            value: {
              hello: 'World!'
            },
          },
          {
            image: `${ PUBLIC_URL }assets/square-icon-purple.png`,
            displayText: 'say Hello World!',
            title: 'Message back as JSON with display text',
            text: 'Some text',
            type: 'messageBack',
            value: {
              hello: 'World!'
            },
          },
          {
            image: `${ PUBLIC_URL }assets/square-icon-purple.png`,
            title: 'Message back as JSON without display text',
            type: 'messageBack',
            value: {
              hello: 'World!'
            },
          },
          {
            displayText: 'Aloha',
            image: `${ PUBLIC_URL }assets/square-icon-purple.png`,
            text: 'echo Hello',
            title: 'Message back as string with display text',
            type: 'messageBack',

            // TODO: Remove value after bumping DLJS
            value: null
          }
        ],
        // TODO: Should we fill in the "to"?
        to: []
      }
    });
  }
}

export { help, name, processor }
