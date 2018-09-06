import { TurnContext } from 'botbuilder';
import { createOAuthPrompt } from 'botbuilder-prompts';

// https://github.com/Microsoft/botbuilder-js/blob/master/samples/oauth-prompt-bot-es6/app.js

const oauthPrompt = createOAuthPrompt({
  connectionName: process.env.OAUTH_CONNECTION_NAME,
  text: 'Sign into GitHub',
  title: 'Sign in'
});

export default async function (context: TurnContext) {
  await oauthPrompt.prompt(context);

  // await context.sendActivity({
  //   type: 'message',
  //   attachments: [{
  //     contentType: 'application/vnd.microsoft.card.oauth',
  //     content: {
  //       text: 'Login to OAuth sample',
  //       connectionname: process.env.OAUTH_CONNECTION_NAME,
  //       buttons: [{
  //         type: 'signin',
  //         title: 'Sign in to OAuth application'
  //       }]
  //     }
  //   }]
  // });
}
