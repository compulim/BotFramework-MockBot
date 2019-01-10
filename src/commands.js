import * as Accessibility from './commands/Accessibility';
import * as AdaptiveCard from './commands/AdaptiveCard';
import * as AnimationCard from './commands/AnimationCard';
import * as Audio from './commands/Audio';
import * as AudioCard from './commands/AudioCard';
import * as Carousel from './commands/Carousel';
import * as ChannelData from './commands/ChannelData';
import * as DocumentDataURI from './commands/DocumentDataURI';
import * as DocumentPlain from './commands/DocumentPlain';
import * as DocumentWord from './commands/DocumentWord';
import * as DumpActivity from './commands/DumpActivity';
import * as Echo from './commands/Echo';
import * as EmptyCard from './commands/EmptyCard';
import * as File from './commands/File';
import * as HeroCard from './commands/HeroCard';
import * as Image from './commands/Image';
import * as ImageSVG from './commands/ImageSVG';
import * as InputHint from './commands/InputHint';
import * as InvalidCard from './commands/InvalidCard';
import * as Layout from './commands/Layout';
import * as Localization from './commands/Localization';
import * as Markdown from './commands/Markdown';
import * as MultimediaCard from './commands/MultimediaCard';
import * as OAuthCard from './commands/OAuthCard2';
import * as Proactive from './commands/Proactive';
import * as ReceiptCard from './commands/ReceiptCard';
import * as SampleBackchannel from './commands/SampleBackchannel';
import * as SampleGitHubRepository from './commands/SampleGitHubRepository';
import * as SamplePasswordInput from './commands/SamplePasswordInput';
import * as SampleReduxMiddleware from './commands/SampleReduxMiddleware';
import * as SignInCard from './commands/SignInCard';
import * as Slow from './commands/Slow';
import * as SuggestedActionsCard from './commands/SuggestedActionsCard';
import * as Text from './commands/Text';
import * as Timestamp from './commands/Timestamp';
import * as Typing from './commands/Typing';
import * as Unknown from './commands/Unknown';
import * as Upload from './commands/Upload';
import * as Video from './commands/Video';
import * as VideoCard from './commands/VideoCard';
import * as Xml from './commands/Xml';

export default [
  { pattern: 'accessibility', ...Accessibility },
  { pattern: /^card(\s+[\d\w:]+)(\s+[\d\w:]+)?(\s+[\d\w:]+)?(\s+[\d\w:]+)?(\s+[\d\w:]+)?/i, ...AdaptiveCard },
  { pattern: 'animationcard', ...AnimationCard },
  { pattern: 'audio', ...Audio },
  { pattern: 'audiocard', ...AudioCard },
  { pattern: 'carousel', ...Carousel },
  { pattern: 'channel-data', ...ChannelData },
  { pattern: 'document-data-uri', ...DocumentDataURI },
  { pattern: 'document-plain', ...DocumentPlain },
  { pattern: 'document-word', ...DocumentWord },
  { pattern: 'dump-activity', ...DumpActivity },
  { pattern: /^echo\s/i, ...Echo },
  { pattern: 'emptycard', ...EmptyCard },
  { pattern: 'file', ...File },
  { pattern: 'herocard', ...HeroCard },
  { pattern: 'image', ...Image },
  { pattern: 'image-svg', ...ImageSVG },
  { pattern: /^input[\-\s]hint(\s+[\d\w]+)?/i, ...InputHint },
  { pattern: 'invalidcard', ...InvalidCard },
  { pattern: /^layout(\s+[\d\w]+)?(\s+[\d\w]+)?/i, ...Layout },
  { pattern: 'localization', ...Localization },
  { pattern: 'markdown', ...Markdown },
  { pattern: 'content-multimedia', ...MultimediaCard },
  { pattern: /^(oauth(\s+[\d\w]+)?|\d{6})$/i, ...OAuthCard },
  { pattern: 'sample:password-input', ...SamplePasswordInput },
  { pattern: 'proactive', ...Proactive },
  { pattern: 'receiptcard', ...ReceiptCard },
  { pattern: 'sample:backchannel', ...SampleBackchannel },
  { pattern: 'sample:github-repository', ...SampleGitHubRepository },
  { pattern: /^sample:redux-middleware(\s+[\d\w\-]+)*$/i, ...SampleReduxMiddleware },
  { pattern: 'signin', ...SignInCard },
  { pattern: /^slow(\s+[\d\w]+)?/i, ...Slow },
  { pattern: /^suggested\-actions(\s+[\d\w]+)?/i, ...SuggestedActionsCard },
  { pattern: 'text', ...Text },
  { pattern: /^timestamp(\s+[\d\w]+)?/i, ...Timestamp },
  { pattern: /^typing(\s+[\d\w]+)?/i, ...Typing },
  { pattern: /^unknown(\s+[\d\w]+)?/i, ...Unknown },
  { pattern: 'upload', ...Upload },
  { pattern: /^video(\s+([\d\w]+))?$/i, ...Video },
  { pattern: 'videocard', ...VideoCard },
  { pattern: 'xml', ...Xml }
].map(command => ({
  ...command,
  pattern: typeof command.pattern === 'string' ? new RegExp(`^${ command.pattern }$`, 'i') : command.pattern,
}))
