export interface User {
    __type: 'User',
    id: string,
    affiliates_count?: number,
    affiliate_label?: {
        title: string,
        owner: string,
        image_url: string
    },
    avatar_url: string,
    banner_url: string,
    birthdate?: {
        day: number,
        month: number,
        year?: number
    },
    blocked: boolean,
    blocked_by: boolean,
    can_dm: boolean,
    can_media_tag: boolean,
    created_at: string,
    description?: string,
    followers_count: number,
    following_count: number,
    followed: boolean,
    follow_requested?: boolean,
    followed_by: boolean,
    job?: string,
    location?: string,
    muted: boolean,
    name: string,
    pinned_tweet_id?: string,
    private: boolean,
    translatable: boolean,
    tweets_count: number,
    media_count: number,
    likes_count: number,
    listed_count: number,
    username: string,
    url?: string,
    verified: boolean,
    verified_type?: 'blue' | 'gold' | 'gray';
    want_retweets?: boolean,
    want_notifications?: boolean
}

export interface SuspendedUser {
    __type: 'SuspendedUser',
    message: string,
    reason: string
}



export interface UserList {
    __type: 'UserList',
    items: User[]
}
