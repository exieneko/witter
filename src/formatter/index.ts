import { Cursor, CursorDirection } from '../types/index.js';

export * from './account.js';
export * from './community.js';
export * from './list.js';
export * from './notifications.js';
export * from './search.js';
export * from './tweet.js';
export * from './user.js';

export function cursor(value: any): Cursor {
    return {
        __type: 'Cursor',
        direction: (() => {
            switch (value.cursorType) {
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

export function getEntries<T>(instructions: Array<{ type?: string, entries?: Array<T> }>): Array<T> {
    const pin = instructions.find(instruction => instruction.type === 'TimelinePinEntry') as { type: 'TimelinePinEntry', entry: T } | undefined;
    const entries = instructions.find(instruction => instruction.type === 'TimelineAddEntries')?.entries || [];

    if (pin) {
        return [pin.entry, ...entries];
    }

    return entries;
}
