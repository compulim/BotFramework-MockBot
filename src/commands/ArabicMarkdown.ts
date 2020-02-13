import { TurnContext } from "botbuilder";

const name = "Markdown";

function help() {
  return {
    "markdown arabic": "Show a Markdown-formatted message with Arabic text"
  };
}

async function processor(context: TurnContext, arg: string = "") {
  const { PUBLIC_URL } = process.env;

  await context.sendActivity({
    type: "message",
    textFormat: "markdown",
    text: `## التنسيق الأساسي \r\n\r\nيمكنك كتابة فقرات بالشكل التالي. الفقرة هي \r\n markdown المكون الرئيسي للغة \r\n\r\n *باستطاعتك استخدام *الخطوط المائلة  \nو**الخطوط العريضة**. يمكن استخدام هذه الخطوط *بشكل **متداخل** ايضا*\r\n\r\n## القوائم\r\n\r\n### القوائم المرتبة\r\n\r\n1.	واحد\r\n2.	إثنان\r\n3. ثلاثة\r\n\r\n### تعليق\r\n\r\n> هذا مثال بسيط لتعليق \r\n> يتم وضع فرجة بشكل تلقائي قبل اي استخدام لتعليق\r\n\r\n## (URLs) عناوين مواقع`
  });
}

export { help, name, processor };
