import type { Cursor } from './index.js';

export interface User {
    __type: 'User',
    id: string,
    affiliates_count: number,
    affiliate_label?: {
        title: string,
        owner: string,
        image_url: string
    },
    avatar_url: string,
    banner_url?: string,
    birthday?: {
        day: number,
        month: number,
        year?: number
    },
    blocked: boolean,
    blocked_by: boolean,
    can_dm: boolean,
    can_media_tag: boolean,
    can_super_follow: boolean,
    created_at: string,
    description: string,
    followers_count: number,
    following_count: number,
    followed: boolean,
    follow_requested: boolean,
    followed_by: boolean,
    job?: string,
    location?: string,
    muted: boolean,
    name: string,
    pinned_tweet_id?: string,
    protected: boolean,
    super_following_count: number,
    super_following_hidden: boolean,
    translatable: boolean,
    tweets_count: number,
    media_count: number,
    likes_count: number,
    listed_count: number,
    username: string,
    url?: string,
    verified: boolean,
    verification_kind: VerificationKind,
    want_retweets: boolean,
    want_notifications: boolean
}

export enum VerificationKind {
    Unverified = 'Unverified',
    Blue = 'Blue',
    Business = 'Business',
    Government = 'Government'
}

export interface SuspendedUser {
    __type: 'SuspendedUser'
}

export interface UnavailableUser {
    __type: 'UnavailableUser'
}

export type TimelineUser = User | SuspendedUser | UnavailableUser | Cursor;
