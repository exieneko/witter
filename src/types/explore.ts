import type { Cursor } from '.';
import type { UserList } from './user';

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
    grouped_trends: {
        name: string,
        url: string
    }[],
    name: string,
    location?: string,
    topic?: string,
    tweets_count?: number,
    url: string
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
        text: boolean,
        url: string
    }[],
}



export type TimelineExploreItem = TrendEvent | Trend | ExploreStories | UserList | Cursor;
