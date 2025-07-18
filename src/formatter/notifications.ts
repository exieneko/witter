import { formatCursor, formatMedia } from '.';
import { formatUser, formatUserLegacy, normalizeUserV3 } from './user';

import type { Cursor, Entry, Notification, Tweet, UnreadNotifications, User } from '../types';
import type { _Cursor, _Entry, _ShittyAssCursor } from '../types/raw';
import type { _NotificationItem, _NotificationTweetItem, _NotificationUserEntity } from '../types/raw/items';
import type { _NotificationGlobalObjects, _UnreadCount } from '../types/raw/notifications';

const formatNotificationItem = (input: _NotificationItem): Notification => {
    return {
        __type: 'Notification',
        id: input.itemContent.id,
        createdAt: new Date(input.itemContent.timestamp_ms).toISOString(),
        text: input.itemContent.rich_message.text,
        type: input.clientEventInfo.element === 'device_follow_tweet_notification_entry'
            ? 'tweets_from_following'
        : input.clientEventInfo.element === 'generic_report_received'
            ? 'report_received'
        : input.clientEventInfo.element === 'generic_login_notification'
            ? 'login_notification'
        : input.clientEventInfo.element === 'generic_birdwatch_helpful_valid_rater'
            ? 'birdwatch_note_rated_as_helpful'
        : input.clientEventInfo.element === 'generic_birdwatch_not_helpful_valid_rater'
            ? 'birdwatch_note_rated_as_not_helpful'
        : input.clientEventInfo.element,
        users: input.itemContent.rich_message.entities
            .filter(entity => entity.ref.type === 'TimelineRichTextUser')
            .map(entity => entity.ref as _NotificationUserEntity)
            .map(ref => formatUser(normalizeUserV3(ref.user_results.result)) as User)
    };
};

export const formatNotificationEntries = (input: _Entry<_NotificationItem | _Cursor>[]): Entry<Notification | Cursor>[] => {
    return input.map(entry => ({
        id: entry.entryId,
        content: entry.content.__typename === 'TimelineTimelineCursor'
            ? formatCursor(entry.content)
            : formatNotificationItem(entry.content)
    }));
};

export const formatNotificationTweetEntries = (input: _Entry<_NotificationTweetItem | _ShittyAssCursor>[], globalObjects: _NotificationGlobalObjects): Entry<Tweet | Cursor>[] => {
    const getFromId = (id: string): Tweet => {
        const tweet = globalObjects.tweets[id];
        const author = globalObjects.users[tweet.user_id_str];
        const quotedTweet = tweet.quoted_status_id_str ? globalObjects.tweets[tweet.quoted_status_id_str] : undefined;
        const quotedTweetAuthor = quotedTweet ? globalObjects.users[quotedTweet.user_id_str] : undefined;

        return {
            __type: 'Tweet',
            id: tweet.id_str,
            author: formatUserLegacy(author),
            bookmarksCount: tweet.bookmark_count,
            bookmarked: tweet.bookmarked,
            createdAt: new Date(tweet.created_at).toISOString(),
            expandable: false,
            hasGrokChatEmbed: false,
            hasHiddenReplies: false,
            hasQuotedTweet: tweet.is_quote_status,
            lang: tweet.lang,
            likesCount: tweet.favorite_count,
            liked: tweet.favorited,
            media: tweet.entities.media?.map(formatMedia) || [],
            muted: false,
            // @ts-ignore
            platform: tweet.source?.match(/>Twitter\sfor\s(.*?)</)?.at(1),
            quoteTweetsCount: tweet.quote_count,
            quotedTweet: quotedTweet && quotedTweetAuthor ? getFromId(quotedTweet.id_str) as Tweet : undefined,
            quotedTweetFallback: tweet.quoted_status_id_str ? {
                hasQuotedTweet: tweet.is_quote_status,
                tweetId: tweet.quoted_status_id_str
            } : undefined,
            repliesCount: tweet.reply_count,
            replyingTo: tweet.in_reply_to_status_id_str ? {
                tweetId: tweet.in_reply_to_status_id_str,
                username: tweet.in_reply_to_screen_name
            } : undefined,
            retweetsCount: tweet.retweet_count,
            retweeted: tweet.retweeted,
            text: tweet.full_text || '',
            textHighlights: [],
            translatable: false,
            urls: tweet.entities.urls.map(url => ({
                url: url.url,
                displayUrl: url.display_url,
                expandedUrl: url.expanded_url
            })),
            userMentions: tweet.entities.user_mentions?.map(mention => ({
                id: mention.id_str,
                name: mention.name,
                username: mention.screen_name
            })) || [],
        };
    };

    return input.map(entry => {
        if (Object.hasOwn(entry.content, 'operation')) {
            const cursor = (entry.content as unknown as _ShittyAssCursor).operation.cursor;

            return {
                id: entry.entryId,
                content: {
                    __type: 'Cursor',
                    direction: cursor.cursorType === 'Top' ? 'top' : 'bottom',
                    value: cursor.value
                }
            } satisfies Entry<Cursor>
        }

        const tweetId = (entry as unknown as _NotificationTweetItem['item']).content.tweet.id;

        return {
            id: entry.entryId,
            content: getFromId(tweetId)
        } satisfies Entry<Tweet>;
    });
};



export const formatUnread = (input: _UnreadCount): UnreadNotifications => {
    return {
        notifications: input.ntab_unread_count,
        inbox: input.dm_unread_count
    };
};
