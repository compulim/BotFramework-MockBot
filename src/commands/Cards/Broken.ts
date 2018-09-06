export default (arg?: string) => {
  switch (arg) {
    case '1':
    case 'lang':
      return {
        "$schema":"https://microsoft.github.io/AdaptiveCards/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "lang": "invalid"
      };

    default:
      return {
        "$schema":"https://microsoft.github.io/AdaptiveCards/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": 'unknown',
        "body": [
          {
            "type": "TextBlock",
            "text": "This is the first line"
          }
        ]
      };
  }
}
