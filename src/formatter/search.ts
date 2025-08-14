import { formatEntry } from './tweet.js';
import { formatUser } from './user.js';

import type { Entry, TimelineTweet, Typeahead, UserList } from '../types/index.js';
import type { _Entry } from '../types/raw/index.js';
import type { _SearchUserModulesItem, _Typeahead } from '../types/raw/search.js';
import type { _TimelineTweetItem } from '../types/raw/items.js';

export const formatSearchEntries = (input: _Entry<_TimelineTweetItem | _SearchUserModulesItem>[]): Entry<TimelineTweet | UserList>[] => {
    // @ts-ignore
    // return input.map(entry => ({
    //     id: entry.entryId,
    //     content: entry.content.__typename === 'TimelineTimelineModule' && entry.content.items.at(0)?.item.itemContent.__typename === 'TimelineUser'
    //         ? {
    //             __type: 'UserList',
    //             // @ts-ignore
    //             items: entry.content.items.map(item => item.item.itemContent.__typename === 'TimelineTweet' ? undefined : formatUser(item.item.itemContent.user_results.result)).filter(x => !!x)
    //         }
    //         : formatEntry(entry as _Entry<_TimelineTweetItem>)
    // }));
    return input.map(entry => entry.content.__typename === 'TimelineTimelineModule' && entry.content.items.at(0)?.item.itemContent.__typename === 'TimelineUser'
        ? {
            id: entry.entryId,
            content: {
                __type: 'UserList',
                // @ts-ignore
                items: entry.content.items.map(item => item.item.itemContent.__typename === 'TimelineTweet' ? undefined : formatUser(item.item.itemContent.user_results.result)).filter(x => !!x)
            }
        }
        : formatEntry(entry as _Entry<_TimelineTweetItem>)
    );
};

export const formatTypeahead = (input: _Typeahead): Typeahead => {
    return {
        resultsCount: input.num_results,
        topics: input.topics.map(({ topic }) => topic),
        users: (input.users || []).map(user => user.id_str),
        query: input.query
    };
};
