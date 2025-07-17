import { formatCursor } from '.';
import { formatUser } from './user';

import type { Cursor, Entry, List, ListModule, User } from '../types';
import type { _Cursor, _Entry } from '../types/raw';
import type { _ListItem, _ListModuleItem, _ListsItem } from '../types/raw/items';
import type { _List } from '../types/raw/list';

export const formatList = (input: _List): List => {
    return {
        __type: 'List',
        id: input.id_str,
        author: formatUser(input.user_results.result) as User,
        bannerUrl: input.default_banner_media?.media_info.original_img_url || input.default_banner_media?.media_info.original_img_url,
        createdAt: new Date(input.created_at).toISOString(),
        description: input.description || undefined,
        pinned: !!input.pinning,
        private: input.mode === 'Private',
        subscribed: input.following,
        subscribersCount: input.subscriber_count,
        highlightedAvatarUrls: input.facepile_urls,
        highlightedMemberUsername: undefined, // TODO
        highlightedSubscriberUsername: undefined,
        member: !!input.is_member,
        membersCount: input.member_count,
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
        // @ts-ignore
        ...lists.map(entry => ({
            id: entry.entryId,
            content: {
                __type: 'ListModule',
                items: entry.content.items.map(item => formatList(item.item.itemContent.list))
            }
        })),
        {
            id: cursorEntry.entryId,
            // @ts-ignore
            content: formatCursor(cursorEntry.content)
        }
    ];
};
