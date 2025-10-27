export * from './community.js';
export * from './list.js';
export * from './notifications.js';
export * from './search.js';
export * from './tweet.js';
export * from './user.js';

/**
 * Represents any timeline entry
 */
export interface Entry<T> {
    id: string,
    content: T
}

/**
 * Represents a timeline cursor\
 * The direction shows where the timeline continues from
 */
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

export interface CommunityTimelineGetArgs {
    sort?: 'relevant' | 'recent'
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
    type: 'all' | 'verified' | 'mentions'
}

export interface SearchArgs extends CursorOnly {
    type?: 'algorithmical' | 'chronological' | 'media' | 'users' | 'lists'
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

export type TweetReplyPermission = 'following' | 'verified' | 'mentioned' | 'none';

export interface TweetGetArgs extends CursorOnly {
    sort?: 'relevant' | 'recent' | 'likes'
}
