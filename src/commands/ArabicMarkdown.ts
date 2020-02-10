import { TurnContext } from "botbuilder";

const name = "Markdown";

function help() {
  return {
    markdown: "Show a Markdown-formatted message",
    "markdown arabic": "Show a Markdown-formatted message with Arabic text"
  };
}

async function processor(context: TurnContext, arg: string = "") {
  const { PUBLIC_URL } = process.env;
  // console.log(arg);
  switch (context.activity.text) {
    case "markdown arabic":
    case "Arabic<Arabic markdown>":

      break;
    default: {
      await context.sendActivity({
        type: "message",
        textFormat: "markdown",
        text: `## Arabic<Basic formatting>\r\n\r\nArabic<Paragraphs can be written like so. A paragraph is the> \r\nArabic<basic block of Markdown.> \r\n\r\nArabic<Basic formatting of *italics*> \nArabic<and **bold** is supported. This *can be **nested** like* so.>\r\n\r\n## Arabic<Lists>\r\n\r\n### Arabic<Ordered list>\r\n\r\nArabic<1. one>\r\nArabic<2. two>\r\nArabic<3. three>\r\n\r\n### Arabic<Quote>\r\n\r\n> Arabic<Here is a quote. What this is should be self explanatory.> \r\n> Arabic<Quotes are automatically indented when they are used.`
      });
    }
  }
}

export { help, name, processor };
