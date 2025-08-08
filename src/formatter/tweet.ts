import { formatCursor } from './index.js';
import { formatCommunity } from './community.js';
import { formatUser } from './user.js';

import type { Entry, Retweet, TimelineTweet, Tweet, TweetCard, TweetMedia, TweetTombstone, User } from '../types/index.js';
import type { _Cursor, _Entry } from '../types/raw/index.js';
import type { _TimelineTweetItem, _TweetConversationItem } from '../types/raw/items.js';
import type { _Card, _Tweet, _TweetMedia, _TweetTombstone, _TweetUnavailable, _VisibilityLimitedTweet } from '../types/raw/tweet.js';

export const formatTweet = (input: _Tweet | _VisibilityLimitedTweet | _TweetTombstone | _TweetUnavailable, options?: { hasHiddenReplies?: boolean, highlights?: [number, number][], pinned?: boolean }): Tweet | Retweet | TweetTombstone => {
    const tweet = input.__typename === 'TweetWithVisibilityResults' ? input.tweet : input;
    const limitations = input.__typename === 'TweetWithVisibilityResults' ? {
        actions: input.limitedActionResults?.limited_actions,
        blurImages: !!input.mediaVisibilityResults?.blurred_image_interstitial.text.text,
        warningText: input.softInterventionPivot?.text.text,
        limitedText: input.tweetInterstitial?.text
    } : undefined;

    if (tweet.__typename === 'TweetUnavailable') {
        return {
            __type: 'TweetTombstone'
        }
    }

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
        birdwatchNote: tweet.birdwatch_pivot?.note?.rest_id ? {
            id: tweet.birdwatch_pivot.note.rest_id,
            text: tweet.birdwatch_pivot.subtitle.text,
            language: tweet.birdwatch_pivot.note.language || 'zxx',
            translatable: !!tweet.birdwatch_pivot.note.is_community_note_translatable,
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
        expandable: !!tweet.note_tweet?.is_expandable,
        hasBirdwatchNote: !!tweet.has_birdwatch_notes,
        hasGrokChatEmbed: !!tweet.grok_share_attachment,
        hasHiddenReplies: !!options?.hasHiddenReplies,
        hasQuotedTweet: !!tweet.legacy.is_quote_status,
        lang: tweet.legacy.lang,
        likesCount: tweet.legacy.favorite_count,
        liked: tweet.legacy.favorited,
        limited: limitations ? {
            actions: limitations.actions?.map(({ action }) => action),
            type: tweet.core.user_results.result.legacy.blocked_by ? 'blocked_by_author' : limitations.limitedText ? 'severe_hate_limited' : 'hate_limited'
        } : undefined,
        media: tweet.legacy.entities.media?.map(formatMedia) || [],
        muted: false,
        pinned: !!options?.pinned,
        platform: tweet.source.match(/>Twitter\sfor\s(.*?)</)?.at(1),
        quoteTweetsCount: tweet.legacy.quote_count,
        quotedTweet: tweet.quoted_status_result?.result && tweet.quoted_status_result.result.__typename !== 'TweetTombstone' ? formatTweet(
            tweet.quoted_status_result.result.__typename === 'TweetWithVisibilityResults' ? tweet.quoted_status_result.result.tweet : tweet.quoted_status_result!.result
        ) as Tweet : undefined,
        quotedTweetId: tweet.legacy.quoted_status_id_str,
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
        text: (tweet.note_tweet?.note_tweet_results.result.text || tweet.legacy.full_text || '').replace(/\bhttps:\/\/t\.co\/[a-zA-Z0-9]+/, sub => tweet.legacy.entities.urls.find(x => x.url === sub)?.expanded_url || sub),
        textHighlights: options?.highlights || [],
        translatable: tweet.is_translatable,
        urls: tweet.legacy.entities.urls.map(url => url.expanded_url),
        userMentions: tweet.legacy.entities.user_mentions?.map(mention => ({
            id: mention.id_str,
            name: mention.name,
            username: mention.screen_name
        })) || [],
        viewsCount: tweet.views.count ? Number(tweet.views.count) : undefined
    };
};

export const formatEntry = (input: _Entry<_TimelineTweetItem>): Entry<TimelineTweet> | undefined => {
    if (input.content.__typename === 'TimelineTimelineCursor') {
        return {
            id: input.entryId,
            content: formatCursor(input.content)
        };
    }

    if (input.content.__typename === 'TimelineTimelineItem' && !input.entryId.startsWith('promoted-tweet')) {
        return {
            id: input.entryId,
            content: formatTweet(input.content.itemContent.tweet_results.result, {
                hasHiddenReplies: input.content.itemContent.hasModeratedReplies,
                highlights: input.content.itemContent.highlights?.textHighlights.map(x => [x.startIndex, x.endIndex]),
                pinned: input.entryId.endsWith('-pin')
            })
        };
    }

    if (input.content.__typename === 'TimelineTimelineModule' && input.entryId.includes('conversation')) {
        return {
            id: input.entryId,
            content: {
                __type: 'Conversation',
                items: input.content.items.map(item => item.item.itemContent.__typename === 'TimelineTimelineCursor'
                    ? formatCursor(item.item.itemContent)
                    : (formatTweet(item.item.itemContent.tweet_results.result, {
                        hasHiddenReplies: item.item.itemContent.hasModeratedReplies,
                        highlights: item.item.itemContent.highlights?.textHighlights.map(x => [x.startIndex, x.endIndex])
                    })) as Tweet)
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
            content: item.item.itemContent.__typename === 'TimelineTimelineCursor'
                ? formatCursor(item.item.itemContent)
                : formatTweet(item.item.itemContent.tweet_results.result, {
                    hasHiddenReplies: item.item.itemContent.hasModeratedReplies,
                    highlights: item.item.itemContent.highlights?.textHighlights.map(x => [x.startIndex, x.endIndex])
                })
        })) : [])
    ];
};



export const formatMedia = (input: _TweetMedia): TweetMedia => {
    return input.type === 'video'
        ? {
            __type: 'MediaVideo',
            id: input.id_str,
            url: input.media_url_https,
            video: {
                aspectRatio: input.video_info!.aspect_ratio,
                variants: input.video_info!.variants.map(variant => ({
                    bitrate: variant.bitrate,
                    contentType: variant.content_type,
                    url: variant.url
                }))
            }
        }
    : input.type === 'animated_gif'
        ? {
            __type: 'MediaGif',
            id: input.id_str,
            alt_text: input.ext_alt_text || undefined,
            url: input.video_info!.variants.at(-1)!.url,
            video: {
                aspectRatio: input.video_info!.aspect_ratio,
                variants: input.video_info!.variants.map(variant => ({
                    bitrate: variant.bitrate,
                    contentType: variant.content_type,
                    url: variant.url
                }))
            }
        }
        : {
            __type: 'MediaPhoto',
            id: input.id_str,
            alt_text: input.ext_alt_text || undefined,
            url: input.media_url_https
        };
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
            users: (input.user_refs_results || []).map(x => x.user_results ? formatUser(x.user_results.result) as User : null).filter(x => !!x)
        } : undefined
    };
};
