import type { User } from './user.js';

export interface Community {
    __type: 'Community',
    id: string,
    banner_url?: string,
    can_join: boolean,
    can_invite: boolean,
    created_at: string,
    creator: User,
    description: string,
    member: boolean,
    members_count: number,
    moderators_count: number,
    name: string,
    nsfw: boolean,
    pinned: boolean,
    role: CommunityRole,
    rules: Array<{
        id: string,
        description?: string,
        name: string
    }>,
    topic: string
}

export enum CommunityRole {
    Guest = 'Guest',
    Member = 'Member',
    Moderator = 'Moderator',
    Owner = 'Owner'
}



export interface UnavailableCommunity {
    __type: 'UnavailableCommunity'
}
