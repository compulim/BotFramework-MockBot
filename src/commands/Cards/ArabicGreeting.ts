export default () => ({
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.2",
  "speak": "<s>Arabic<Hello! select an action below></s>",
  "body": [
      {
          "type": "TextBlock",
          "text": "Arabic<Hello! I speak some Arabic.> ",
          "size": "Large",
          "weight": "Bolder"
      },
      {
          "type": "TextBlock",
          "text": "(Hello! I speak some Arabic)",
          "size": "Large",
          "weight": "Bolder"
      },
      {
          "type": "TextBlock",
          "text": "Arabic<Select from the available Arabic commands below>",
          "isSubtle": true
      },
      {
          "type": "TextBlock",
          "text": "(Select from the available Arabic commands below)",
          "isSubtle": true,
          "spacing": "None"
      },
      {
          "type": "TextBlock",
          "text": "Command translations to English:"
      },
      {
          "type": "FactSet",
          "facts": [
              {
                  "title": "1",
                  "value": "Say hello"
              },
              {
                  "title": "2",
                  "value": "Show a carousel"
              },
              {
                  "title": "3",
                  "value": "Show download attachment"
              },
              {
                "title": "4",
                "value": "Show Right to Left tests"
              },
              {
                "title": "5",
                "value": "Typing animation"
            },
            {
                "title": "6",
                "value": "Markdown card"
            }
          ]
      }
  ],
  "actions": [
      {
          "type": "Action.Submit",
          "title": "Arabic<Say hello>"
      },
      {
          "type": "Action.Submit",
          "title": "Arabic<Show a carousel>"
      },
      {
          "type": "Action.Submit",
          "title": "Arabic<Show download attachment>"
      },
      {
        "type": "Action.Submit",
        "title": "Arabic<Right to Left tests>"
      },
      {
        "type": "Action.Submit",
        "title": "Arabic<Typing animation>"
      },
      {
          "type": "Action.Submit",
          "title": "Arabic<Markdown card>"
      }
  ]
})
