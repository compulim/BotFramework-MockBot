import { TurnContext } from 'botbuilder';

import ActionStyles from './Cards/ActionStyles';
import BingSports from './Cards/BingSports';
import Breakfast from './Cards/Breakfast';
import Broken from './Cards/Broken';
import CalendarReminder from './Cards/CalendarReminder';
import FlightTracking from './Cards/FlightTracking';
import FlightUpdate from './Cards/FlightUpdate';
import Inputs from './Cards/Inputs';
import Markdown from './Cards/Markdown';
import OrderedList from './Cards/OrderedList';
import Restaurant from './Cards/Restaurant';
import Review from './Cards/Review';
import RichMessage from './Cards/RichMessage';
import Simple from './Cards/Simple';
import SportsClub from './Cards/SportsClub';
import UnorderedList from './Cards/UnorderedList';
import Weather from './Cards/Weather';

function getCardJSON(name: string = ''): any {
  switch (name.trim().toLowerCase()) {
    case 'actionstyles':
      return ActionStyles();

    case 'bingsports':
    case 'sports':
      return BingSports();

    case 'breakfast':
      return Breakfast();

    case 'broken':
      return Broken();

    case 'broken:1':
    case 'broken:lang':
      return Broken('1');

    case 'calendarreminder':
    case 'calendar':
    case 'reminder':
      return CalendarReminder();

    case 'flight':
    case 'flightupdate':
      return FlightUpdate();

    case 'flighttracking':
      return FlightTracking();

    case 'inputs':
      return Inputs();

    case 'markdown':
      return Markdown();

    case 'ol':
      return OrderedList();

    case 'restaurant':
      return Restaurant();

    case 'review':
      return Review();

    case 'richmessage':
      return RichMessage();

    case 'simple':
      return Simple();

    case 'sportsclub':
      return SportsClub();

    case 'ul':
      return UnorderedList();

    case 'weather':
      return Weather();
  }
}

const name = 'Adaptive Card';

function help() {
  return {
    'card bingsports': 'Show Bing sports using Adaptive Card',
    'card breakfast': 'Show breakfast review using Adaptive Card',
    'card broken:lang': 'Show an Adaptive Card that is broken because of invalid language identifier',
    'card broken': 'Show an Adaptive Card that is broken because of invalid version',
    'card flight': 'Show flight update using Adaptive Card',
    'card flighttracking': 'Show flight tracking using Adaptive Card',
    'card inputs': 'Show an Adaptive Card with all types of inputs',
    'card ol': 'Show an ordered list with Markdown',
    'card markdown': 'Show Markdown using Adaptive Card',
    'card reminder': 'Show a reminder using Adaptive Card',
    'card restaurant': 'Show restaurant information using Adaptive Card',
    'card review': 'Show review using Adaptive Card',
    'card richmessage': 'Show a rich message using Adaptive Card',
    'card simple': 'Show a simple Adaptive Card',
    'card sportsclub': 'Show a comprehensive sports club POI using Adaptive Card',
    'card ul': 'Show an unordered list with Markdown',
    'card weather': 'Show weather forecast using Adaptive Card'
  };
}

async function processor(context: TurnContext, ...names: string[]) {
  const contents = names.filter(name => name).map(name => getCardJSON(name));

  if (contents && contents.length) {
    let text = `Showing ${ names.filter(name => name).join(', ') }`;

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

export { help, name, processor }
