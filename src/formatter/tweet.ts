import { formatCursor } from '.';
import { formatCommunity } from './community';
import { formatUser } from './user';

import type { Entry, Retweet, TimelineTweet, Tweet, TweetCard, TweetTombstone, User } from '../types';
import type { _Cursor, _Entry } from '../types/raw';
import type { _TimelineTweetItem, _TweetConversationItem } from '../types/raw/items';
import type { _Card, _Tweet, _TweetTombstone, _VisibilityLimitedTweet } from '../types/raw/tweet';

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
            retweetedTweet: formatTweet(tweet.legacy.retweeted_status_result.result) as Tweet
        }
    }

    return {
        __type: 'Tweet',
        id: tweet.rest_id,
        author: formatUser(tweet.core.user_results.result) as User,
        birdwatchNote: tweet.has_birdwatch_notes && tweet.birdwatch_pivot ? {
            id: tweet.birdwatch_pivot.note.rest_id,
            text: tweet.birdwatch_pivot.subtitle.text,
            public: tweet.birdwatch_pivot.visualStyle === 'Default',
            url: tweet.birdwatch_pivot.destinationUrl
        } : undefined,
        bookmarksCount: tweet.legacy.bookmark_count,
        bookmarked: tweet.legacy.bookmarked,
        card: tweet.card ? formatCard(tweet.card?.legacy) : undefined,
        community: tweet.author_community_relationship?.community_results.result ? formatCommunity(tweet.author_community_relationship.community_results.result) : undefined,
        createdAt: new Date(tweet.legacy.created_at).toISOString(),
        editing: tweet.edit_control && tweet.edit_control.editable_until_msec ? {
            allowedUntil: tweet.edit_control.editable_until_msec.toString(),
            eligible: tweet.edit_control.is_edit_eligible,
            remainingCount: Number(tweet.edit_control.edits_remaining),
            tweetIds: tweet.edit_control.edit_tweet_ids
        } : undefined,
        expandable: tweet.note_tweet?.is_expandable || false,
        hasGrokChatEmbed: !!tweet.grok_share_attachment,
        hasHiddenReplies: hasHiddenReplies || false,
        lang: tweet.legacy.lang,
        likesCount: tweet.legacy.favorite_count,
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
                aspectRatio: media.video_info!.aspect_ratio,
                variants: media.video_info!.variants.map(variant => ({
                    bitrate: variant.bitrate,
                    contentType: variant.content_type,
                    url: variant.url
                }))
            }
        } : {
            __type: 'MediaPhoto',
            id: media.id_str,
            url: media.media_url_https
        }) satisfies NonNullable<Tweet['media']>[number]),
        muted: false,
        platform: tweet.source.match(/>Twitter\sfor\s(.*?)</)?.at(1),
        quoteTweetsCount: tweet.legacy.quote_count,
        quotedTweet: tweet.quoted_status_result?.result && tweet.quoted_status_result.result.__typename !== 'TweetTombstone' ? formatTweet(
            tweet.quoted_status_result.result.__typename === 'TweetWithVisibilityResults' ? tweet.quoted_status_result.result.tweet : tweet.quoted_status_result!.result
        ) as Tweet : undefined,
        quotedTweetFallback: tweet.legacy.quoted_status_id_str ? {
            hasQuotedTweet: tweet.legacy.is_quote_status,
            tweetId: tweet.legacy.quoted_status_id_str
        } : undefined,
        repliesCount: tweet.legacy.reply_count,
        replyingTo: tweet.legacy.in_reply_to_status_id_str ? {
            tweetId: tweet.legacy.in_reply_to_status_id_str,
            username: tweet.legacy.in_reply_to_screen_name
        } : undefined,
        retweetsCount: tweet.legacy.retweet_count,
        retweeted: tweet.legacy.retweeted,
        text: tweet.note_tweet?.note_tweet_results.result.text || tweet.legacy.full_text || '',
        textHighlights: highlights || [],
        translatable: tweet.is_translatable,
        urls: tweet.legacy.entities.urls.map(url => ({
            url: url.url,
            displayUrl: url.display_url,
            expandedUrl: url.expanded_url
        })),
        viewsCount: tweet.views.count ? Number(tweet.views.count) : undefined
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



export const formatCard = (input: _Card['legacy']): TweetCard => {
    const getValue = <T extends 'STRING' | 'BOOLEAN'>(key: string, type: T): (T extends 'STRING' ? string : boolean) | undefined => {
        const v = input.binding_values.find(bv => bv.key === key)?.value;
        // @ts-ignore
        return type === 'STRING' ? v?.type === 'STRING' ? v.string_value : undefined : v?.type === 'BOOLEAN' ? v.boolean_value : undefined;
    };

    return {
        id: input.url,
        audiospace: input.name.includes('space') ? {
            id: getValue('id', 'STRING')!,
            cardUrl: getValue('card_url', 'STRING')!,
            narrowCastSpaceType: getValue('narrow_cast_space_type', 'STRING')!
        } : undefined,
        poll: input.name.includes('poll') ? {
            cardUrl: getValue('card_url', 'STRING')!,
            duration: Number(getValue('duration_minutes', 'STRING')) * 60 * 1000,
            endsAt: getValue('end_datetime_utc', 'STRING')!,
            ended: !!getValue('counts_are_final', 'BOOLEAN'),
            options: [
                {
                    label: getValue('choice1_label', 'STRING')!,
                    count: Number(getValue('choice1_count', 'STRING')),
                },
                {
                    label: getValue('choice2_label', 'STRING')!,
                    count: Number(getValue('choice2_count', 'STRING')),
                },
                {
                    label: getValue('choice3_label', 'STRING')!,
                    count: Number(getValue('choice3_count', 'STRING')),
                },
                {
                    label: getValue('choice4_label', 'STRING')!,
                    count: Number(getValue('choice4_count', 'STRING')),
                }
            ]
        } : undefined,
        embed: input.name.includes('summary') ? {
            title: getValue('title', 'STRING')!,
            description: getValue('description', 'STRING'),
            domain: getValue('domain', 'STRING')!,
            imageUrl: getValue('thumbnail_image_original', 'STRING') ?? getValue('photo_image_full_size_original', 'STRING'),
            users: (input.user_refs_results || []).map(x => formatUser(x.user_results.result) as User)
        } : undefined
    };
};
