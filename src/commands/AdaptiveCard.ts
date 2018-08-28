import { TurnContext } from 'botbuilder';

import BingSports from './Cards/BingSports';
import Broken from './Cards/Broken';
import CalendarReminder from './Cards/CalendarReminder';
import FlightUpdate from './Cards/FlightUpdate';
import Inputs from './Cards/Inputs';
import Simple from './Cards/Simple';
import Weather from './Cards/Weather';
import Review from './Cards/Review';

function getCardJSON(name: string = '', arg: string): any[] {
  switch (name.toLowerCase()) {
    case 'bingsports':
    case 'sports':
      return [BingSports()];

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

    case 'simple':
      return [Simple()];

    case 'weather':
      return [Weather()];

    case 'review':
      return [Review()];
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
