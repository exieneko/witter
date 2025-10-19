export * from './tweet.js';
export * from './user.js';

export interface Entry<T> {
    id: string,
    content: T
}

export interface Cursor {
    __type: 'Cursor',
    direction: CursorDirection,
    value: string
}

export enum CursorDirection {
    Top = 'Top',
    Bottom = 'Bottom',
    ShowMore = 'ShowMore',
    ShowMoreThreads = 'ShowMoreThreads'
}



export interface ByUsername {
    byUsername?: boolean
}

export interface CursorOnly {
    cursor?: string
}

export interface TweetArgs extends CursorOnly {
    sort?: TweetSort
}

export enum TweetSort {
    Relevant = 'Relevant',
    Recent = 'Recent',
    Likes = 'Likes'
}

export enum TweetReplyPermission {
    Following = 'Following',
    Verified = 'Verified',
    Mentioned = 'Mentioned',
    None = 'None'
}
