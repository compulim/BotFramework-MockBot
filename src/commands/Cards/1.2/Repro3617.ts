export default () => ({
  $schema: 'https://microsoft.github.io/AdaptiveCards/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.2',
  speak: 'Would you like **to** reset',

  body: [
    {
      type: 'TextBlock',
      text: 'Would you like to',
      wrap: true
    }
  ],
  actions: [
    {
      type: 'Action.Submit',
      id: '0button',
      data: 'Button 1',
      title: 'Button 1'
    },
    {
      type: 'Action.Submit',
      id: '1button',
      data: 'Button 2',
      title: 'Button 2'
    },
    {
      type: 'Action.Submit',
      id: '2button',
      data: 'Button 3',
      title: 'Button 3'
    },
    {
      type: 'Action.Submit',
      id: '3button',
      data: 'Button 4',
      title: 'Button 4'
    }
  ]
});
