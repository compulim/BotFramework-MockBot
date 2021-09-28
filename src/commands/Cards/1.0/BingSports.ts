export default () => ({
  "$schema": "https://microsoft.github.io/AdaptiveCards/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.0",
  "speak": "The Seattle Seahawks beat the Carolina Panthers 40-7",
  "body": [
    {
      "type": "TextBlock",
      "text": "Seattle vs Panthers",
      "isSubtle": true
    },
    {
      "type": "Container",
      "selectAction": {
        "type": "Action.OpenUrl",
        "url": "http://msn.com",
        "title": "Container action"
      },
      "items": [
        {
          "type": "ColumnSet",
          "columns": [
            {
              "type": "Column",
              "size": "auto",
              "items": [
                {
                  "type": "Image",
                  "altText": "Panthers logo",
                  "url": "https://webchat-mockbot.azurewebsites.net/public/assets/sports-panthers.png",
                  "size": "small",
                  "horizontalAlignment": "center",
                  "selectAction": {
                    "type":  "Action.OpenUrl",
                    "url": "http://bing.com/",
                    "title": "Panthers logo, tap to open Bing.com"
                  }
                },
                {
                  "type": "TextBlock",
                  "text": "CAR",
                  "horizontalAlignment": "center",
                  "size": "normal",
                  "weight": "bolder"
                }
              ],
              "selectAction": {
                "type": "Action.OpenUrl",
                "title": "Column action",
                "url": "http://msnbc.com"
              }
            },
            {
              "type": "Column",
              "size": "stretch",
              "items": [
                {
                  "type": "TextBlock",
                  "text": "Dec 4",
                  "horizontalAlignment": "center"
                },
                {
                  "type": "TextBlock",
                  "text": "Final",
                  "horizontalAlignment": "center"
                },
                {
                  "type": "TextBlock",
                  "text": "7 - 40",
                  "size": "large",
                  "horizontalAlignment": "center"
                }
              ]
            },
            {
              "type": "Column",
              "size": "auto",
              "items": [
                {
                  "type": "Image",
                  "altText": "Seahawks logo",
                  "url": "https://webchat-mockbot.azurewebsites.net/public/assets/sports-seahawks.png",
                  "size": "small",
                  "horizontalAlignment": "center"
                },
                {
                  "type": "TextBlock",
                  "text": "SEA",
                  "horizontalAlignment": "center",
                  "size": "normal",
                  "weight": "bolder"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})
