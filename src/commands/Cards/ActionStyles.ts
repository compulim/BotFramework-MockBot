export default () => ({
  "type": "AdaptiveCard",
  "actions": [
      {
          "type": "Action.Submit",
          "title": "Positive",
          "style": "positive"
      },
      {
        "type": "Action.Submit",
        "title": "Default",
        "style": "default"
      },
      {
        "type": "Action.Submit",
        "title": "Destructive",
        "style": "destructive"
    }
  ],
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.2"
})
