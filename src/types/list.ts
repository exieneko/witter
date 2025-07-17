import type { User } from './user';

export interface List {
    __type: 'List',
    id: string,
    author: User,
    bannerUrl?: string,
    createdAt: string,
    description?: string,
    pinned: boolean,
    private: boolean,
    subscribed: boolean,
    subscribersCount: number,
    highlightedAvatarUrls: string[],
    highlightedMemberUsername?: string,
    highlightedSubscriberUsername?: string,
    member: boolean,
    membersCount: number,
    muted: boolean,
    name: string
}

export interface ListModule {
    __type: 'ListModule',
    items: List[]
}
