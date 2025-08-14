import type { Cursor, Tweet, TweetList, UserList } from './index.js';

export interface TrendEvent {
    __type: 'ExploreTrendEvent',
    id: string,
    imageUrl: string,
    name: string,
    time: string,
    url: string
}

export interface Trend {
    __type: 'ExploreTrend',
    name: string,
    location?: string,
    topic?: string,
    tweetsCount?: number,
    /** @deprecated this is useless and will be removed */
    url: string,
    groupedTrends?: {
        name: string,
        /** @deprecated also useless, so `groupedTrends` might make more sense as a `string[]` */
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
        imageUrl: string,
        startTime: string,
        state?: 'scheduled' | 'in_progress',
        participants: {
            id: string,
            color: `#${string}`,
            logoUrl: string,
            name: string,
            nameAcronym: string,
            score?: string
        }[],
        url: string
    }[]
}

export interface ExploreStories {
    __type: 'ExploreStories',
    items: {
        ai: boolean,
        highlightedAvatarUrls: string[],
        name: string,
        text: string,
        url: string
    }[],
}

export type TimelineExploreItem = Segment | TrendEvent | Trend | ExploreStories | Tweet | TweetList | UserList | Cursor;

export interface Hashflag {
    hashtag: string,
    startTime: string,
    endTime: string,
    hashfetti: boolean,
    url: string
}
