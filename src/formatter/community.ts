import { formatUser } from './user';

import type { Community, User } from '../types';
import type { _Community } from '../types/raw/community';

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
        nsfw: input.is_nsfw,
        pinned: input.is_pinned,
        primaryTopic: {
            id: input.primary_community_topic.topic_id,
            name: input.primary_community_topic.topic_name,
            subtopics: input.primary_community_topic.subtopics?.map(topic => ({
                id: topic.topic_id,
                name: topic.topic_name
            }))
        },
        rules: input.rules.map(rule => ({
            id: rule.rest_id,
            description: rule.description,
            name: rule.name
        }))
    };
};
