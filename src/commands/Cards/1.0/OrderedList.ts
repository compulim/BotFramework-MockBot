// http://adaptivecards.io/samples/Inputs.html

export default () => ({
  "$schema": "https://microsoft.github.io/AdaptiveCards/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.0",
  "speak": "<s>Adaptive Card inputs example</s>",
  "body": [
    {
      "type": "TextBlock",
      "size": "medium",
      "weight": "bolder",
      "text": "Ordered list:\n\n1. A\n   1. A.1\n   1. A.2\n1. B\n1. C\n\n"
    }
  ]
})
