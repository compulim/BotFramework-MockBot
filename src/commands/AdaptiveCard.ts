import { TurnContext } from 'botbuilder';

import ActionStyles from './Cards/1.2/ActionStyles';
import BingSports from './Cards/1.0/BingSports';
import Breakfast from './Cards/1.0/Breakfast';
import Broken from './Cards/Broken';
import CalendarReminder from './Cards/1.0/CalendarReminder';
import ContainerStyles from './Cards/1.2/ContainerStyles';
import FlightTracking from './Cards/1.0/FlightTracking';
import FlightUpdate from './Cards/FlightUpdate';
import ArabicGreeting from './Cards/1.0/ArabicGreeting';
import Inputs from './Cards/1.0/Inputs';
import Markdown from './Cards/1.0/Markdown';
import OrderedList from './Cards/1.0/OrderedList';
import Restaurant from './Cards/1.0/Restaurant';
import Repro3560 from './Cards/1.2/Repro3560';
import Repro3617 from './Cards/1.2/Repro3617';
import Review from './Cards/1.0/Review';
import TextBlockStyle from './Cards/1.0/TextBlockStyle';
import RichMessage from './Cards/1.0/RichMessage';
import Simple from './Cards/Simple';
import SportsClub from './Cards/1.0/SportsClub';
import UnorderedList from './Cards/1.0/UnorderedList';
import Weather from './Cards/1.0/Weather';
import ProductVideo from './Cards/1.1/ProductVideo';
import Agenda from './Cards/1.3/Agenda';
import CardWizard from './Cards/1.3/CardWizard';
import ReproParseError from './Cards/1.2/ReproParseError';

function getCardJSON(name: string = ''): any {
  switch (name.trim().toLowerCase()) {
    case 'agenda':
      return Agenda();
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

    case 'cardwizard':
    case 'wizard':
      return CardWizard();

    case 'containerstyles':
      return ContainerStyles();

    case 'flight':
    case 'flightupdate':
      return FlightUpdate();

    case 'flighttracking':
      return FlightTracking();

    case 'arabicgreeting':
    case 'rtlgreeting':
    case 'رحب بالقارئ':
      return ArabicGreeting();

    case 'input':
    case 'inputs':
      return Inputs();

    case 'markdown':
      return Markdown();

    case 'ol':
      return OrderedList();

    case 'productvideo':
    case 'product video':
    case 'pv':
      return ProductVideo();

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

    case 'textblockstyle':
    case 'textstyle':
      return TextBlockStyle();

    case 'ul':
      return UnorderedList();

    case 'weather':
      return Weather();

    case '3560':
      return Repro3560();

    case '3617':
      return Repro3617();

    case 'parse:error':
      return ReproParseError();
  }
}

const name = 'Adaptive Card';

function help() {
  return {
    'card arabicgreeting': 'Show a greeting in Arabic (for RTL)',
    'card bingsports': 'Show Bing sports using Adaptive Card',
    'card breakfast': 'Show breakfast review using Adaptive Card',
    'card broken:lang': 'Show an Adaptive Card that is broken because of invalid language identifier',
    'card broken': 'Show an Adaptive Card that is broken because of invalid version',
    'card containerstyles': 'Show a card with Adaptive Card containers',
    'card flight': 'Show flight update using Adaptive Card',
    'card flighttracking': 'Show flight tracking using Adaptive Card',
    'card inputs': 'Show an Adaptive Card with all types of inputs',
    'card markdown': 'Show Markdown using Adaptive Card',
    'card ol': 'Show an ordered list with Markdown',
    'card product video': 'Show a product video using Adaptive Cards',
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
  if (/^what/iu.test(names[0])) {
    await context.sendActivity({
      type: 'message',
      speak: 'Here is the forecast for this week.',
      attachmentLayout: 'carousel',
      attachments: [{
          contentType: 'application/vnd.microsoft.card.adaptive',
          content: Weather()
        }, {
          contentType: 'application/vnd.microsoft.card.adaptive',
          content: FlightUpdate()
        }, {
          contentType: 'application/vnd.microsoft.card.adaptive',
          content: RichMessage()
        }]
    });

    return;
  }

  if (/^arabic greeting|^arabicgreeting|رحب بالقارئ/iu.test(context.activity.text)) {
    const content = getCardJSON('arabicgreeting');

    await context.sendActivity({
      type: 'message',
      attachments: [
        {
          contentType: 'application/vnd.microsoft.card.adaptive',
          content
        }
      ]
    });

    return;
  }

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
      text: `No card named '${ name }'`
    });
  }
}

export { help, name, processor }
