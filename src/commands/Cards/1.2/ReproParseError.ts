export default () => ({
  $schema: 'https://microsoft.github.io/AdaptiveCards/schemas/adaptive-card.json',
  type: 'AdaptiveCard',
  version: '1.0',
  speak: 'The Seattle Seahawks beat the Carolina Panthers 40-7',
  body: [
    {
      cinemaList: [
        {
          cinemaName: 'CCP',
          locationLat: 0,
          locationLong: 0,
          dateList: [{ showDate: 'N/A', timeSlotList: [{ showTime: '4.00 PM' }, { showTime: '5.00 PM' }] }]
        },
        { cinemaName: 'JEM' }
      ]
    }
  ]
});
