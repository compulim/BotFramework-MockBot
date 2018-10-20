import { TurnContext, ActivityTypes } from 'botbuilder';
import { OAuthPrompt, DialogSet, ChoicePrompt, DialogReason, WaterfallDialog } from 'botbuilder-dialogs';
import fetch from 'node-fetch';

import conversationState from '../singletonConversationState';

const dialogState = conversationState['createProperty']('dialogState');
const dialogs = new DialogSet(dialogState);

dialogs.add(new ChoicePrompt('CONFIRM_PROMPT'));

dialogs.add(new OAuthPrompt('OAUTH_PROMPT', {
  connectionName: process.env.OAUTH_CONNECTION_NAME,
  text: 'Sign into GitHub',
  title: 'Sign in'
}));

dialogs.add(new WaterfallDialog('AUTH_DIALOG', [
  async step => await step.prompt('OAUTH_PROMPT', {}),
  async step => {
    if (step.result) {
      await step.context.sendActivity('You have now logged in.');

      return await step.next(step.result);
    } else {
      await step.context.sendActivity('Failed to login, please try again.');

      return await step.endDialog();
    }
  },
  async step => {
    await step.context.sendActivity('Please wait while I am bringing up your GitHub profile.');

    step.context.sendActivity({ type: 'typing' });

    const { result: { token } } = step;
    const res = await fetch(`https://api.github.com/user?access_token=${ encodeURIComponent(token) }`);

    if (res.ok) {
      const json = await res.json();

      await step.context.sendActivity(`![${ json.login }](${ json.avatar_url })\r\n# \`${ json.login }\``);
    } else {
      await step.context.sendActivity(`Failed to bring up your profile, GitHub server returned \`${ res.status }\`.`);
    }

    return await step.endDialog();
  }
]));

function help() {
  return {
    'oauth': 'Start OAuth flow',
    'oauth signout': 'Sign out'
  };
}

const name = 'OAuth card';

async function processor(context: TurnContext, arg?: string) {
  if ((arg || '').trim() === 'oauth signout') {
    await context.sendActivity('Please wait while I am signing you out.');
    await context.sendActivity({ type: 'typing' });
    await context.adapter['signOutUser'](context, process.env.OAUTH_CONNECTION_NAME);
    await context.sendActivity('You have been signed out now.');
  } else {
    const dialogContext = await dialogs.createContext(context);

    await dialogContext.continueDialog();

    if (!context.responded) {
      await dialogContext.beginDialog('AUTH_DIALOG');
    }

    await conversationState['saveChanges'](context);
  }
}

export { help, name, processor }
