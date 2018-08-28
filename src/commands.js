import AdaptiveCard from './commands/AdaptiveCard';
import AnimationCard from './commands/AnimationCard';
import Audio from './commands/Audio';
import AudioCard from './commands/AudioCard';
import Carousel from './commands/Carousel';
import DocumentPlain from './commands/DocumentPlain';
import DocumentWord from './commands/DocumentWord';
import EmptyCard from './commands/EmptyCard';
import File from './commands/File';
import HeroCard from './commands/HeroCard';
import Image from './commands/Image';
import ImageSVG from './commands/ImageSVG';
import Layout from './commands/Layout';
import Markdown from './commands/Markdown';
import MultimediaCard from './commands/MultimediaCard';
import OAuthCard from './commands/OAuthCard';
import ReceiptCard from './commands/ReceiptCard';
import SignInCard from './commands/SignInCard';
import SuggestedActionsCard from './commands/SuggestedActionsCard';
import Text from './commands/Text';
import Video from './commands/Video';
import VideoCard from './commands/VideoCard';
import Xml from './commands/Xml';

export default [
  { pattern: /^card ([\d\w]+)(\s+[\d\w]+)?/i, processor: AdaptiveCard },
  { pattern: 'animationcard', processor: AnimationCard },
  { pattern: 'audio', processor: Audio },
  { pattern: 'audiocard', processor: AudioCard },
  { pattern: 'carousel', processor: Carousel },
  { pattern: 'document-plain', processor: DocumentPlain },
  { pattern: 'document-word', processor: DocumentWord },
  { pattern: 'emptycard', processor: EmptyCard },
  { pattern: 'file', processor: File },
  { pattern: 'herocard', processor: HeroCard },
  { pattern: 'image', processor: Image },
  { pattern: 'image-svg', processor: ImageSVG },
  { pattern: /^layout(\s+[\d\w]+)?(\s+[\d\w]+)?/i, processor: Layout },
  { pattern: 'markdown', processor: Markdown },
  { pattern: 'content-multimedia', processor: MultimediaCard },
  { pattern: 'oauth', processor: OAuthCard },
  { pattern: 'receiptcard', processor: ReceiptCard },
  { pattern: 'signin', processor: SignInCard },
  { pattern: /^suggested\-actions(\s+[\d\w]+)?/i, processor: SuggestedActionsCard },
  { pattern: 'text', processor: Text },
  { pattern: /^video(\s+([\d\w]+))?$/i, processor: Video },
  { pattern: 'videocard', processor: VideoCard },
  { pattern: 'xml', processor: Xml }
].map(({ pattern, processor }) => ({
  pattern: typeof pattern === 'string' ? new RegExp(`^${ pattern }$`, 'i') : pattern,
  processor
}))
