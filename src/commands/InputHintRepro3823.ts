import { BotFrameworkAdapter } from 'botbuilder';
import { TurnContext } from 'botbuilder';

const name = 'Input hint';

function help() {
  return {
    'input-hint accepting': 'Send an activity with input hint set to "accepting input"',
    'input-hint expecting': 'Send an activity with input hint set to "expecting input"',
    'input-hint ignoring': 'Send an activity with input hint set to "ignoring input"'
  };
}

// async function sendInputHint(reference, inputHint) {
//   const adapter = new BotFrameworkAdapter({
//     appId: process.env.MICROSOFT_APP_ID,
//     appPassword: process.env.MICROSOFT_APP_PASSWORD
//   });

//   await adapter.continueConversation(reference, async context => {
//     switch ((inputHint || '').trim().substr(0, 1)) {
//       case 'a':
//         await context.sendActivity({
//           inputHint: 'acceptingInput',
//           text: 'This activity is accepting input.',
//           type: 'message'
//         });

//         break;

//       case 'e':
//         await context.sendActivity({
//           inputHint: 'expectingInput',
//           text: 'This activity is expecting input.\n\nIt should start the microphone if it was from a microphone.',
//           type: 'message'
//         });

//         break;

//       default:
//         await context.sendActivity({
//           inputHint: 'ignoringInput',
//           text: 'This activity is ignoring input.\n\nIt should not start the microphone.',
//           type: 'message'
//         });

//         break;
//     }
//   });
// }

async function processor(context: TurnContext) {
  await context.sendActivities([
      {
        "type": "message",
        "id": "6DuhF2C3ayVmIsJnyfLnK-h|0000013",
        // "timestamp": "2021-04-08T05:57:22.5315975Z",
        "channelId": "directline",
        "from": {
          "id": "p0tier1bot01",
          "name": "p0tier1bot01"
        },
        // "conversation": {
        //   "id": "6DuhF2C3ayVmIsJnyfLnK-h"
        // },
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
          // to: []
        },
        "attachments": [],
        "entities": [],
        "replyToId": "6DuhF2C3ayVmIsJnyfLnK-h|0000006",
        "DNU": false,
        "EndConversation": false,
        "ClientData": "",
        "NodeType": "",
        "Node_QuestionType": "ChoiceSuggestion",
        "MainScenarioName": "Informazioni - Carta di Credito - Costi",
        "CurrentScenario": "End Dialog",
        "StartScenario": false,
        "ActiveNodeStep": 2,
        "SessionId": "949a8027e5304e568125fc2ee54c9e68",
        "Node_ID": "00000000-0000-0000-0000-000000000000"
      }
    ]);
}

export { help, name, processor }
