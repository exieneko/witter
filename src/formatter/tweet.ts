import { formatCursor } from '.';
import { formatCommunity } from './community';
import { formatUser } from './user';

import type { Entry, Retweet, TimelineTweet, Tweet, TweetTombstone, User } from '../types';
import type { _Cursor, _Entry } from '../types/raw';
import type { _TimelineTweetItem, _TweetConversationItem } from '../types/raw/items';
import type { _Tweet, _TweetTombstone, _VisibilityLimitedTweet } from '../types/raw/tweet';

export const formatTweet = (input: _Tweet | _VisibilityLimitedTweet | _TweetTombstone, hasHiddenReplies?: boolean, highlights?: [number, number][]): Tweet | Retweet | TweetTombstone => {
    const tweet = input.__typename === 'TweetWithVisibilityResults' ? input.tweet : input;
    const limitations = input.__typename === 'TweetWithVisibilityResults' ? {
        actions: input.limitedActionResults?.limited_actions,
        blurImages: !!input.mediaVisibilityResults?.blurred_image_interstitial.text.text,
        warningText: input.softInterventionPivot?.text.text,
        limitedText: input.tweetInterstitial?.text
    } : undefined

    if (tweet.__typename === 'TweetTombstone') {
        return {
            __type: 'TweetTombstone',
            text: tweet.tombstone.text.text
        };
    }

    if (tweet.legacy.retweeted_status_result?.result) {
        return {
            __type: 'Retweet',
            id: tweet.rest_id,
            retweeter: formatUser(tweet.core.user_results.result) as User,
            retweeted_tweet: formatTweet(tweet.legacy.retweeted_status_result.result) as Tweet
        }
    }

    return {
        __type: 'Tweet',
        id: tweet.rest_id,
        author: formatUser(tweet.core.user_results.result) as User,
        birdwatch_note: tweet.has_birdwatch_notes && tweet.birdwatch_pivot ? {
            id: tweet.birdwatch_pivot.note.rest_id,
            text: tweet.birdwatch_pivot.subtitle.text,
            public: tweet.birdwatch_pivot.visualStyle === 'Default',
            url: tweet.birdwatch_pivot.destinationUrl
        } : undefined,
        bookmarks_count: tweet.legacy.bookmark_count,
        bookmarked: tweet.legacy.bookmarked,
        // TODO card data
        community: tweet.author_community_relationship?.community_results.result ? formatCommunity(tweet.author_community_relationship.community_results.result) : undefined,
        created_at: new Date(tweet.legacy.created_at).toISOString(),
        editing: tweet.edit_control && tweet.edit_control.editable_until_msec ? {
            allowed_until: tweet.edit_control.editable_until_msec.toString(),
            eligible: tweet.edit_control.is_edit_eligible,
            remaining_count: Number(tweet.edit_control.edits_remaining),
            tweet_ids: tweet.edit_control.edit_tweet_ids
        } : undefined,
        expandable: tweet.note_tweet?.is_expandable || false,
        has_grok_chat_embed: !!tweet.grok_share_attachment,
        has_hidden_replies: hasHiddenReplies || false,
        lang: tweet.legacy.lang,
        likes_count: tweet.legacy.favorite_count,
        liked: tweet.legacy.favorited,
        limited: limitations ? {
            actions: limitations.actions?.map(({ action }) => action),
            type: tweet.core.user_results.result.legacy.blocked_by ? 'blocked_by_author' : limitations.limitedText ? 'severe_hate_limited' : 'hate_limited'
        } : undefined,
        media: tweet.legacy.entities.media?.map(media => (media.type === 'video' ? {
            __type: 'MediaVideo',
            id: media.id_str,
            url: media.media_url_https,
            video: {
                aspect_ratio: media.video_info!.aspect_ratio,
                variants: media.video_info!.variants
            }
        } : {
            __type: 'MediaPhoto',
            id: media.id_str,
            url: media.media_url_https
        }) satisfies NonNullable<Tweet['media']>[number]),
        muted: false,
        platform: tweet.source.match(/>Twitter\sfor\s(.*?)</)?.at(1),
        quote_tweets_count: tweet.legacy.quote_count,
        quoted_tweet: tweet.quoted_status_result?.result && tweet.quoted_status_result.result.__typename !== 'TweetTombstone' ? formatTweet(
            tweet.quoted_status_result.result.__typename === 'TweetWithVisibilityResults' ? tweet.quoted_status_result.result.tweet : tweet.quoted_status_result!.result
        ) as Tweet : undefined,
        quoted_tweet_fallback: tweet.legacy.quoted_status_id_str ? {
            has_quoted_tweet: tweet.legacy.is_quote_status,
            tweet_id: tweet.legacy.quoted_status_id_str
        } : undefined,
        replies_count: tweet.legacy.reply_count,
        replying_to: tweet.legacy.in_reply_to_status_id_str ? {
            tweet_id: tweet.legacy.in_reply_to_status_id_str,
            username: tweet.legacy.in_reply_to_screen_name
        } : undefined,
        retweets_count: tweet.legacy.retweet_count,
        retweeted: tweet.legacy.retweeted,
        text: tweet.note_tweet?.note_tweet_results.result.text || tweet.legacy.full_text || '',
        text_highlights: highlights || [],
        translatable: tweet.is_translatable,
        urls: tweet.legacy.entities.urls.map(url => ({
            url: url.url,
            display_url: url.display_url,
            expanded_url: url.expanded_url
        })),
        views_count: tweet.views.count ? Number(tweet.views.count) : undefined
    };
};

