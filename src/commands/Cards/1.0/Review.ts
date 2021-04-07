export default () => ({
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.0",
  "speak": "three of five stars, 856 reviews, Extremely Expensive. Steve G said, \"Another day, another airport\"",
  "body": [
    {
      "speak": "",
      "type": "ColumnSet",
      "columns": [
        {
          "type": "Column",
          "width": 2,
          "items": [
            {
              "type": "TextBlock",
              "text": "Airports"
            },
            {
              "type": "TextBlock",
              "text": "Sea-Tac",
              "weight": "bolder",
              "size": "extraLarge",
              "spacing": "none"
            },
            {
              "type": "TextBlock",
              "text": "3 ★★★☆☆ (856) · $$$$",
              "isSubtle": true,
              "spacing": "none"
            },
            {
              "type": "TextBlock",
              "text": "**Steve G. said** \"Another day, another airport.\"",
              "size": "small",
              "wrap": true
            }
          ]
        },
        {
          "type": "Column",
          "width": 1,
          "items": [
            {
              "type": "Image",
              "altText": "Image of airplane",
              "url": "http://adaptivecards.io/content/airplane.png",
              "size": "auto"
            }
          ]
        }
      ]
    }
  ],
  "actions": [
    {
      "type": "Action.OpenUrl",
      "title": "More Info",
      "url": "https://www.portseattle.org/sea-tac"
    }
  ]
})
