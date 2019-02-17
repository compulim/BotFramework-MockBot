import createUserID from './createUserID';

export default async function (userID) {
  const { DIRECT_LINE_SECRET } = process.env;

  userID || (userID = await createUserID());

  console.log(`Generating Direct Line token using secret "${ DIRECT_LINE_SECRET.substr(0, 3) }...${ DIRECT_LINE_SECRET.substr(-3) }" and user ID "${ userID }"`);

  let cres;

  cres = await fetch('https://directline.botframework.com/v3/directline/tokens/generate', {
    body: JSON.stringify({ User: { Id: userID || await createUserID() } }),
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
      return json;
    }
  } else {
    throw new Error(`Direct Line service returned ${ cres.status } while generating new token`);
  }
}
