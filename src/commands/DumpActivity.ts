import { TurnContext } from 'botbuilder';

const name = 'Debug activity';

function help() {
  return {
    'dump-activity': 'Dump activity sent by the user as a JSON'
  };
}

async function processor(context: TurnContext) {
  const { activity } = context;
  const {
    action,
    attachmentLayout,
    attachments,
    channelId,
    conversation,
    channelData,
    entities,
    from,
    id,
    inputHint,
    locale,
    localTimestamp,
    name,
    recipient,
    replyToId,
    serviceUrl,
    speak,
    suggestedActions,
    summary,
    text,
    textFormat,
    timestamp,
    topicName,
    type,
    value
  } = activity;

  const serializedActivity = {
    action,
    attachmentLayout,
    attachments: attachments && attachments.map(({
      content,
      contentType,
      contentUrl,
      name,
      thumbnailUrl
    }) => ({
      content,
      contentType,
      contentUrl,
      name,
      thumbnailUrl
    })),
    channelId,
    conversation,
    channelData,
    entities,
    from,
    id,
    inputHint,
    locale,
    localTimestamp,
    name,
    recipient,
    replyToId,
    serviceUrl,
    speak,
    suggestedActions: suggestedActions && {
      actions: suggestedActions.actions.map(({
        image,
        text,
        title,
        type,
        value
      }) => ({
        image,
        text,
        title,
        type,
        value
      })),
      to: suggestedActions.to
    },
    summary,
    text,
    textFormat,
    timestamp,
    topicName,
    type,
    value
  };

  await context.sendActivity({
    type: 'message',
    text: 'Partial dump of the activity sent by the user.',
    attachments: [{
      content: `\`\`\`\n${ JSON.stringify(serializedActivity, null, 2) }\n\`\`\``,
      contentType: 'text/markdown'
    }]
  });
}

export { help, name, processor }
