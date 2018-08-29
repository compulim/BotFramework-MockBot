import { TurnContext } from 'botbuilder';

import BingSports from './Cards/BingSports';
import Breakfast from './Cards/Breakfast';
import Broken from './Cards/Broken';
import CalendarReminder from './Cards/CalendarReminder';
import FlightUpdate from './Cards/FlightUpdate';
import FlightTracking from './Cards/FlightTracking';
import Inputs from './Cards/Inputs';
import Restaurant from './Cards/Restaurant';
import RichMessage from './Cards/RichMessage';
import Simple from './Cards/Simple';
import Weather from './Cards/Weather';
import Review from './Cards/Review';

function getCardJSON(name: string = '', arg: string): any[] {
  switch (name.toLowerCase()) {
    case 'bingsports':
    case 'sports':
      return [BingSports()];

    case 'breakfast':
      return [Breakfast()];

    case 'broken':
      return [Broken(arg)];

    case 'calendarreminder':
    case 'calendar':
    case 'reminder':
      return [CalendarReminder()];

    case 'flight':
    case 'flightupdate':
      return [FlightUpdate()];

    case 'inputs':
      return [Inputs()];

    case 'multiple':
      return [
        FlightUpdate(),
        Weather()
      ];

    case 'review':
      return [Review()];

    case 'simple':
      return [Simple()];

    case 'weather':
      return [Weather()];

    case 'flighttracking':
      return [FlightTracking()];

    case 'restaurant':
      return [Restaurant()];

    case 'richmessage':
      return [RichMessage()]
  }
}

export default async function (context: TurnContext, name: string = '', arg: string) {
  const contents = getCardJSON(name, (arg || '').trim());

  if (contents && contents.length) {
    let text;

    switch (name) {
      case 'multiple':
        text = 'Multiple cards';
        break;

      case 'weather':
        text = 'This is the weather card';
        break;
    }

    await context.sendActivity({
      type: 'message',
      text,
      attachmentLayout: 'carousel',
      attachments: contents.map(content => ({
        contentType: 'application/vnd.microsoft.card.adaptive',
        content
      }))
    });
  } else {
    await context.sendActivity({
      type: 'message',
      text: `No card named "${ name }"`
    });
  }
}
