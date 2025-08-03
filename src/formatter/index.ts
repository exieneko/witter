import type { Cursor } from '../types/index.js';
import type { _Cursor } from '../types/raw/index.js';

export * from './birdwatch.js';
export * from './community.js';
export * from './explore.js';
export * from './search.js';
export * from './list.js';
export * from './notifications.js';
export * from './tweet.js';
export * from './user.js';

export const formatCursor = (input: _Cursor): Cursor => {
    return {
        __type: 'Cursor',
        direction: input.cursorType === 'Top' ? 'top' : 'bottom',
        value: input.value
    };
};

export const entries = <T>(instructions: { type?: string, entries?: T[] }[]): T[] => {
    const pin = instructions.find(instruction => instruction.type === 'TimelinePinEntry') as { type: 'TimelinePinEntry', entry: T } | undefined;
    const entries = instructions.find(instruction => instruction.type === 'TimelineAddEntries')?.entries || [];

    if (pin) {
        // @ts-ignore
        if (pin.entry.entryId && typeof pin.entry.entryId === 'string') {
            // @ts-ignore
            pin.entry.entryId += '-pin';
        }

        return [pin.entry, ...entries];
    }

    return entries;
};
