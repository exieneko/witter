import { formatCursor, formatMedia, formatTweet } from './index.js';
import { formatUser, formatUserLegacy } from './user.js';

import type { Cursor, Entry, Notification, TimelineTweet, Tweet, TweetTombstone, UnreadNotifications, User } from '../types/index.js';
import type { _Cursor, _Entry, _ShittyAssCursor } from '../types/raw/index.js';
import type { _NotificationItem, _NotificationTweetItem, _NotificationUserEntity, _TweetItem } from '../types/raw/items.js';
import type { _NotificationGlobalObjects, _UnreadCount } from '../types/raw/notifications.js';

const formatNotificationItem = (input: _NotificationItem): Notification => {
    return {
        __type: 'Notification',
        id: input.itemContent.id,
        createdAt: new Date(input.itemContent.timestamp_ms).toISOString(),
        objectId: input.clientEventInfo.element.startsWith('generic_birdwatch')
            ? input.itemContent.notification_url.url.match(/\/n\/(\d+?)\?|$/)?.at(1)
        : (input.clientEventInfo.element === 'generic_magic_rec_pyle_recommended' || input.clientEventInfo.element === 'users_liked_your_tweet' || input.clientEventInfo.element === 'users_liked_your_retweet') && input.itemContent.template.target_objects[0].tweet_results.result.__typename === 'Tweet'
            ? input.itemContent.template.target_objects[0].tweet_results.result.rest_id
            : undefined,
        text: input.clientEventInfo.element.startsWith('generic_birdwatch')
            ? input.itemContent.template.additional_context?.text
        : input.clientEventInfo.element === 'generic_poll_voter_summary'
            ? input.itemContent.rich_message.text.match(/received\s(.+?)\svote/)?.at(1)
            : undefined,
        type: input.clientEventInfo.element === 'device_follow_tweet_notification_entry'
            ? 'tweets_from_following'
        : input.clientEventInfo.element === 'generic_magic_rec_pyle_recommended'
            ? 'tweets_from_recommended'
        : input.clientEventInfo.element === 'generic_poll_voter_summary'
            ? 'poll_finished'
        : input.clientEventInfo.element === 'generic_birdwatch_needs_your_help'
            ? 'birdwatch_note_needs_help'
        : input.clientEventInfo.element === 'generic_birdwatch_helpful_valid_rater'
            ? 'birdwatch_note_rated_as_helpful'
        : input.clientEventInfo.element === 'generic_birdwatch_not_helpful_valid_rater'
            ? 'birdwatch_note_rated_as_not_helpful'
        : input.clientEventInfo.element === 'generic_birdwatch_delete_post_rater'
            ? 'birdwatch_note_rated_post_deleted'
        : input.clientEventInfo.element === 'generic_report_received'
            ? 'report_received'
        : input.clientEventInfo.element === 'generic_login_notification'
            ? 'login_notification'
        : input.clientEventInfo.element === 'generic_subscription_promotion_premium'
            ? 'advertisement'
            : input.clientEventInfo.element,
        tweet: input.itemContent.template.target_objects.at(0)?.__typename === 'TimelineNotificationTweetRef'
            ? formatTweet(input.itemContent.template.target_objects.at(0)!.tweet_results.result) as Tweet
            : undefined,
        users: input.itemContent.template.from_users.length > 0
            ? input.itemContent.template.from_users.map(user => formatUser(user.user_results.result) as User)
            : undefined
        // users: input.itemContent.rich_message.entities
        //     .filter(entity => entity.ref?.type === 'TimelineRichTextUser')
        //     .map(entity => entity.ref as _NotificationUserEntity)
        //     .map(ref => formatUser(ref.user_results.result) as User)
    };
};

export const formatNotificationEntries = (input: _Entry<_NotificationItem | _TweetItem | _Cursor>[]): Entry<Notification | Cursor>[] => {
    return input.map(entry => ({
        id: entry.entryId,
        content: entry.content.__typename === 'TimelineTimelineCursor'
            ? formatCursor(entry.content)
            : entry.content.itemContent.__typename === 'TimelineTweet'
                ? (() => {
                    const tweet = formatTweet(entry.content.itemContent.tweet_results.result) as Tweet;
                    return {
                        __type: 'Notification',
                        id: entry.entryId.match(/-(.*?)$/)?.at(1)! || '',
                        createdAt: tweet.createdAt,
                        objectId: tweet.id,
                        type: 'user_mentioned_you',
                        tweet: tweet,
                        users: [tweet.author]
                    } satisfies Notification;
                })()
                : formatNotificationItem(entry.content as _NotificationItem)
    }));
};

export const formatNotificationTweetEntries = (input: _Entry<_NotificationTweetItem | _ShittyAssCursor>[], globalObjects: _NotificationGlobalObjects): Entry<TimelineTweet>[] => {
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
            hasBirdwatchNote: false,
            hasGrokChatEmbed: false,
            hasHiddenReplies: false,
            hasQuotedTweet: tweet.is_quote_status,
            lang: tweet.lang,
            likesCount: tweet.favorite_count,
            liked: tweet.favorited,
            media: tweet.entities.media?.map(formatMedia) || [],
            muted: false,
            pinned: false,
            platform: />Twitter Web App</.test(tweet.source || '') ? 'Web app' : tweet.source?.match(/>Twitter\sfor\s(.*?)</)?.at(1),
            quoteTweetsCount: tweet.quote_count,
            quotedTweet: quotedTweet && quotedTweetAuthor ? getFromId(quotedTweet.id_str) as Tweet : undefined,
            repliesCount: tweet.reply_count,
            replyingTo: tweet.in_reply_to_status_id_str ? {
                tweetId: tweet.in_reply_to_status_id_str,
                username: tweet.in_reply_to_screen_name
            } : undefined,
            retweetsCount: tweet.retweet_count,
            retweeted: tweet.retweeted,
            text: !!tweet.entities.media?.length
                ? tweet.full_text.replace(/\bhttps:\/\/t\.co\/[a-zA-Z0-9]+/, sub => tweet.entities.urls.find(x => x.url === sub)?.expanded_url || sub).replace(/https:\/\/t\.co\/.+$/, '').trimEnd()
                : tweet.full_text.replace(/\bhttps:\/\/t\.co\/[a-zA-Z0-9]+/, sub => tweet.entities.urls.find(x => x.url === sub)?.expanded_url || sub),
            textHighlights: [],
            translatable: false,
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

        const tweetId = (entry.content as unknown as _NotificationTweetItem).item.content.tweet.id;

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
