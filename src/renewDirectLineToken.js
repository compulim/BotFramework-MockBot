const { DIRECT_LINE_DOMAIN = 'https://directline.botframework.com/v3/directline/' } = process.env

export default async function ({ domain = DIRECT_LINE_DOMAIN, token }) {
  console.log(`Renewing Direct Line token using token "${ token.substr(0, 3) }...${ token.substr(-3) }"`);

  let cres;

  cres = await fetch(`${ domain }tokens/refresh`, {
    headers: {
      authorization: `Bearer ${ token }`,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });

  if (cres.status === 200) {
    const json = await cres.json();

    if ('error' in json) {
      throw new Error(`Direct Line service responded ${ JSON.stringify(json.error) } while renewing token`);
    } else {
      return json;
    }
  } else {
    throw new Error(`Direct Line service returned ${ cres.status } while renewing token`);
  }
}
