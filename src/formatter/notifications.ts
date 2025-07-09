import { formatCursor } from '.';
import { formatUser, formatUserLegacy, normalizeUserV3 } from './user';

import { Cursor, Entry } from '../types';
import { Notification, UnreadNotifications } from '../types/notifications';
import { Tweet } from '../types/tweet';
import { _Cursor, _Entry, _ShittyAssCursor } from '../types/raw';
import { _NotificationItem, _NotificationTweetItem, _NotificationUserEntity } from '../types/raw/items';
import { _NotificationGlobalObjects, _UnreadCount } from '../types/raw/notifications';

const formatNotificationItem = (input: _NotificationItem): Notification => {
    return {
        __type: 'Notification',
        id: input.itemContent.id,
        created_at: new Date(input.itemContent.timestamp_ms).toISOString(),
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
            .map(ref => formatUser(normalizeUserV3(ref.user_results.result)))
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
            bookmarks_count: tweet.bookmark_count,
            bookmarked: tweet.bookmarked,
            created_at: new Date(tweet.created_at).toISOString(),
            expandable: false,
            has_grok_chat_embed: false,
            has_hidden_replies: false,
            lang: tweet.lang,
            likes_count: tweet.favorite_count,
            liked: tweet.favorited,
            media: tweet.entities.media?.map(media => (media.type === 'video' ? {
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
            // @ts-ignore
            platform: tweet.source?.match(/>Twitter\sfor\s(.*)</)?.at(0),
            quote_tweets_count: tweet.quote_count,
            quoted_tweet: quotedTweet && quotedTweetAuthor ? getFromId(quotedTweet.id_str) as Tweet : undefined,
            quoted_tweet_fallback: tweet.quoted_status_id_str ? {
                has_quoted_tweet: tweet.is_quote_status,
                tweet_id: tweet.quoted_status_id_str
            } : undefined,
            replies_count: tweet.reply_count,
            replying_to: tweet.in_reply_to_status_id_str ? {
                tweet_id: tweet.in_reply_to_status_id_str,
                username: tweet.in_reply_to_screen_name
            } : undefined,
            retweets_count: tweet.retweet_count,
            retweeted: tweet.retweeted,
            text: tweet.full_text || '',
            text_highlights: [],
            translatable: false,
            urls: tweet.entities.urls.map(url => ({
                url: url.url,
                display_url: url.display_url,
                expanded_url: url.expanded_url
            }))
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
