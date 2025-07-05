import type { User } from './user';

export interface Community {
    __type: 'Community',
    id: string,
    banner?: {
        custom: boolean,
        palette: {
            rgb: [number, number, number],
            percentage: number
        }[],
        url: string
    },
    created_at: string,
    creator_username?: string,
    description?: string,
    highlighted_avatar_users: User[],
    joinable: boolean,
    member: boolean,
    members_count: number,
    moderator: boolean,
    moderators_count: number,
    name: string,
    nsfw: boolean,
    pinned: boolean,
    primary_topic: {
        id: string,
        name: string,
        subtopics?: {
            id: string,
            name: string
        }[]
    },
    rules: {
        id: string,
        description: string,
        name: string
    }[]
}
