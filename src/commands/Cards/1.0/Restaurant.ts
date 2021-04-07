export default () => ({
    "$schema": "https://microsoft.github.io/AdaptiveCards/schemas/adaptive-card.json",
    "version": "1.0",
    "type": "AdaptiveCard",
    "body": [
        {
            "type": "Container",
            "items": [
                {
                    "type": "Image",
                    "altText": "Picture of pizza",
                    "url": "http://www.thefabliss.com/wp-content/uploads/2013/10/IMG_3938a1.jpg"
                },
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "TextBlock",
                            "size": "Medium",
                            "weight": "Bolder",
                            "text": "Serious Pie"
                        },
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "weight": "Bolder",
                                            "text": "★★★★☆"
                                        }
                                    ],
                                    "width": "auto"
                                },
                                {
                                    "type": "Column",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "weight": "Bolder",
                                            "text": "$$$"
                                        }
                                    ],
                                    "width": "stretch"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "type": "TextBlock",
            "size": "Small",
            "weight": "Lighter",
            "text": "Italian"
        },
        {
            "type": "TextBlock",
            "text": "316 Virginia St. Seattle"
        },
        {
            "type": "TextBlock",
            "spacing": "None",
            "text": "WA 98101"
        },
        {
            "type": "TextBlock",
            "text": "(206) 838-7388"
        }
    ],
    "actions": [
        {
            "type": "Action.ShowCard",
            "title": "Call restaurant",
            "card": {
                "type": "AdaptiveCard",
                "style": "emphasis",
                "body": [
                    {
                        "type": "Input.Date",
                        "id": "dueDate"
                    },
                    {
                        "type": "Input.Text",
                        "id": "comment",
                        "placeholder": "Add a comment",
                        "isMultiline": true
                    }
                ],
                "actions": [
                    {
                        "type": "Action.OpenUrl",
                        "title": "OK",
                        "url": "http://adaptivecards.io"
                    }
                ],
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
            }
        },
        {
            "type": "Action.OpenUrl",
            "title": "Get directions",
            "url": "http://abc.com"
        }
    ]
})
