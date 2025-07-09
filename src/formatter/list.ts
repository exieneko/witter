import { formatCursor } from '.';
import { formatUser } from './user';

import { Cursor, Entry } from '../types';
import { List, ListModule } from '../types/list';
import { _Cursor, _Entry } from '../types/raw';
import { _ListItem, _ListModuleItem, _ListsItem } from '../types/raw/items';
import { _List } from '../types/raw/list';

export const formatList = (input: _List): List => {
    return {
        __type: 'List',
        id: input.id_str,
        author: formatUser(input.user_results.result),
        banner_url: input.default_banner_media?.media_info.original_img_url || input.default_banner_media?.media_info.original_img_url,
        created_at: new Date(input.created_at).toISOString(),
        description: input.description || undefined,
        pinned: !!input.pinning,
        private: input.mode === 'Private',
        subscribed: input.following,
        subscribers_count: input.subscriber_count,
        highlighted_avatar_urls: input.facepile_urls,
        highlighted_member_username: undefined, // TODO
        highlighted_subscriber_username: undefined,
        member: !!input.is_member,
        members_count: input.member_count,
        muted: !!input.muting,
        name: input.name
    };
};

export const formatListEntries = (input: _Entry<_ListItem | _Cursor>[]): Entry<List | Cursor>[] => {
    return input.map(entry => ({
        id: entry.entryId,
        content: entry.content.__typename === 'TimelineTimelineCursor'
            ? formatCursor(entry.content)
            : formatList(entry.content.itemContent.list)
    }));
};

export const formatListModuleEntries = (input: _Entry<_ListsItem>[]): Entry<ListModule | Cursor>[] => {
    const cursorEntry = input.find(entry => entry.content.__typename === 'TimelineTimelineCursor')! as _Entry<_Cursor>;
    const lists = input.filter(entry => entry.content.__typename === 'TimelineTimelineModule') as _Entry<_ListModuleItem>[];

    return [
        ...lists.map(entry => ({
            id: entry.entryId,
            content: {
                __type: 'ListModule',
                items: entry.content.items.map(item => formatList(item.item.itemContent.list))
            } as const
        })),
        {
            id: cursorEntry.entryId,
            content: formatCursor(cursorEntry.content)
        }
    ];
};
