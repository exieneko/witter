import { formatUser } from './user';

import { Community } from '../types/community';
import { _Community } from '../types/raw/community';

export const formatCommunity = (input: _Community): Community => {
    return {
        __type: 'Community',
        id: input.rest_id,
        created_at: new Date(input.created_at).toISOString(),
        creator_username: input.creator_results?.result.legacy.screen_name,
        description: input.description || undefined,
        highlighted_avatar_users: input.members_facepile_results.map(user => formatUser(user.result)),
        joinable: input.join_policy === 'Open',
        member: input.role !== 'NonMember',
        members_count: input.member_count,
        moderator: input.role === 'Moderator',
        moderators_count: input.moderator_count,
        name: input.name,
        nsfw: input.is_nsfw,
        pinned: input.is_pinned,
        primary_topic: {
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
