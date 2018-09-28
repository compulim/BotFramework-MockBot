import AdaptiveCard from './commands/AdaptiveCard';
import AnimationCard from './commands/AnimationCard';
import Audio from './commands/Audio';
import AudioCard from './commands/AudioCard';
import Carousel from './commands/Carousel';
import DocumentPlain from './commands/DocumentPlain';
import DocumentWord from './commands/DocumentWord';
import Empty from './commands/Empty';
import EmptyCard from './commands/EmptyCard';
import EmptyWithSuggestions from './commands/EmptyWithSuggestions'
import File from './commands/File';
import HeroCard from './commands/HeroCard';
import Image from './commands/Image';
import ImageSVG from './commands/ImageSVG';
import Layout from './commands/Layout';
import Localization from './commands/Localization';
import Markdown from './commands/Markdown';
import MultimediaCard from './commands/MultimediaCard';
import OAuthCard from './commands/OAuthCard';
import Postback from './commands/Postback';
import ReceiptCard from './commands/ReceiptCard';
import SampleGitHubRepository from './commands/SampleGitHubRepository';
import SampleReduxMiddleware from './commands/SampleReduxMiddleware';
import SignInCard from './commands/SignInCard';
import SuggestedActionsCard from './commands/SuggestedActionsCard';
import Text from './commands/Text';
import Typing from './commands/Typing';
import Unknown from './commands/Unknown';
import Upload from './commands/Upload';
import Video from './commands/Video';
import VideoCard from './commands/VideoCard';
import Xml from './commands/Xml';

export default [
  // TODO: Turn this into /.../ig
  { pattern: /^card(\s+[\d\w:]+)(\s+[\d\w:]+)?(\s+[\d\w:]+)?(\s+[\d\w:]+)?(\s+[\d\w:]+)?/i, processor: AdaptiveCard },
  { pattern: 'animationcard', processor: AnimationCard },
  { pattern: 'audio', processor: Audio },
  { pattern: 'audiocard', processor: AudioCard },
  { pattern: 'carousel', processor: Carousel },
  { pattern: 'document-plain', processor: DocumentPlain },
  { pattern: 'document-word', processor: DocumentWord },
  { pattern: 'empty', processor: Empty },
  { pattern: 'emptycard', processor: EmptyCard },
  { pattern: 'empty-with-suggested-actions', processor: EmptyWithSuggestions },
  { pattern: 'sample:github-repository', processor: SampleGitHubRepository },
  { pattern: 'file', processor: File },
  { pattern: 'herocard', processor: HeroCard },
  { pattern: 'image', processor: Image },
  { pattern: 'image-svg', processor: ImageSVG },
  { pattern: /^layout(\s+[\d\w]+)?(\s+[\d\w]+)?/i, processor: Layout },
  { pattern: 'localization', processor: Localization },
  { pattern: 'markdown', processor: Markdown },
  { pattern: 'content-multimedia', processor: MultimediaCard },
  { pattern: /^(oauth(\s+[\d\w]+)?|\d{6})$/, processor: OAuthCard },
  { pattern: /^postback(\s+[\d\w\-]+)?$/, processor: Postback },
  { pattern: 'receiptcard', processor: ReceiptCard },
  { pattern: 'sample:github-repository', processor: SampleGitHubRepository },
  { pattern: /^sample:redux-middleware(\s+[\d\w\-]+)*$/, processor: SampleReduxMiddleware },
  { pattern: 'signin', processor: SignInCard },
  { pattern: /^suggested\-actions(\s+[\d\w]+)?/i, processor: SuggestedActionsCard },
  { pattern: 'text', processor: Text },
  { pattern: /^typing(\s+[\d\w]+)?/i, processor: Typing },
  { pattern: /^unknown(\s+[\d\w]+)?/i, processor: Unknown },
  { pattern: 'upload', processor: Upload },
  { pattern: /^video(\s+([\d\w]+))?$/i, processor: Video },
  { pattern: 'videocard', processor: VideoCard },
  { pattern: 'xml', processor: Xml }
].map(({ pattern, processor }) => ({
  pattern: typeof pattern === 'string' ? new RegExp(`^${ pattern }$`, 'i') : pattern,
  processor
}))
