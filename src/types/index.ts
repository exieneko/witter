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
