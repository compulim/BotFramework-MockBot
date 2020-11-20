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
      "text": "Unordered list:\n\n* A\n   * A.1\n   * A.2\n* B\n* C\n\n"
    }
  ]
})
