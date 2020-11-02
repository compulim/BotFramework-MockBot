import { TurnContext } from "botbuilder";

// import * as AdaptiveCard from "./AdaptiveCard";
// import * as InputHint from "./InputHint";
// import * as CardActions from "./CardActions";
// import * as SamplePasswordInput from "./SamplePasswordInput";
// import * as SampleReduxMiddleware from "./SampleReduxMiddleware";
// import * as Speech from "./Speech";
// import * as SuggestedActionsCard from "./SuggestedActionsCard";
// import * as SampleGitHubRepository from "./SampleGitHubRepository";
import * as AnimationCard from "./AnimationCard";
import * as Audio from "./Audio";
import * as AudioCard from "./AudioCard";
import * as Carousel from "./Carousel";
import * as ChannelData from "./ChannelData";
import * as DocumentDataURI from "./DocumentDataURI";
import * as DocumentPlain from "./DocumentPlain";
import * as DocumentWord from "./DocumentWord";
import * as DumpActivity from "./DumpActivity";
import * as Echo from "./Echo";
import * as EmptyCard from "./EmptyCard";
import * as File from "./File";
import * as HeroCard from "./HeroCard";
import * as Image from "./Image";
import * as ImageSVG from "./ImageSVG";
import * as InvalidCard from "./InvalidCard";
import * as Layout from "./Layout";
import * as Localization from "./Localization";
import * as Markdown from "./Markdown";
import * as MultimediaCard from "./MultimediaCard";
import * as OAuthCard from "./OAuthCard2";
import * as Proactive from "./Proactive";
import * as ReceiptCard from "./ReceiptCard";
import * as SampleBackchannel from "./SampleBackchannel";
import * as SignInCard from "./SignInCard";
import * as Slow from "./Slow";
import * as Text from "./Text";
import * as ThumbnailCard from "./ThumbnailCard";
import * as Timestamp from "./Timestamp";
import * as Typing from "./Typing";
import * as Unknown from "./Unknown";
import * as Upload from "./Upload";
import * as User from "./User";
import * as Video from "./Video";
import * as VideoCard from "./VideoCard";
import * as Xml from "./Xml";

const name = "All";

async function processor(context: TurnContext, options: any) {
  await AnimationCard.processor(context);
  await Audio.processor(context);
  await AudioCard.processor(context);
  await Carousel.processor(context);
  await ChannelData.processor(context);
  await DocumentDataURI.processor(context);
  await DocumentPlain.processor(context);
  await DocumentWord.processor(context);
  await DumpActivity.processor(context);
  await Echo.processor(context, "This should be echoed back");
  await EmptyCard.processor(context);
  await File.processor(context);
  await HeroCard.processor(context, "herocard");
  await HeroCard.processor(context, "herocard long title");
  await Image.processor(context);
  await ImageSVG.processor(context);
  await InvalidCard.processor(context);
  await Layout.processor(context);
  await Layout.processor(context, "single");
  await Layout.processor(context, "single carousel");
  await Layout.processor(context, "double");
  await Layout.processor(context, "carousel");
  await Localization.processor(context);
  await Markdown.processor(context);
  await MultimediaCard.processor(context);
  await OAuthCard.processor(context);
  await Proactive.processor(context, 'proactive');
  await ReceiptCard.processor(context, 'receiptcard');
  await ReceiptCard.processor(context, 'receiptcard2');
  await SampleBackchannel.processor(context);
  await SignInCard.processor(context);
  await Slow.processor(context);
  await ThumbnailCard.processor(context, "thumbnailcard");
  await ThumbnailCard.processor(context, "thumbnailcard long title");
  await Timestamp.processor(context);
  await Text.processor(context);
  await Typing.processor(context);
  await Unknown.processor(context);
  await Upload.processor(context);
  await User.processor(context);
  await Video.processor(context, "", "");
  await VideoCard.processor(context);
  await Xml.processor(context);

  await context.sendActivity({
    type: "message",
    text: "Commands finished"
  });
}

export { name, processor };
