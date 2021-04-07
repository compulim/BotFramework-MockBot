export default () => ({
    "$schema": "https://microsoft.github.io/AdaptiveCards/schemas/adaptive-card.json",
    "version": "1.0",
    "type": "AdaptiveCard",
    "body": [
        {
            "type": "Container",
            "items": [
                {
                    "type": "TextBlock",
                    "size": "Medium",
                    "weight": "Bolder",
                    "text": "Card created: Publish"
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "items": [
                                {
                                    "type": "Image",
                                    "altText": "Image of Jeremy Cristiano",
                                    "style": "Person",
                                    "url": "https://mir-s3-cdn-cf.behance.net/user/276/c5a1422944313.57b74dfe1a48b.jpg",
                                    "size": "Small"
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
                                    "text": "Jeremy Cristiano",
                                    "wrap": true
                                },
                                {
                                    "type": "TextBlock",
                                    "spacing": "None",
                                    "text": "Fri, Feb 3 2017",
                                    "isSubtle": true,
                                    "wrap": true
                                }
                            ],
                            "width": "stretch"
                        }
                    ]
                }
            ]
        },
        {
            "type": "Container",
            "items": [
                {
                    "type": "TextBlock",
                    "text": "Now that we have defined the main rules and features format, we need to produce a schema.",
                    "wrap": true
                },
                {
                    "type": "FactSet",
                    "facts": [
                        {
                            "title": "Board:",
                            "value": "Adaptive Card"
                        },
                        {
                            "title": "List:",
                            "value": "Backlog"
                        },
                        {
                            "title": "Assigned to:",
                            "value": "Dan Marshall"
                        },
                        {
                            "title": "Due date:",
                            "value": "TBA"
                        }
                    ]
                }
            ]
        }
    ],
    "actions": [
        {
            "type": "Action.ShowCard",
            "title": "Set due date",
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
            "type": "Action.ShowCard",
            "title": "Comment",
            "card": {
                "type": "AdaptiveCard",
                "style": "emphasis",
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
            }
        },
        {
            "type": "Action.OpenUrl",
            "title": "View details",
            "url": "http://adaptivecards.io"
        }
    ]
})
