import { Cursor } from './index.js';

export interface User {
    __type: 'User',
    id: string,
    affiliatesCount?: number,
    affiliateLabel?: {
        title: string,
        owner: string,
        imageUrl: string
    },
    avatarUrl: string,
    bannerUrl: string,
    birthdate?: {
        day: number,
        month: number,
        year?: number
    },
    blocked: boolean,
    blockedBy: boolean,
    canDm: boolean,
    canMediaTag: boolean,
    createdAt: string,
    description?: string,
    followersCount: number,
    followingCount: number,
    followed: boolean,
    followRequested?: boolean,
    followedBy: boolean,
    job?: string,
    location?: string,
    muted: boolean,
    name: string,
    pinnedTweetId?: string,
    private: boolean,
    translatable: boolean,
    tweetsCount: number,
    mediaCount: number,
    likesCount: number,
    listedCount: number,
    username: string,
    url?: string,
    verified: boolean,
    verifiedType?: 'blue' | 'gold' | 'gray';
    wantRetweets?: boolean,
    wantNotifications?: boolean
}

export interface UnavailableUser {
    __type: 'UnavailableUser',
    reason: 'suspended' | 'not_found'
}

export type TimelineUser = User | UnavailableUser | Cursor;



export interface UserList {
    __type: 'UserList',
    items: User[]
}
