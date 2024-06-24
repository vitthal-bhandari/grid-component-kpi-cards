const sampleResponse = {
    "data": {
        "metric": "daily-active-users",
        "segmentKey": "platform",
        "segmentId": "ios",
        "values": [
            {
                "date": "2024-06-23",
                "value": 51206
            },
            {
                "date": "2024-06-22",
                "value": 91737
            },
            {
                "date": "2024-06-21",
                "value": 74018
            },
            {
                "date": "2024-06-20",
                "value": 89335
            },
            {
                "date": "2024-06-19",
                "value": 76497
            },
            {
                "date": "2024-06-18",
                "value": 28025
            },
            {
                "date": "2024-06-17",
                "value": 27478
            },
            {
                "date": "2024-06-16",
                "value": 28199
            },
            {
                "date": "2024-06-15",
                "value": 95082
            },
            {
                "date": "2024-06-14",
                "value": 66003
            },
            {
                "date": "2024-06-13",
                "value": 49278
            },
            {
                "date": "2024-06-12",
                "value": 72689
            },
            {
                "date": "2024-06-11",
                "value": 19888
            },
            {
                "date": "2024-06-10",
                "value": 59498
            },
            {
                "date": "2024-06-09",
                "value": 65774
            },
            {
                "date": "2024-06-08",
                "value": 98684
            },
            {
                "date": "2024-06-07",
                "value": 72844
            },
            {
                "date": "2024-06-06",
                "value": 14073
            },
            {
                "date": "2024-06-05",
                "value": 73510
            },
            {
                "date": "2024-06-04",
                "value": 41700
            },
            {
                "date": "2024-06-03",
                "value": 27522
            },
            {
                "date": "2024-06-02",
                "value": 92365
            },
            {
                "date": "2024-06-01",
                "value": 59717
            },
            {
                "date": "2024-05-31",
                "value": 87817
            },
            {
                "date": "2024-05-30",
                "value": 95333
            },
            {
                "date": "2024-05-29",
                "value": 71951
            },
            {
                "date": "2024-05-28",
                "value": 46094
            },
            {
                "date": "2024-05-27",
                "value": 84335
            }
        ]
    }
};

const sampleMetricsData = {
    "data": [
        {
            "id": "daily-active-users",
            "displayName": "Daily Active Users (DAU)",
            "isPercentageMetric": false
        },
        {
            "id": "weekly-active-users",
            "displayName": "Weekly Active Users (WAU)",
            "isPercentageMetric": false
        },
        {
            "id": "monthly-active-users",
            "displayName": "Monthly Active Users (MAU)",
            "isPercentageMetric": false
        },
        {
            "id": "user-retention-rate",
            "displayName": "User Retention Rate",
            "isPercentageMetric": true
        },
        {
            "id": "churn-rate",
            "displayName": "Churn Rate",
            "isPercentageMetric": true
        },
        {
            "id": "average-session-duration",
            "displayName": "Average Session Duration",
            "isPercentageMetric": false
        },
        {
            "id": "pages-per-session",
            "displayName": "Pages Per Session",
            "isPercentageMetric": false
        },
        {
            "id": "bounce-rate",
            "displayName": "Bounce Rate",
            "isPercentageMetric": true
        },
        {
            "id": "customer-lifetime-value",
            "displayName": "Customer Lifetime Value (CLV)",
            "isPercentageMetric": false
        },
        {
            "id": "net-promoter-score",
            "displayName": "Net Promoter Score (NPS)",
            "isPercentageMetric": true
        },
        {
            "id": "conversion-rate",
            "displayName": "Conversion Rate",
            "isPercentageMetric": true
        },
        {
            "id": "cost-per-acquisition",
            "displayName": "Cost Per Acquisition (CPA)",
            "isPercentageMetric": false
        },
        {
            "id": "return-on-investment",
            "displayName": "Return on Investment (ROI)",
            "isPercentageMetric": true
        },
        {
            "id": "engagement-rate",
            "displayName": "Engagement Rate",
            "isPercentageMetric": true
        },
        {
            "id": "click-through-rate",
            "displayName": "Click-Through Rate (CTR)",
            "isPercentageMetric": true
        }
    ]
};

const sampleSegmentsdata = {
    "data": [
        {
            "segmentKey": "platform",
            "displayName": "Platform",
            "values": [
                {
                    "segmentId": "ios",
                    "displayName": "iOS"
                },
                {
                    "segmentId": "android",
                    "displayName": "Android"
                },
                {
                    "segmentId": "web",
                    "displayName": "Web"
                }
            ]
        },
        {
            "segmentKey": "country",
            "displayName": "Country",
            "values": [
                {
                    "segmentId": "us",
                    "displayName": "United States"
                },
                {
                    "segmentId": "uk",
                    "displayName": "United Kingdom"
                },
                {
                    "segmentId": "india",
                    "displayName": "India"
                },
                {
                    "segmentId": "canada",
                    "displayName": "Canada"
                },
                {
                    "segmentId": "australia",
                    "displayName": "Australia"
                }
            ]
        },
        {
            "segmentKey": "planType",
            "displayName": "Plan Type",
            "values": [
                {
                    "segmentId": "free",
                    "displayName": "Free"
                },
                {
                    "segmentId": "basic",
                    "displayName": "Basic"
                },
                {
                    "segmentId": "premium",
                    "displayName": "Premium"
                },
                {
                    "segmentId": "enterprise",
                    "displayName": "Enterprise"
                }
            ]
        },
        {
            "segmentKey": "acquisitionSource",
            "displayName": "Acquisition Source",
            "values": [
                {
                    "segmentId": "organic",
                    "displayName": "Organic"
                },
                {
                    "segmentId": "paid",
                    "displayName": "Paid"
                },
                {
                    "segmentId": "referral",
                    "displayName": "Referral"
                },
                {
                    "segmentId": "social",
                    "displayName": "Social Media"
                },
                {
                    "segmentId": "email",
                    "displayName": "Email Marketing"
                }
            ]
        },
        {
            "segmentKey": "deviceType",
            "displayName": "Device Type",
            "values": [
                {
                    "segmentId": "mobile",
                    "displayName": "Mobile"
                },
                {
                    "segmentId": "desktop",
                    "displayName": "Desktop"
                },
                {
                    "segmentId": "tablet",
                    "displayName": "Tablet"
                }
            ]
        }
    ]
};

export {sampleResponse, sampleMetricsData, sampleSegmentsdata}