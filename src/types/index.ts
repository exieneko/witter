export * from './community.js';
export * from './list.js';
export * from './notifications.js';
export * from './search.js';
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

export interface ListBySlug {
    bySlug?: boolean
}

export interface ListCreateArgs {
    name: string,
    description?: string,
    private?: boolean
}

export interface NotificationGetArgs extends CursorOnly {
    type: NotificationTimelineType
}

export enum NotificationTimelineType {
    All = 'All',
    Verified = 'Verified',
    Mentions = 'Mentions'
}

export interface SearchArgs extends CursorOnly {
    type?: SearchType
}

export enum SearchType {
    Algorithmical = 'Algorithmical',
    Chronological = 'Chronological',
    Media = 'Media',
    Users = 'Users',
    Lists = 'Lists'
}

export interface TimelineGetArgs extends CursorOnly {
    seenTweetIds?: Array<string>
}

export interface TweetCreateArgs {
    text: string,
    mediaIds?: Array<string>,
    sensitive?: boolean,
    replyPermission?: TweetReplyPermission
}

export interface TweetGetArgs extends CursorOnly {
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
