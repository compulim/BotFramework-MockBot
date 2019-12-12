import { ActivityHandler } from 'botbuilder';

import * as OAuthCard from './commands/OAuthCard2';
import commands from './commands';
import reduceMap from './reduceMap';

let echoTypingConversations = new Set();

const LOG_LENGTH = 20;

export default class Bot extends ActivityHandler {
  logs: any[];
  numActivities: number;

  constructor() {
    super();

    this.logs = [];
    this.numActivities = 0;

    const logActivity = ({ activity }) => {
      this.numActivities++;

      this.logs.push({
        direction: 'incoming',
        now: new Date().toISOString(),
        activity
      });

      this.logs.splice(0, Math.max(0, this.logs.length - LOG_LENGTH));
    };

    const patchContext = context => {
      const originalSendActivity = context.sendActivity.bind(context);

      context.sendActivity = (...args) => {
        let activity = args[0];

        if (typeof activity === 'string') {
          activity = {
            type: 'message',
            text: activity
          };
        }

        this.logs.push({
          direction: 'outgoing',
          now: new Date().toISOString(),
          activity
        });

        return originalSendActivity(...args);
      };

      return context;
    };

    this.onEvent(async (context, next) => {
      context = patchContext(context);
      logActivity(context);

      const { activity: { name, value } } = context;

      if (name === 'tokens/response') {
        // Special handling for OAuth token exchange
        // This event is sent thru the non-magic code flow
        await OAuthCard.processor(context);
      } else if (name === 'webchat/join') {
        await context.sendActivity(`Got \`webchat/join\` event, your language is \`${ (value || {}).language }\``);
      } else if (name === 'webchat/ping') {
        await context.sendActivity({ type: 'event', name: 'webchat/pong', value: value });
      }

      await next();
    });

    this.onMessage(async (context, next) => {
      context = patchContext(context);
      logActivity(context);

      const { activity: { attachments = [], text } } = context;
      const cleanedText = (text || '').trim().replace(/\.$/, '');
      const command = commands.find(({ pattern }) => pattern.test(cleanedText));

      if (command) {
        const { mode, pattern, processor } = command;
        const match = pattern.exec(cleanedText);

        if (mode === 'line') {
          await processor(context, cleanedText);
        } else {
          await processor(context, ...[].slice.call(match, 1));
        }
      } else if (/^echo-typing$/i.test(cleanedText)) {
        // We should "echoTyping" in a per-conversation basis
        const { id: conversationID } = context.activity.conversation;

        if (echoTypingConversations.has(conversationID)) {
          echoTypingConversations.delete(conversationID);
          await context.sendActivity('Will stop echoing `"typing"` event');
        } else {
          echoTypingConversations.add(conversationID);
          await context.sendActivity('Will echo `"typing"` event');
        }
      } else if (/^help$/i.test(cleanedText)) {
        const attachments = commands.map(({ help, name }) => {
          return {
            contentType: 'application/vnd.microsoft.card.thumbnail',
            content: {
              buttons: reduceMap(
                help(),
                (result: [], title: string, value: string) => [
                  ...result,
                  {
                    title,
                    type: 'imBack',
                    value
                  }
                ],
                []
              ).sort(({ title: x }, { title: y }) => x > y ? 1 : x < y ? -1 : 0),
              title: name
            }
          };
        });

        await context.sendActivity({
          attachments: attachments.sort(({ content: { title: x } }, { content: { title: y } }) => x > y ? 1 : x < y ? -1 : 0)
        });
      } else if (/^help simple$/i.test(cleanedText)) {
        await context.sendActivity(`### Commands\r\n\r\n${ commands.map(({ pattern }) => `- \`${ pattern.source }\``).sort().join('\r\n') }`);
      } else if (attachments.length) {
        const { processor } = commands.find(({ pattern }) => pattern.test('upload'));

        await processor(context, attachments);
      } else if (context.activity.value) {
        const { text, value } = context.activity;
        const attachments = [];

        text && attachments.push({
          content: text,
          contentType: 'text/plain'
        });

        value && attachments.push({
          content: `\`\`\`\n${ JSON.stringify(value, null, 2) }\n\`\`\``,
          contentType: 'text/markdown'
        });

        await context.sendActivity({
          text: 'You posted',
          type: 'message',
          attachments
        });
      } else {
        await context.sendActivity({
          speak: `Unknown command: I don't know ${ cleanedText }. You can say "help" to learn more.`,
          text: `Unknown command: \`${ cleanedText }\`.\r\n\r\nType \`help\` to learn more.`,
          type: 'message'
        });
      }

      await next();
    });

    this.onMessageReaction(async (context, next) => {
      context = patchContext(context);
      logActivity(context);

      const { activity: { reactionsAdded = [], reactionsRemoved = [] }} = context;
      const attachments = [...reactionsAdded, ...reactionsRemoved].map(reaction => ({
        content: `\`\`\`\n${ JSON.stringify(reaction, null, 2) }\n\`\`\``,
        contentType: 'text/markdown'
      }));

      await context.sendActivity({
        text: 'You posted',
        type: 'message',
        attachments
      });

      await next();
    });

    this.onUnrecognizedActivityType(async (context, next) => {
      if (context.activity.type === 'typing') {
        context = patchContext(context);
        logActivity(context);

        if (echoTypingConversations.has(context.activity.conversation.id)) {
          await context.sendActivity({ type: 'typing' });
        }

      }

      await next();
    });
  }
}
