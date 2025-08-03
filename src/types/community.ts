import type { User } from './user.js';

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
    createdAt: string,
    creatorUsername?: string,
    description?: string,
    highlightedAvatarUsers: User[],
    joinable: boolean,
    member: boolean,
    membersCount: number,
    moderator: boolean,
    moderatorsCount: number,
    name: string,
    nsfw: boolean,
    pinned: boolean,
    rules: {
        id: string,
        description: string,
        name: string
    }[]
}
