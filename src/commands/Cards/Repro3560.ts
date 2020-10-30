export default () => ({
  type: 'AdaptiveCard',
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  version: '1.2',
  speak: 'Speak Text',
  id: 'ReturningUserGreeting',
  backgroundImage: 'https://webchat-mockbot.azurewebsites.net/public/assets/weather-sunny.png',
  body: [
    {
      type: 'Container',
      items: [
        {
          type: 'Image',
          url: 'https://webchat-mockbot.azurewebsites.net/public/assets/sports-seahawks.png',
          size: 'Stretch'
        }
      ]
    },
    {
      type: 'Container',
      spacing: 'None',
      items: [
        {
          type: 'ColumnSet',
          columns: [
            {
              type: 'Column',
              backgroundImage: 'https://webchat-mockbot.azurewebsites.net/public/assets/sports-panthers.png',
              items: [
                {
                  type: 'TextBlock',
                  id: 'title',
                  spacing: 'Medium',
                  size: 'Large',
                  weight: 'Bolder',
                  color: 'Light',
                  text: 'Textblock1',
                  wrap: true
                },
                {
                  type: 'TextBlock',
                  id: 'body',
                  size: 'Medium',
                  color: 'Light',
                  text: 'How can I help?',
                  wrap: true
                }
              ],
              width: 'stretch'
            }
          ]
        }
      ]
    }
  ]
});
