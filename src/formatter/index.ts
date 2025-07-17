import type { Cursor } from '../types';
import type { _Cursor } from '../types/raw';

export * from './birdwatch';
export * from './community';
export * from './explore';
export * from './search';
export * from './list';
export * from './notifications';
export * from './tweet';
export * from './user';

export const formatCursor = (input: _Cursor): Cursor => {
    return {
        __type: 'Cursor',
        direction: input.cursorType === 'Top' ? 'top' : 'bottom',
        value: input.value
    };
};

export const entries = <T>(instructions: { type?: string, entries?: T[] }[]) => {
    return instructions.find(instruction => instruction.type === 'TimelineAddEntries')?.entries || [];
};
