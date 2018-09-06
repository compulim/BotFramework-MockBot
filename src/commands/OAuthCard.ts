import { TurnContext } from 'botbuilder';
import { createOAuthPrompt } from 'botbuilder-prompts';

import fetch from 'node-fetch';

// Flow adopted from
// https://github.com/Microsoft/botbuilder-js/blob/master/samples/oauth-prompt-bot-es6/app.js

const oauthPrompt = createOAuthPrompt({
  connectionName: process.env.OAUTH_CONNECTION_NAME,
  text: 'Sign into GitHub',
  title: 'Sign in'
});

async function sendSignedInMessage(context: TurnContext) {
  await context.sendActivity({
    suggestedActions: {
      actions: [{
        type: 'imBack',
        title: 'See my profile',
        value: 'oauth profile'
      }, {
        type: 'imBack',
        title: 'Sign out',
        value: 'oauth signout'
      }],
      to: []
    },
    text: `You are signed in. Now you can say:\r\n\r\n- \`oauth profile\` to bring up your GitHub profile\r\n- \`oauth signout\` to sign out`,
    type: 'message'
  });
}

export default async function (context: TurnContext, arg?: string) {
  if (
    (context.activity.type === 'event' && context.activity.name === 'tokens/response')
    || /^\d{6}$/.test(arg)
  ) {
    await context.sendActivity('Please wait while I am authenticating with GitHub.');
    await context.sendActivity({ type: 'typing' });

    let token;

    // TODO: We should try to play with the access token to see if it really works
    if (/^\d{6}$/.test(arg)) {
      token = (await oauthPrompt.recognize(context)).token;
    } else {
      token = context.activity.value.token;
    }

    await sendSignedInMessage(context);
  } else if (arg === 'oauth profile') {
    const { token } = await oauthPrompt.getUserToken(context);

    context.sendActivity({ type: 'typing' });

    const res = await fetch(`https://api.github.com/user?access_token=${ encodeURIComponent(token) }`);

    if (res.status !== 200) {
      context.sendActivity(`Failed to bring up your profile, GitHub server returned \`${ res.status }\`.`);
    } else {
      const json = await res.json();

      context.sendActivity(`![${ json.login }](${ json.avatar_url })\r\n# \`${ json.login }\``);
    }
  } else if (arg === 'oauth signin') {
    await oauthPrompt.prompt(context);
    await context.sendActivity('If you got the magic code, reply me with `123456`.');
  } else if (arg === 'oauth signout') {
    await context.sendActivity({ type: 'typing' });
    await oauthPrompt.signOutUser(context);
    await context.sendActivity('You are now signed out.');
  } else {
    await context.sendActivity('Please wait while I am checking if you are signed in or not.');
    await context.sendActivity({ type: 'typing' });

    const token = await oauthPrompt.getUserToken(context);

    if (token) {
      await sendSignedInMessage(context);
    } else {
      await context.sendActivity({
        suggestedActions: {
          actions: [{
            type: 'imBack',
            title: 'Sign in',
            value: 'oauth signin'
          }],
          to: []
        },
        text: 'You are not signed in. Say `oauth signin` to sign in.',
        type: 'message'
      });
    }
  }
}
