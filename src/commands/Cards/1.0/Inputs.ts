// http://adaptivecards.io/samples/Inputs.html

export default () => ({
  "$schema": "https://microsoft.github.io/AdaptiveCards/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.0",
  "speak": "<s>Adaptive Card inputs example</s>",
  "body": [
    {
      "type": "TextBlock",
      "size": "medium",
      "weight": "bolder",
      "text": "Input.Text elements",
      "horizontalAlignment": "center"
    },
    {
      "type": "Input.Text",
      "placeholder": "Name",
      "style": "text",
      "maxLength": 0,
      "id": "SimpleVal",
      "speak": "What is your name?"
    },
    {
      "type": "Input.Text",
      "placeholder": "Homepage",
      "style": "url",
      "maxLength": 0,
      "id": "UrlVal",
      "speak": "What is your homepage?"
    },
    {
      "type": "Input.Text",
      "placeholder": "Email",
      "style": "email",
      "maxLength": 0,
      "id": "EmailVal",
      "speak": "What is your email address?"
    },
    {
      "type": "Input.Text",
      "placeholder": "Phone",
      "style": "tel",
      "maxLength": 0,
      "id": "TelVal",
      "speak": "What is your phone number?"
    },
    {
      "type": "Input.Text",
      "placeholder": "Comments",
      "style": "text",
      "isMultiline": true,
      "maxLength": 0,
      "id": "MultiLineVal",
      "speak": "What comments do you have?"
    },
    {
      "type": "Input.Number",
      "placeholder": "Quantity",
      "min": -5,
      "max": 5,
      "value": "",
      "id": "NumVal",
      "speak": "How many do you want?"
    },
    {
      "type": "Input.Date",
      "placeholder": "Due Date",
      "id": "DateVal",
      "speak": "What is the due date?"
    },
    {
      "type": "Input.Time",
      "placeholder": "Start time",
      "id": "TimeVal",
      "speak": "What time to start?"
    },
    {
      "type": "TextBlock",
      "size": "medium",
      "weight": "bolder",
      "text": "Input.ChoiceSet",
      "horizontalAlignment": "center"
    },
    {
      "type": "Input.ChoiceSet",
      "label": "What color do you want?",
      "style": "compact",
      "choices": [
        {
          "title": "Red",
          "value": "1",
          "isSelected": true
        },
        {
          "title": "Green",
          "value": "2"
        },
        {
          "title": "Blue",
          "value": "3"
        }
      ],
      "id": "SingleSelectVal"
    },
    {
      "type": "Input.ChoiceSet",
      "label": "What color do you want?",
      "choices": [
        {
          "title": "Red",
          "value": "1",
          "isSelected": true
        },
        {
          "title": "Green",
          "value": "2"
        },
        {
          "title": "Blue",
          "value": "3"
        }
      ],
      "id": "CompactSelectVal"
    },
    {
      "type": "Input.ChoiceSet",
      "label": "What colors do you want?",
      "isMultiSelect": true,
      "choices": [
        {
          "title": "Red",
          "value": "1",
          "isSelected": true
        },
        {
          "title": "Green",
          "value": "2"
        },
        {
          "title": "Blue",
          "value": "3",
          "isSelected": true
        }
      ],
      "id": "MultiSelectVal"
    },
    {
      "type": "TextBlock",
      "size": "medium",
      "weight": "bolder",
      "text": "Input.Toggle",
      "horizontalAlignment": "center"
    },
    {
      "type": "Input.Toggle",
      "title": "isCool (True/False)",
      "valueOn": "true",
      "valueOff": "false",
      "id": "IsCool",
      "speak": "Is it cool?"
    },
    {
      "type": "Input.Toggle",
      "title": "IsMale (valueOn/valueOff)",
      "valueOn": "Male",
      "valueOff": "Female",
      "id": "gender",
      "speak": "Are you male or female?"
    }
  ],
  "actions": [
    {
      "type": "Action.OpenUrl",
      "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "title": "Open Url"
    },
    {
      "type": "Action.Submit",
      "data": {
        "id": "1234567890"
      },
      "title": "Submit"
    },
    {
      "type": "Action.Http",
      "method": "POST",
      "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "body": "This is the body with Gender={{gender.value}}",
      "title": "POST"
    },
    {
      "type": "Action.ShowCard",
      "card": {
        "type": "AdaptiveCard",
        "body": [
          {
            "type": "TextBlock",
            // Subtle should not be used in ShowCard because poor contrast ratio.
            // "isSubtle": true,
            "text": "Seattle vs Panthers"
          },
          {
            "type": "ColumnSet",
            "columns": [
              {
                "type": "Column",
                "size": "auto",
                "items": [
                  {
                    "type": "Image",
                    "altText": "No image available",
                    "size": "small",
                    "url": "https://www.bing.com/th?id=AR_3934aff63dd6ff941034090a4b9d12e1&w=50&h=50&dpr=2&pid=AppEx",
                    "horizontalAlignment": "center"
                  },
                  {
                    "type": "TextBlock",
                    "weight": "bolder",
                    "text": "CAR",
                    "horizontalAlignment": "center"
                  }
                ]
              },
              {
                "type": "Column",
                "size": "stretch",
                "items": [
                  {
                    "type": "TextBlock",
                    "text": "Dec 4",
                    "horizontalAlignment": "center"
                  },
                  {
                    "type": "TextBlock",
                    "text": "Final",
                    "horizontalAlignment": "center"
                  },
                  {
                    "type": "TextBlock",
                    "size": "large",
                    "text": "7 - 40",
                    "horizontalAlignment": "center"
                  }
                ]
              },
              {
                "type": "Column",
                "size": "auto",
                "items": [
                  {
                    "type": "Image",
                    "altText": "No image available",
                    "size": "small",
                    "url": "https://www.bing.com/th?id=AR_95e44d654968e8de2336993a1cf8a3cf&w=50&h=50&dpr=2&pid=AppEx",
                    "horizontalAlignment": "center"
                  },
                  {
                    "type": "TextBlock",
                    "weight": "bolder",
                    "text": "SEA",
                    "horizontalAlignment": "center"
                  }
                ]
              }
            ]
          },
          {
            "type": "Input.Text",
            "placeholder": "enter comment",
            "style": "text",
            "maxLength": 0,
            "id": "CommentVal"
          }
        ],
        "actions": [
          {
            "type": "Action.Submit",
            "title": "OK"
          }
        ],
        "speak": "The Seattle Seahawks beat the Carolina Panters 40-7"
      },
      "title": "Show Card"
    }
  ]
})
