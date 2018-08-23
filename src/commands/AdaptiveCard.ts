import { TurnContext } from 'botbuilder';

import BingSports from './Cards/BingSports';
import Broken from './Cards/Broken';
import CalendarReminder from './Cards/CalendarReminder';
import FlightUpdate from './Cards/FlightUpdate';
import Inputs from './Cards/Inputs';
import Simple from './Cards/Simple';
import Weather from './Cards/Weather';

function getCardJSON(name: string = '', arg: string) {
  switch (name.toLowerCase()) {
    case 'bingsports':
    case 'sports':
      return BingSports();

    case 'broken':
      return Broken(arg);

    case 'calendarreminder':
    case 'calendar':
    case 'reminder':
      return CalendarReminder();

    case 'flight':
    case 'flightupdate':
      return FlightUpdate();

    case 'inputs':
      return Inputs();

    case 'simple':
      return Simple();

    case 'weather':
      return Weather();
  }
}

export default async function (context: TurnContext, name: string = '', arg: string) {
  const content = getCardJSON(name, (arg || '').trim());

  if (content) {
    let text;

    if (name === 'weather') {
      text = 'This is the weather card';
    }

    await context.sendActivity({
      type: 'message',
      text,
      attachments: [{
        contentType: 'application/vnd.microsoft.card.adaptive',
        content
      }]
    });
  } else {
    await context.sendActivity({
      type: 'message',
      text: `No card named "${ name }"`
    });
  }
}
