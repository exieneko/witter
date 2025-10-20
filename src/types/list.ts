import type { Cursor, User } from './index.js';

export interface List {
    __type: 'List',
    id: string,
    banner_url?: string,
    created_at: string,
    creator: User,
    description: string,
    listed: boolean,
    listed_count: number,
    muted: boolean,
    name: string,
    pinned: boolean,
    public: boolean,
    subscribed: boolean,
    subscribers_count: number
}

export interface UnavailableList {
    __type: 'UnavailableList'
}

export type TimelineList = List | UnavailableList | Cursor;
