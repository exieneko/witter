import type { Cursor, ShowMoreCursor } from '.';
import type { Community } from './community';
import type { User } from './user';
import { _LimitedActionType } from './raw/tweet';

interface PollOption {
    label: string,
    count: number
}

export interface TweetCard {
    id: string,
    audiospace?: {
        id: string,
        card_url: string,
        narrow_cast_space_type: string
    },
    poll?: {
        card_url: string,
        /** duration in ms */
        duration: number,
        ends_at: string,
        ended: boolean,
        options: [PollOption, PollOption, PollOption?, PollOption?]
        selected_index?: number
    },
    embed?: {
        title: string,
        description?: string,
        domain: string,
        image_url?: string,
        users: User[]
    }
}

export interface Tweet {
    __type: 'Tweet',
    id: string,
    author: User,
    birdwatch_note?: {
        id: string,
        text: string,
        public: boolean,
        url: string
    },
    bookmarks_count: number,
    bookmarked: boolean,
    card?: TweetCard,
    community?: Community,
    created_at: string,
    editing?: {
        allowed_until: string,
        eligible: boolean,
        remaining_count: number,
        tweet_ids: string[]
    },
    expandable: boolean,
    has_grok_chat_embed: boolean,
    has_hidden_replies: boolean,
    lang: string,
    likes_count: number,
    liked: boolean,
    limited?: {
        actions?: _LimitedActionType[],
        type: 'hate_limited' | 'severe_hate_limited' | 'blocked_by_author'
    },
    media?: ({
        __type: `Media${'Photo' | 'Gif'}`,
        id: string,
        blurred?: boolean,
        url: string
    } | {
        __type: 'MediaVideo'
        id: string,
        blurred?: boolean,
        url: string,
        video: {
            aspect_ratio: [number, number],
            variants: {
                bitrate: number,
                content_type: string,
                url: string
            }[]
        }
    })[],
    muted: boolean,
    platform?: string,
    quote_tweets_count: number,
    quoted_tweet?: Tweet,
    quoted_tweet_fallback?: {
        has_quoted_tweet: boolean,
        tweet_id: string
    },
    replies_count: number,
    replying_to?: {
        tweet_id: string,
        username: string
    },
    retweets_count: number,
    retweeted: boolean,
    text: string,
    /** `[start_index, end_index]` */
    text_highlights: [number, number][],
    translatable: boolean,
    urls: {
        url: string,
        display_url: string,
        expanded_url: string
    }[],
    views_count?: number
}

export interface Retweet {
    __type: 'Retweet',
    id: string,
    retweeter: User,
    retweeted_tweet: Tweet
}

export interface TweetConversation {
    __type: 'Conversation',
    items: (Tweet | TweetTombstone | ShowMoreCursor)[]
}

export interface TweetTombstone {
    __type: 'TweetTombstone',
    text: string
}



export type TimelineTweet = Tweet | Retweet | TweetConversation | TweetTombstone | Cursor;

export interface TweetList {
    __type: 'TweetList',
    items: Tweet[]
}
