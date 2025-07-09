import type { User } from './user';

export interface List {
    __type: 'List',
    id: string,
    author: User,
    banner_url?: string,
    created_at: string,
    description?: string,
    pinned: boolean,
    private: boolean,
    subscribed: boolean,
    subscribers_count: number,
    highlighted_avatar_urls: string[],
    highlighted_member_username?: string,
    highlighted_subscriber_username?: string,
    member: boolean,
    members_count: number,
    muted: boolean,
    name: string
}

export interface ListModule {
    __type: 'ListModule',
    items: List[]
}
