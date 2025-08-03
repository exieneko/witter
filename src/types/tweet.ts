import type { Cursor, ShowMoreCursor } from './index.js';
import type { Community } from './community.js';
import type { User } from './user.js';
import { _LimitedActionType } from './raw/tweet.js';

interface PollOption {
    label: string,
    count: number
}

export interface TweetCard {
    id: string,
    audiospace?: {
        id: string,
        cardUrl: string,
        narrowCastSpaceType: string
    },
    poll?: {
        cardUrl: string,
        /** duration in ms */
        duration: number,
        endsAt: string,
        ended: boolean,
        options: [PollOption, PollOption, PollOption?, PollOption?]
        selectedIndex?: number
    },
    embed?: {
        title: string,
        description?: string,
        domain: string,
        imageUrl?: string,
        users: User[]
    }
}

export interface TweetImage {
    __type: `Media${'Photo' | 'Gif'}`,
    id: string,
    alt_text?: string,
    /** @deprecated */
    blurred?: boolean,
    url: string
}

export interface TweetVideo {
    __type: 'MediaVideo'
    id: string,
    /** @deprecated */
    blurred?: boolean,
    url: string,
    video: {
        aspectRatio: [number, number],
        variants: {
            bitrate: number,
            contentType: string,
            url: string
        }[]
    }
}

export type TweetMedia = TweetImage | TweetVideo;

export type LimitedActionType = _LimitedActionType;

export interface Tweet {
    __type: 'Tweet',
    id: string,
    author: User,
    birdwatchNote?: {
        id: string,
        text: string,
        public: boolean,
        url: string
    },
    bookmarksCount: number,
    bookmarked: boolean,
    card?: TweetCard,
    community?: Community,
    createdAt: string,
    editing?: {
        allowedUntil: string,
        eligible: boolean,
        remainingCount: number,
        tweetIds: string[]
    },
    expandable: boolean,
    hasGrokChatEmbed: boolean,
    hasHiddenReplies: boolean,
    hasQuotedTweet: boolean,
    lang: string,
    likesCount: number,
    liked: boolean,
    limited?: {
        actions?: LimitedActionType[],
        type: 'hate_limited' | 'severe_hate_limited' | 'blocked_by_author'
    },
    media: TweetMedia[],
    muted: boolean,
    pinned: boolean,
    platform?: string,
    quoteTweetsCount: number,
    quotedTweet?: Tweet,
    /** @deprecated */
    quotedTweetFallback?: {
        hasQuotedTweet: boolean,
        tweetId: string
    },
    repliesCount: number,
    replyingTo?: {
        tweetId: string,
        username: string
    },
    retweetsCount: number,
    retweeted: boolean,
    text: string,
    /** `[start_index, end_index]` */
    textHighlights: [number, number][],
    translatable: boolean,
    urls: {
        url: string,
        displayUrl: string,
        expandedUrl: string
    }[],
    userMentions: {
        id: string,
        name: string,
        username: string
    }[]
    viewsCount?: number
}

export interface Retweet {
    __type: 'Retweet',
    id: string,
    retweeter: User,
    retweetedTweet: Tweet
}

export interface TweetConversation {
    __type: 'Conversation',
    items: (Tweet | TweetTombstone | ShowMoreCursor)[]
}

export interface TweetTombstone {
    __type: 'TweetTombstone',
    text?: string
}



export type TimelineTweet = Tweet | Retweet | TweetConversation | TweetTombstone | Cursor;

export interface TweetList {
    __type: 'TweetList',
    items: Tweet[]
}
