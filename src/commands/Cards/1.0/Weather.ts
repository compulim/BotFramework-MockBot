export default () => ({
    "$schema": "https://microsoft.github.io/AdaptiveCards/schemas/adaptive-card.json",
    "version": "1.0",
    "type": "AdaptiveCard",
    "body": [
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "height": "stretch",
                            "text": "Fri 20"
                        }
                    ],
                    "width": "auto"
                },
                {
                    "type": "Column",
                    "horizontalAlignment": "Right",
                    "separator": true,
                    "items": [
                        {
                            "type": "TextBlock",
                            "horizontalAlignment": "Right",
                            "height": "stretch",
                            "weight": "Bolder",
                            "text": "Seattle, WA"
                        }
                    ],
                    "width": "stretch"
                }
            ]
        },
        {
            "type": "Container",
            "items": [
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "items": [
                                {
                                    "type": "Image",
                                    "style": "Person",
                                    "altText": "",
                                    "url": "https://webchat-mockbot.azurewebsites.net/public/assets/weather-sunny.png",
                                    "size": "Medium"
                                }
                            ],
                            "width": "stretch"
                        },
                        {
                            "type": "Column",
                            "horizontalAlignment": "Center",
                            "spacing": "ExtraLarge",
                            "height": "stretch",
                            "verticalContentAlignment": "Center",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "size": "ExtraLarge",
                                    "weight": "Bolder",
                                    "text": "50°"
                                }
                            ],
                            "width": "auto"
                        },
                        {
                            "type": "Column",
                            "verticalContentAlignment": "Center",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "40°"
                                }
                            ],
                            "width": "auto"
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
                    "weight": "Bolder",
                    "text": "Sunny"
                },
                {
                    "type": "TextBlock",
                    "size": "Small",
                    "weight": "Lighter",
                    "text": "10% chance of rain"
                },
                {
                    "type": "TextBlock",
                    "spacing": "Small",
                    "size": "Small",
                    "weight": "Lighter",
                    "text": "Winds 5 mph NE"
                }
            ]
        },
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "horizontalAlignment": "Left",
                            "text": "Sat 21"
                        }
                    ],
                    "width": "stretch"
                },
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "horizontalAlignment": "Left",
                            "text": "Sun 22"
                        }
                    ],
                    "width": "stretch"
                },
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "horizontalAlignment": "Left",
                            "text": "Mon 23"
                        }
                    ],
                    "width": "stretch"
                }
            ]
        },
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "Image",
                            "altText": "",
                            "horizontalAlignment": "Left",
                            "url": "https://webchat-mockbot.azurewebsites.net/public/assets/weather-partly-cloudy-day.png",
                            "size": "Small"
                        }
                    ],
                    "width": "stretch"
                },
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "Image",
                            "altText": "",
                            "horizontalAlignment": "Left",
                            "url": "https://webchat-mockbot.azurewebsites.net/public/assets/weather-rain-showers-day.png",
                            "size": "Small"
                        }
                    ],
                    "width": "stretch"
                },
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "Image",
                            "altText": "",
                            "horizontalAlignment": "Left",
                            "url": "https://webchat-mockbot.azurewebsites.net/public/assets/weather-sunny.png",
                            "size": "Small"
                        }
                    ],
                    "width": "stretch"
                }
            ]
        },
        {
            "type": "ColumnSet",
            "spacing": "Default",
            "columns": [
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "horizontalAlignment": "Left",
                            "weight": "Bolder",
                            "text": "49°"
                        }
                    ],
                    "width": "stretch"
                },
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "horizontalAlignment": "Left",
                            "weight": "Bolder",
                            "text": "49°"
                        }
                    ],
                    "width": "stretch"
                },
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "horizontalAlignment": "Left",
                            "weight": "Bolder",
                            "text": "49°"
                        }
                    ],
                    "width": "stretch"
                }
            ]
        },
        {
            "type": "ColumnSet",
            "horizontalAlignment": "Left",
            "spacing": "None",
            "columns": [
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "horizontalAlignment": "Left",
                            "size": "Small",
                            "text": "39°"
                        }
                    ],
                    "width": "stretch"
                },
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "39°"
                        }
                    ],
                    "width": "stretch"
                },
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "39°"
                        }
                    ],
                    "width": "stretch"
                }
            ]
        },
        {
            "type": "TextBlock",
            "size": "Small",
            "weight": "Lighter",
            "text": "Updated 2:15 PM"
        }
    ]
})
