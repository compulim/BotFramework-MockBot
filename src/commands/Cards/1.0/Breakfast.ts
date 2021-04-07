export default () => ({
    "$schema": "https://microsoft.github.io/AdaptiveCards/schemas/adaptive-card.json",
    "version": "1.0",
    "type": "AdaptiveCard",
    "speak": "Alarm Breakfast 10:00 AM Snooze for",
    "body": [
        {
            "type": "Container",
            "items": [
                {
                    "type": "TextBlock",
                    "size": "Small",
                    "weight": "Lighter",
                    "text": "Alarm"
                }
            ]
        },
        {
            "type": "Container",
            "items": [
                {
                    "type": "TextBlock",
                    "size": "Large",
                    "text": "Breakfast",
                    "wrap": true
                }
            ]
        },
        {
            "type": "TextBlock",
            "size": "Large",
            "weight": "Bolder",
            "text": "10:00 AM"
        },
        {
            "type": "Container",
            "items": [
                {
                    "type": "TextBlock",
                    "size": "Small",
                    "weight": "Lighter",
                    "text": "Snooze for"
                },
                {
                    "id": "time",
                    "label": "Snooze time",
                    "type": "Input.ChoiceSet",
                    "value": "10m",
                    "placeholder": "Placeholder text",
                    "choices": [
                        {
                            "title": "10 minutes",
                            "value": "10m"
                        },
                        {
                            "title": "30 minutes",
                            "value": "30m"
                        }
                    ]
                }
            ]
        }
    ],
    "actions": [
        {
            "type": "Action.Submit",
            "title": "Snooze"
        },
        {
            "type": "Action.Submit",
            "title": "Dismiss"
        }
    ]
})
