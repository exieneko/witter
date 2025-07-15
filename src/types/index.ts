export * from './account';
export * from './birdwatch';
export * from './community';
export * from './explore';
export * from './list';
export * from './notifications';
export * from './search';
export * from './topic';
export * from './tweet';
export * from './user';

export interface Result {
    result: boolean
}

export interface Entry<T extends { __type: string }> {
    id: string,
    content: T
}



export type CursorDirection = 'top' | 'bottom';
export interface Cursor {
    __type: 'Cursor',
    direction: CursorDirection,
    value: string
}

export interface ShowMoreCursor {
    __type: 'ShowMoreCursor',
    direction: CursorDirection | 'show_more',
    value: string
}
