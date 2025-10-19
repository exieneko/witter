import { Cursor, CursorDirection } from '../types/index.js';

export * from './tweet.js';
export * from './user.js';

export function cursor(value: any): Cursor {
    return {
        __type: 'Cursor',
        direction: (() => {
            switch (value.direction) {
                case 'Top':
                    return CursorDirection.Top;
                case 'ShowMore':
                    return CursorDirection.ShowMore;
                case 'ShowMoreThreads':
                    return CursorDirection.ShowMoreThreads;
                default:
                    return CursorDirection.Bottom;
            }
        })(),
        value: value.value
    };
}
