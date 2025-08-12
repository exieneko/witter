import type { Cursor } from './index.js';
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
    __type: 'MediaPhoto',
    id: string,
    alt_text?: string,
    url: string
}

export interface TweetGif {
    __type: 'MediaGif',
    id: string,
    alt_text?: string,
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

export interface TweetVideo {
    __type: 'MediaVideo'
    id: string,
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

export type TweetMedia = TweetImage | TweetGif | TweetVideo;

export interface Tweet {
    __type: 'Tweet',
    id: string,
    author: User,
    birdwatchNote?: {
        id: string,
        text: string,
        lang: string,
        translatable: boolean,
        public: boolean
    },
    bookmarksCount: number,
    bookmarked: boolean,
    card?: TweetCard,
    community?: Community,
    createdAt: string,
    editing?: {
        allowed: boolean,
        allowedUntil: string,
        remainingCount: number,
        tweetIds: string[]
    },
    expandable: boolean,
    hasBirdwatchNote: boolean,
    hasGrokChatEmbed: boolean,
    hasHiddenReplies: boolean,
    hasQuotedTweet: boolean,
    lang: string,
    likesCount: number,
    liked: boolean,
    limited?: {
        allowedActions: {
            reply: boolean,
            retweet: boolean,
            quoteTweet: boolean,
            like: boolean,
            bookmark: boolean,
            vote: boolean
        },
        mediaLimitedReason?: 'nsfw_unverified' /* europe only */ | 'nsfw' | 'violence',
        type: 'hate_limited' | 'severe_hate_limited' | 'age_restriction_limited' /* europe only */ | 'blocked_by_author'
    },
    media: TweetMedia[],
    muted: boolean,
    pinned: boolean,
    platform?: string,
    quoteTweetsCount: number,
    quotedTweet?: Tweet | TweetTombstone,
    quotedTweetId?: string,
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
    translatable: boolean
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
    items: (Tweet | TweetTombstone | Cursor)[]
}

export type TweetTombstoneReason = 'deleted' | 'private_account' | 'withheld' | 'unavailable';

export interface TweetTombstone {
    __type: 'TweetTombstone',
    reason: TweetTombstoneReason
}



export type TimelineTweet = Tweet | Retweet | TweetConversation | TweetTombstone | Cursor;

export interface TweetList {
    __type: 'TweetList',
    items: Tweet[]
}
