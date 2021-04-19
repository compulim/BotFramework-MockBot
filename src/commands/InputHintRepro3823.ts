import { BotFrameworkAdapter } from 'botbuilder';
import { TurnContext } from 'botbuilder';

const name = '3823';


async function processor(context: TurnContext) {
  await context.sendActivities([
      {
        "type": "message",
        "id": "6DuhF2C3ayVmIsJnyfLnK-h|0000013",
        "channelId": "directline",
        "from": {
          "id": "p0tier1bot01",
          "name": "p0tier1bot01"
        },
        "locale": "it-IT",
        "text": " C'è qualcos'altro che posso fare per te? 🤗",
        "speak": " C'è qualcos'altro che posso fare per te? 🤗",
        "inputHint": "expectingInput",
        "suggestedActions": {
          "actions": [
            {
              "type": "imBack",
              "title": "Sì, grazie!",
              "value": "sì, grazie!"
            },
            {
              "type": "imBack",
              "title": "No, grazie!",
              "value": "no, grazie!"
            }
          ],
          to: []
        },
        "attachments": [],
        "entities": []
      }
    ]);
}

export { name, processor }
