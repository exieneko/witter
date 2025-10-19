import type { Cursor, User } from './index.js';

export interface Tweet {
    __type: 'Tweet',
    id: string,
    author: User,
    birdwatch_note?: {
        id: string,
        text: string,
        lang: string,
        translatable: boolean,
        public: boolean
    },
    bookmarked: boolean,
    bookmarks_count: number,
    // card: {},
    // community: {},
    created_at: string,
    editing: {
        allowed: boolean,
        allowed_until: string,
        remaining_count: number,
        tweet_ids: Array<string>
    },
    expandable: boolean,
    has_ai_generated_image: boolean,
    has_birdwatch_note: boolean,
    has_grok_chat_embed: boolean,
    has_hidden_replies: boolean,
    has_quoted_tweet: boolean,
    lang: string,
    liked: boolean,
    likes_count: number,
    media: Array<TweetMedia>,
    platform: TweetPlatform,
    quote_tweets_count: number,
    quoted_tweet?: Tweet,
    quoted_tweet_id?: string,
    replies_count: number,
    replying_to_username?: string,
    retweeted: boolean,
    retweets_count: number,
    text: string,
    translatable: boolean,
    views_count?: number
}

export enum TweetPlatform {
    Web,
    Android,
    IPhone,
    IPad,
    Other
}

export interface TweetImage {
    __type: 'Image',
    id: string,
    ai_generated: boolean,
    alt_text?: string,
    available: boolean,
    size: {
        width: number,
        height: number
    },
    url: string
}

export type TweetVideo = Omit<TweetImage, '__type'> & {
    __type: 'Video',
    aspect_ratio: [number, number],
    duration: number,
    thumbnail_url: string,
    variants: Array<{
        bitrate?: number,
        content_type: string,
        url: string
    }>
};

export type TweetGif = Omit<TweetVideo, '__type'> & { __type: 'Gif' };

export type TweetMedia = TweetImage | TweetGif | TweetVideo;



export interface Retweet {
    __type: 'Retweet',
    id: string,
    tweet: Tweet,
    user: User
}



export interface Conversation {
    __type: 'Conversation',
    items: Array<Tweet | TweetTombstone | Cursor>
}



export interface TweetTombstone {
    __type: 'TweetTombstone',
    reason: TweetUnavailableReason
}

export enum TweetUnavailableReason {
    AgeVerificationRequired,
    AuthorProtected,
    AuthorSuspended,
    AuthorUnavailable,
    Deleted,
    ViolatedRules,
    Withheld,
    Unavailable
}

export type TimelineTweet = Tweet | Retweet | Conversation | TweetTombstone | Cursor;
