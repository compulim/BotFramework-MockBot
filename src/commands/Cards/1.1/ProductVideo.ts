// This sample is borrowed from the AdaptiveCards repo
// https://github.com/microsoft/AdaptiveCards/tree/main/samples/v1.1/Scenarios

export default () => ({
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.1',
  fallbackText:
    'This card requires Media to be viewed. Ask your platform to update to Adaptive Cards v1.1 for this and more!',
  body: [
    {
      type: 'Media',
      poster: 'https://adaptivecards.io/content/poster-video.png',
      altText: 'Adaptive Cards overview video',
      sources: [
        {
          mimeType: 'video/mp4',
          url: 'https://adaptivecardsblob.blob.core.windows.net/assets/AdaptiveCardsOverviewVideo.mp4'
        }
      ]
    }
  ],
  actions: [
    {
      type: 'Action.OpenUrl',
      title: 'Learn more',
      url: 'https://adaptivecards.io'
    }
  ]
});
