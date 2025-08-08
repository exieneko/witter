import type { _TimelineTweetItem } from './items.js';

export interface _Entry<T extends { __typename: string }> {
    entryId: string,
    sortIndex: string,
    content: T
}

export type Instructions<T extends { __typename: string } = _TimelineTweetItem, Pin extends 'pin' | undefined = undefined> = [Pin extends 'pin'
    ? {
        type: 'TimelineAddEntries',
        entries: _Entry<T>[]
    } | {
        type: 'TimelinePinEntry',
        entry: _Entry<T>
    }
    : {
        type: 'TimelineAddEntries',
        entries: _Entry<T>[]
    }];

export type _CursorDirection = 'Top' | 'Bottom' | 'ShowMore';
export interface _Cursor {
    __typename: 'TimelineTimelineCursor',
    cursorType: _CursorDirection,
    value: string
}

/**
 * this stupid bullshit is the bane of my existance it's literally only used in one place and it was put there specifically to piss people off\
 * i wish harm on whoever was responsible for making this
 */
export interface _ShittyAssCursor {
    __typename: 'undefined',
    operation: {
        cursor: {
            cursorType: _CursorDirection,
            value: string
        }
    }
}

export interface _GenericGetUserCursors {
    next_cursor: number,
    next_cursor_str: string,
    previous_cursor: number,
    previous_cursor_str: string,
    total_count: number | null
}

export interface SegmentedTimelines<T extends { __typename: string } = _TimelineTweetItem> {
    __typename: 'SegmentedTimelines',
    timelines: {
        id: string,
        timeline: {
            id: string
        }
    }[],
    initialTimeline: {
        id: string,
        timeline: {
            timeline: {
                instructions: Instructions<T>
            }
        }
    }
}

export interface _Url {
    display_url: string,
    extended_url: string,
    url: string,
    indices: [number, number]
}
