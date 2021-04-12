export default () => ({
  type: 'AdaptiveCard',
  version: '1.2',
  body: [
    {
      type: 'Container',
      items: [
        {
          type: 'TextBlock',
          text: '"Good" Container Style'
        }
      ],
      style: 'good'
    },
    {
      type: 'Container',
      items: [
        {
          type: 'TextBlock',
          text: '"Attention" Container Style'
        }
      ],
      style: 'attention'
    },
    {
      type: 'Container',
      items: [
        {
          type: 'TextBlock',
          text: '"Emphasis" Container Style'
        }
      ],
      style: 'emphasis'
    },
    {
      type: 'Container',
      items: [
        {
          type: 'TextBlock',
          text: '"Accent" Container Style'
        }
      ],
      style: 'accent'
    },
    {
      type: 'Container',
      items: [
        {
          type: 'TextBlock',
          text: '"Warning" Container Style'
        }
      ],
      style: 'warning'
    },
    {
      type: 'Container',
      items: [
        {
          type: 'TextBlock',
          text: '"Default" Container Style'
        }
      ]
    }
  ],
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json'
});
