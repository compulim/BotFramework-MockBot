import { Attachment, TurnContext } from 'botbuilder';
import fetch from 'node-fetch';

const name = 'File upload';

function help() {
  return {
    upload: 'Upload a file'
  };
}

async function fetchJSON(url) {
  const res = await fetch(url);

  if (res.ok) {
    const text = await res.text();

    return JSON.parse(text);
  } else {
    throw new Error(`Server returned ${res.status}`);
  }
}

function isTrustedAttachmentURL(url) {
  return (
    /^https:\/\/directline.botframework.com\//i.test(url) ||
    /^https:\/\/webchat.botframework.com\//i.test(url) ||
    /^https?:\/\/localhost(:\d+)?\//i.test(url)
  );
}

async function echoAttachment({ contentType, contentUrl, name }) {
  if (isTrustedAttachmentURL(contentUrl)) {
    // We only fetch content from trusted source, so we don't DDoS anyone.

    if (contentType === 'application/json') {
      return {
        content: await fetchJSON(contentUrl),
        contentType: 'application/vnd.microsoft.card.adaptive',
        name
      };
    } else if (/.attachmentjson$/iu.test(name)) {
      return await fetchJSON(contentUrl);
    }
  }

  return {
    contentType: 'application/octet-stream',
    contentUrl,
    name
  };
}

async function processor(context: TurnContext, attachments: Attachment[] = []) {
  if (attachments.length) {
    await context.sendActivity({
      text: 'You have uploaded:',
      type: 'message',
      attachments: await Promise.all(attachments.map(echoAttachment))
    });
  } else {
    await context.sendActivity({
      text: 'You have uploaded no files.',
      type: 'message'
    });
  }
}

export { help, name, processor };
