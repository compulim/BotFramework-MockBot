export default () => ({
  "type": "AdaptiveCard",
  "actions": [
      {
        "style": "positive",
        "title": "Positive",
        "type": "Action.Submit"
      },
      {        
        "style": "default",
        "title": "Default",
        "type": "Action.Submit"
      },
      {
        "style": "destructive",
        "title": "Destructive",
        "type": "Action.Submit"
    }
  ],
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.2"
})
