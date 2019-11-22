import { BotFrameworkAdapter } from 'botbuilder';

const {
  MICROSOFT_APP_ID,
  MICROSOFT_APP_PASSWORD,
  OAUTH_ENDPOINT = undefined,
  OPENID_METADATA = undefined
} = process.env;

export default function createBotFrameworkAdapter() {
  return new BotFrameworkAdapter({
    appId: MICROSOFT_APP_ID,
    appPassword: MICROSOFT_APP_PASSWORD,
    enableWebSockets: true,
    oAuthEndpoint: OAUTH_ENDPOINT,
    openIdMetadata: OPENID_METADATA
  });
}
