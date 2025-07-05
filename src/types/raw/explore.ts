export interface _EventSummary {
    __typename: 'TimelineEventSummary',
    event: {
        rest_id: string
    },
    image: {
        url: string
    },
    timeString: string,
    title: string,
    eventSummaryUrl: {
        url: string
    }
}

export interface _Trend {
    __typename: 'TimelineTrend',
    name: string,
    trend_url: {
        url: string
    },
    trend_metadata: {
        /** topic or location text */
        domain_context: string,
        /** tweet counter */
        meta_description: string,
        url: {
            url: string
        }
    },
    grouped_trends?: {
        name: string,
        url: {
            url: string
        }
    }[]
}

export interface _TrendStory {
    __typename: 'TimelineTrend',
    social_context: {
        type: 'TimelineGeneralContext',
        contextType: string,
        /** subtext */
        text: string,
        contextImageUrls: string[]
    },
    is_ai_trend: boolean,
    name: string,
    trend_url: {
        url: string
    }
}

export interface _SportsTile {
    __typename: 'TimelineTile',
    url: {
        url: string
    },
    image: {
        url: string
    },
    content: {
        contentType: 'TimelineTileContentScoreCard',
        scoreEventSummary: {
            displayTile: 'Tile',
            scoreEvent: {
                id: string,
                category: string,
                startTimeMillis: number,
                eventState: 'Scheduled' | 'InProgress',
                participants: {
                    id: string,
                    fullName: string,
                    shortName: string,
                    color: {
                        red: number,
                        green: number,
                        blue: number
                    },
                    score?: string
                    logo: {
                        url: string
                    }
                }[],
                gameClock?: string,
                gameClockPeriod?: string,
                url: {
                    url: string
                }
            }
        }
    }
}
