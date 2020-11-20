export default () => ({
    $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
    type: 'AdaptiveCard',
    version: '1.0',
    speak: '<s>مرحبا! إختر من إحدى النشاطاط بالأسفل</s>',
    body: [
      {
        type: 'TextBlock',
        text: 'مرحباً! انا اتحدث القليل من اللغة العربية',
        size: 'Large',
        weight: 'Bolder'
      },
      {
        type: 'TextBlock',
        text: '(Hello! I speak some Arabic)',
        size: 'Large',
        weight: 'Bolder'
      },
      {
        type: 'TextBlock',
        text: 'اختر من احدى الأوامر العربية المتاحة بالأسفل',
        isSubtle: true
      },
      {
        type: 'TextBlock',
        text: '(Select from the available Arabic commands below)',
        isSubtle: true,
        spacing: 'None'
      }
    ],
    actions: [
      {
        data: 'رحب بالقارئ',
        type: 'Action.Submit',
        title: 'رحب بالقارئ'
      },
      {
        data: 'يشترى',
        type: 'Action.Submit',
        title: 'carousel إظهر مكتبة دوارة'
      },
      {
        data: 'تحميل',
        type: 'Action.Submit',
        title: 'اظهر خاصية تحميل المرفقات'
      },
      {
        data: 'typing 1',
        type: 'Action.Submit',
        title: 'اعدادات تأثيرات الحركة للكتابة'
      },
      {
        data: 'نص',
        type: 'Action.Submit',
        title: 'markdown كارت'
      }
    ]
  });
