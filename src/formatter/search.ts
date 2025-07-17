import { formatEntry } from './tweet';
import { formatUser, formatUserLegacy } from './user';

import type { Entry, TimelineTweet, Typeahead, UserList } from '../types';
import type { _Entry } from '../types/raw';
import type { _SearchUserModulesItem, _Typeahead } from '../types/raw/search';
import type { _TimelineTweetItem } from '../types/raw/items';

export const formatSearchEntries = (input: _Entry<_TimelineTweetItem | _SearchUserModulesItem>[]): Entry<TimelineTweet | UserList>[] => {
    // @ts-ignore
    return input.map(entry => ({
        id: entry.entryId,
        content: entry.content.__typename === 'TimelineTimelineModule' && entry.content.items.at(0)?.item.itemContent.__typename === 'TimelineUser'
            ? {
                __type: 'UserList',
                items: entry.content.items.map(item => item.item.itemContent.__typename === 'TimelineTweet' ? undefined : formatUser(item.item.itemContent.user_results.result)).filter(x => !!x)
            }
            : formatEntry(entry as _Entry<_TimelineTweetItem>)
    }));
};

export const formatTypeahead = (input: _Typeahead): Typeahead => {
    return {
        resultsCount: input.num_results,
        topics: input.topics.map(({ topic }) => topic),
        users: (input.users || []).map(formatUserLegacy),
        query: input.query
    };
};
