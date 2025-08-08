import { formatTrend, formatTweet } from './index.js';

import type { Entry, TimelineTweet, Trend } from '../types/index.js';
import type { _Entry } from '../types/raw/index.js';
import type { _ExploreTrendItem, _TweetConversationItem } from '../types/raw/items.js';
import type { _Tweet } from '../types/raw/tweet.js';

export const formatGenericTimeline = <T extends { __typename: string }, U extends { __type: string }>(input: _Entry<T>[], type: 'birdwatch' | 'trends'): Entry<U>[] => {
    if (type === 'birdwatch') {
        // @ts-ignore
        return formatGenericTimelineAsBirdwatch(input);
    }

    // @ts-ignore
    return formatGenericTimelineAsTrends(input);
};

const formatGenericTimelineAsBirdwatch = (input: _Entry<_TweetConversationItem>[]): Entry<TimelineTweet>[] => {
    // @ts-ignore
    return input.map(entry => entry.content.__typename === 'TimelineTimelineModule' && !!(entry.content.items || []).at(0)?.item.itemContent.tweet_results.result ? {
        id: entry.entryId,
        // @ts-ignore
        content: formatTweet(entry.content.items.at(0)?.item.itemContent.tweet_results.result as _Tweet)
    } : null).filter(x => !!x);
};

const formatGenericTimelineAsTrends = (input: _Entry<_ExploreTrendItem<'Item'>>[]): Entry<Trend>[] => {
    return input.map(entry => entry.content.itemContent.__typename === 'TimelineTrend' ? {
        id: entry.entryId,
        content: formatTrend(entry.content.itemContent)
    } : null).filter(x => !!x);
};
