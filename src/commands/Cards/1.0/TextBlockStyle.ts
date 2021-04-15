export default () => ({
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.0",
  "body": [
    {
      "type": "TextBlock",
      "text": "This is some text",
      "size": "large"
    },
    {
      "type": "TextBlock",
      "text": "It doesn't wrap by default",
      "weight": "bolder"
    },
    {
      "type": "TextBlock",
      "text": "So set **wrap** to true if you plan on showing a paragraph of text",
      "wrap": true,
      "color": "accent"
    },
    {
      "type": "TextBlock",
      "text": "You can even draw attention to certain text with color",
      "wrap": true,
      "color": "attention"
    },
    {
      "type": "TextBlock",
      "text": "Text with color: dark",
      "wrap": true,
      "color": "dark"
    },
    {
      "type": "TextBlock",
      "text": "Text with color: good",
      "wrap": true,
      "color": "good"
    },
    {
      "type": "TextBlock",
      "text": "Text with color: light",
      "wrap": true,
      "color": "light"
    },
    {
      "type": "TextBlock",
      "text": "Text with color: warning",
      "wrap": true,
      "color": "warning"
    }
  ]
})
