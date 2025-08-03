import { formatUser } from './user.js';

import type { Community, Entry, TimelineUser, User } from '../types/index.js';
import type { _Community } from '../types/raw/community.js';
import { _Entry } from '../types/raw/index.js';
import { _UserV3 } from '../types/raw/user.js';

export const formatCommunity = (input: _Community): Community => {
    return {
        __type: 'Community',
        id: input.rest_id,
        createdAt: new Date(input.created_at).toISOString(),
        creatorUsername: input.creator_results?.result.legacy.screen_name,
        description: input.description || undefined,
        highlightedAvatarUsers: input.members_facepile_results.map(user => formatUser(user.result) as User),
        joinable: input.join_policy === 'Open',
        member: input.role !== 'NonMember',
        membersCount: input.member_count,
        moderator: input.role === 'Moderator',
        moderatorsCount: input.moderator_count,
        name: input.name,
        nsfw: input.is_nsfw || false,
        pinned: input.is_pinned || false,
        rules: input.rules.map(rule => ({
            id: rule.rest_id,
            description: rule.description,
            name: rule.name
        }))
    };
};

export const formatCommunityMembers = (input: _UserV3[], nextCursor?: string): Entry<TimelineUser>[] => {
    const result: Entry<TimelineUser>[] = input.map(user => ({
        id: `user-${user.rest_id}`,
        content: formatUser(user)
    }));

    if (nextCursor) {
        result.push({
            id: `cursor-bottom-${input.at(-1)?.rest_id || Math.random()}`,
            content: {
                __type: 'Cursor',
                direction: 'bottom',
                value: nextCursor
            }
        });
    }

    return result;
};
