export default () => ({
  $schema: 'https://microsoft.github.io/AdaptiveCards/schemas/adaptive-card.json',
  contentType: 'application/vnd.microsoft.card.adaptive',
  contentUrl: null,
  type: 'AdaptiveCard',
  version: '1.2',
  speak:
    "<speak version='1.0' xmlns='https://www.w3.org/2001/10/synthesis' xmlns:mstts='https://www.w3.org/2001/mstts'><voice>Would you like **to** reset</voice></speak>",

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
