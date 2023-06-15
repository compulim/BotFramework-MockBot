import { TurnContext } from 'botbuilder';

const name = 'Markdown';

function help() {
  return {
    'markdown curlyAria': 'Markdown message with `aria-label` in curly braces should not render: `{aria-label}` ',
    'markdown curlyData': 'Markdown message with `data-abc` in curly braces should render: `{data-abc}` ',
    markdown: 'Show a Markdown-formatted message'
  };
}

async function processor(context: TurnContext, arg?: string) {
  const { PUBLIC_URL } = process.env;
  arg = !!arg && arg.toLowerCase().trim();

  if (arg === 'curlyaria') {
    await context.sendActivity({
      type: 'message',
      textFormat: 'markdown',
      text: `\`aria-label\` should not render: {aria-label}`
    });
  } else if (arg === 'curlydata') {
    await context.sendActivity({
      type: 'message',
      textFormat: 'markdown',
      text: `\`data-abc\` should render: {data-abc}`
    });
  } else {
    await context.sendActivity({
      type: 'message',
      textFormat: 'markdown',
      text: "## Basic formatting\n\nParagraphs can be written like so. A paragraph is the \nbasic block of Markdown. \nA paragraph is what text will turn \ninto when there is no reason it should become anything else.\n\nParagraphs must be separated by a blank line. Basic formatting of *italics* \nand **bold** is supported. This *can be **nested** like* so.\n\n## Lists\n\n### Ordered list\n\n1. one\n2. two\n3. three\n4. four\n\n### Unordered list\n\n* An item\n* Another item\n* Yet another item\n* And there's more...\n\n## Paragraph modifiers\n\n### Code block\n\n```\nCode blocks are very useful for developers and other \npeople who look at code or other things that are written \nin plain text. As you can see, it uses a fixed-width font.\n```\n\nYou can also make `inline code` to add code into other things.\n\n### Quote\n\n> Here is a quote. What this is should be self explanatory. \n> Quotes are automatically indented when they are used.\n\n## h2\n### h3\n#### h4\n\n### Headings *can* also contain **formatting**\n\n## URLs\n\nURLs can be made in a handful of ways:\n\n* A named link to [MarkItDown][3]. The easiest way to do these is to\n select what you want to make a link and hit `Ctrl+L`.\n* Another named link to [MarkItDown](http://www.markitdown.net/)\n* Some links have [query strings](https://bing.com?q=some%20value) \nthat need encoding\n* Sometimes you just want a URL like <http://www.markitdown.net/>.\n\n## Horizontal rule\n\nA horizontal rule is a line that goes across the middle of the page.\n\n---\n\nIt's sometimes handy for breaking things up.\n\n\n## Table\n|header1|header 2|\n|----|----|\n| cell 1 | cell 2|\n| cell three | cell four|\n\n## Whitespace\n\nHere's a line.\n\nThis has the standard two newlines before it.\n\n\n\nThis has four newlines before it.\n\n\n\n\n\nThis has six newlines before it.\n\n<br/><br/><br/><br/>This has two newlines and four &lt;br/&gt; tags before it.\n\n[3]: http://www.markitdown.net/"
    });
  }
}

export { help, name, processor };
