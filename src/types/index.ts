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
    Top,
    Bottom,
    ShowMore,
    ShowMoreThreads
}
