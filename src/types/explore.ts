import type { Cursor, Tweet, TweetList, UserList } from '.';

export interface TrendEvent {
    __type: 'ExploreTrendEvent',
    id: string,
    image_url: string,
    name: string,
    time: string,
    url: string
}

export interface Trend {
    __type: 'ExploreTrend',
    name: string,
    location?: string,
    topic?: string,
    tweets_count?: number,
    url: string,
    grouped_trends?: {
        name: string,
        url: string
    }[]
}

export interface Segment {
    __type: 'Segment',
    id: string,
    name: string
}



export interface ExploreSports {
    __type: 'ExploreSports',
    items: {
        id: string,
        category: string,
        clock?: string,
        image_url: string,
        start_time: string,
        state?: 'scheduled' | 'in_progress',
        participants: {
            id: string,
            color: `#${string}`,
            logo_url: string,
            name: string,
            name_acronym: string,
            score?: string
        }[],
        url: string
    }[]
}

export interface ExploreStories {
    __type: 'ExploreStories',
    items: {
        ai: boolean,
        highlighted_avatar_urls: string[],
        name: string,
        text: string,
        url: string
    }[],
}

export type TimelineExploreItem = Segment | TrendEvent | Trend | ExploreStories | Tweet | TweetList | UserList | Cursor;

export interface Hashflag {
    hashtag: string,
    start_time: string,
    end_time: string,
    hashfetti: boolean,
    url: string
}