export const formatEntry = (input: _Entry<_TimelineTweetItem>): Entry<TimelineTweet> | undefined => {
    if (input.content.__typename === 'TimelineTimelineCursor') {
        return {
            id: input.entryId,
            content: {
                __type: 'Cursor',
                direction: input.content.cursorType === 'Top' ? 'top' : 'bottom',
                value: input.content.value
            }
        };
    }

    if (input.content.__typename === 'TimelineTimelineItem') {
        return {
            id: input.entryId,
            content: formatTweet(input.content.itemContent.tweet_results.result, input.content.itemContent.hasModeratedReplies, input.content.itemContent.highlights?.textHighlights.map(x => [x.startIndex, x.endIndex]))
        };
    }

    if (input.content.__typename === 'TimelineTimelineModule' && input.entryId.includes('conversation')) {
        return {
            id: input.entryId,
            content: {
                __type: 'Conversation',
                // @ts-ignore
                items: input.content.items.map(item => formatTweet(item.item.itemContent.tweet_results.result, item.item.itemContent.hasModeratedReplies, item.item.itemContent.highlights?.textHighlights.map(x => [x.startIndex, x.endIndex])))
            }
        };
    }
};

export const formatEntries = (input: _Entry<_TimelineTweetItem>[]): Entry<TimelineTweet>[] => {
    return input.map(formatEntry).filter(x => !!x);
};

export const formatMediaEntries = (input: _Entry<_TweetConversationItem | _Cursor>[]): Entry<TimelineTweet>[] => {
    const grid = input.find(entry => entry.content.__typename === 'TimelineTimelineModule')?.content as _TweetConversationItem | undefined;

    return [
        ...input.filter(entry => entry.content.__typename === 'TimelineTimelineCursor').map(entry => ({
            id: entry.entryId,
            // @ts-ignore
            content: formatCursor(entry.content)
        })),
        ...(grid ? grid.items.map(item => ({
            id: item.entryId,
            content: formatTweet(item.item.itemContent.tweet_results.result, item.item.itemContent.hasModeratedReplies, item.item.itemContent.highlights?.textHighlights.map(x => [x.startIndex, x.endIndex]))
        })) : [])
    ];
};
