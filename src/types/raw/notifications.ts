import type { _Tweet } from './tweet';
import type { _User } from './user';

export interface _NotificationGlobalObjects {
    users: Record<string, _User['legacy']>,
    tweets: Record<string, _Tweet['legacy']>,
    communities?: Record<string, {
        apiCommunity: {
            v1: {
                id: number,
                updatedAt: number,
                name: string,
                access: {
                    value: number,
                    name: string,
                    originalName: string
                }
            }
        },
        id: number,
        name: string
    }>
}

export interface _UnreadCount {
    ntab_unread_count: number,
    dm_unread_count: number,
    total_unread_count: number,
    is_from_urt: boolean
}
