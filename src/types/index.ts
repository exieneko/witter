export * from './account.js';
export * from './birdwatch.js';
export * from './community.js';
export * from './explore.js';
export * from './list.js';
export * from './notifications.js';
export * from './search.js';
export * from './topic.js';
export * from './tweet.js';
export * from './user.js';

export interface Result {
    result: boolean
}

export interface Entry<T extends { __type: string }> {
    id: string,
    content: T
}



export type CursorDirection = 'top' | 'bottom' | 'show_more' | 'show_spam';
export interface Cursor {
    __type: 'Cursor',
    direction: CursorDirection,
    value: string
}
