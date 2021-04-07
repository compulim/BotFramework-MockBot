export default () => ({
    "$schema": "https://microsoft.github.io/AdaptiveCards/schemas/adaptive-card.json",
    "version": "1.0",
    "type": "AdaptiveCard",
    "body": [
        {
            "type": "Container",
            "items": [
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
                                            "type": "TextBlock",
                                            "size": "Large",
                                            "text": "Alaska Airlines"
                                        }
                                    ],
                                    "width": "stretch"
                                },
                                {
                                    "type": "Column",
                                    "items": [
                                        {
                                            "type": "Image",
                                            "altText": "Airplane image",
                                            "url": "https://webchat-mockbot.azurewebsites.net/public/assets/airplane.png",
                                            "size": "Small"
                                        }
                                    ],
                                    "width": "auto"
                                }
                            ]
                        },
                        {
                            "type": "TextBlock",
                            "weight": "Bolder",
                            "text": "Flight 524"
                        },
                        {
                            "type": "TextBlock",
                            "size": "Small",
                            "weight": "Lighter",
                            "text": "UXGG64"
                        }
                    ]
                }
            ]
        },
        {
            "type": "Container",
            "spacing": "Medium",
            "items": [
                {
                    "type": "TextBlock",
                    "weight": "Bolder",
                    "color": "Accent",
                    "text": "Status: Delayed"
                },
                {
                    "type": "TextBlock",
                    "spacing": "None",
                    "text": "Departs in 3 hr 24 min"
                }
            ]
        },
        {
            "type": "Container",
            "spacing": "Medium",
            "items": [
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "weight": "Bolder",
                                    "text": "Depart "
                                }
                            ],
                            "width": "auto"
                        },
                        {
                            "type": "Column",
                            "spacing": "Medium",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Seattle, WA"
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
                                    "type": "TextBlock",
                                    "size": "Small",
                                    "weight": "Lighter",
                                    "text": "Fri, Feb 3, 2017"
                                }
                            ],
                            "width": "stretch"
                        },
                        {
                            "type": "Column",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "weight": "Lighter",
                                    "text": "Gate"
                                }
                            ],
                            "width": "stretch"
                        }
                    ]
                },
                {
                    "type": "ColumnSet",
                    "spacing": "None",
                    "columns": [
                        {
                            "type": "Column",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "size": "Large",
                                    "weight": "Bolder",
                                    "color": "Accent",
                                    "text": "7:35 PM"
                                }
                            ],
                            "width": "stretch"
                        },
                        {
                            "type": "Column",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "size": "Large",
                                    "weight": "Bolder",
                                    "text": "16C"
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
            "spacing": "Medium",
            "items": [
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "weight": "Bolder",
                                    "text": "Arrive"
                                }
                            ],
                            "width": "auto"
                        },
                        {
                            "type": "Column",
                            "spacing": "Medium",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Los Angeles, CA"
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
                                    "type": "TextBlock",
                                    "size": "Small",
                                    "weight": "Lighter",
                                    "text": "Fri, Feb 3, 2017"
                                }
                            ],
                            "width": "stretch"
                        },
                        {
                            "type": "Column",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "size": "Small",
                                    "weight": "Lighter",
                                    "text": "Gate"
                                }
                            ],
                            "width": "stretch"
                        }
                    ]
                },
                {
                    "type": "ColumnSet",
                    "spacing": "None",
                    "columns": [
                        {
                            "type": "Column",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "size": "Large",
                                    "weight": "Bolder",
                                    "color": "Accent",
                                    "text": "9:55 PM"
                                }
                            ],
                            "width": "stretch"
                        },
                        {
                            "type": "Column",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "size": "Large",
                                    "weight": "Bolder",
                                    "text": "2A"
                                }
                            ],
                            "width": "stretch"
                        }
                    ]
                }
            ]
        }
    ]
})
