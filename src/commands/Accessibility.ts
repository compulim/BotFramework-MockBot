import { TurnContext } from 'botbuilder';
import * as AudioProcessor from './Audio';
import * as DocumentPlain from './DocumentPlain';
import * as DocumentWord from './DocumentWord';
import * as Image from './Image';
import * as ImageSVG from './ImageSVG';
import * as Layout from './Layout';
import * as Markdown from './Markdown';
import * as SuggestedActions from './SuggestedActionsCard';
import * as Text from './Text';
import * as Video from './Video';
import * as Xml from './Xml';

const name = 'Accessibility';

function help() {
  return {
    'accessibility': 'Show all activities related to accessibility test'
  };
}

async function processor(context: TurnContext) {
  await AudioProcessor.processor(context);
  await DocumentPlain.processor(context);
  await DocumentWord.processor(context);
  await Image.processor(context);
  await ImageSVG.processor(context);
  await Layout.processor(context);
  await Layout.processor(context, 'single');
  await Layout.processor(context, 'single carousel');
  await Layout.processor(context, 'double');
  await Layout.processor(context, 'carousel');
  await Markdown.processor(context);
  await Text.processor(context);
  await Video.processor(context, '', '');
  await Xml.processor(context);

  // Suggested actions must be the last activity
  await SuggestedActions.processor(context, '');
}

export { help, name, processor }
