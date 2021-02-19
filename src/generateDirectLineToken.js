import fetch from 'node-fetch';

import createUserID from './createUserID';

const { DIRECT_LINE_URL = 'https://directline.botframework.com/' } = process.env

export default async function (userID) {
  const { DIRECT_LINE_SECRET } = process.env;

  userID || (userID = await createUserID());

  console.log(`Generating Direct Line token using secret "${ DIRECT_LINE_SECRET.substr(0, 3) }...${ DIRECT_LINE_SECRET.substr(-3) }" and user ID "${ userID }"`);

  let cres;

  cres = await fetch(`${ DIRECT_LINE_URL }v3/directline/tokens/generate`, {
    body: JSON.stringify({ User: { Id: userID } }),
    headers: {
      authorization: `Bearer ${ DIRECT_LINE_SECRET }`,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });

  if (cres.status === 200) {
    const json = await cres.json();

    if ('error' in json) {
      throw new Error(`Direct Line service responded ${ JSON.stringify(json.error) } while generating new token`);
    } else {
      const { conversationId: conversationID, ...otherJSON } = json;

      return { ...otherJSON, conversationID, userID };
    }
  } else {
    throw new Error(`Direct Line service returned ${ cres.status } while generating new token`);
  }
}
