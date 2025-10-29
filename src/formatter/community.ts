import { CommunityRole, type Community, type User, type UnavailableCommunity } from '../types/index.js';
import { user } from './user.js';

export function community(value: any): Community | UnavailableCommunity {
    if (!value || value.__typename === 'CommunityUnavailable') {
        return { __type: 'UnavailableCommunity' };
    }

    return {
        __type: 'Community',
        id: value.id_str,
        banner_url: value.custom_banner_media?.media_info?.original_img_url,
        can_join: value.join_policy === 'Open',
        can_invite: value.invites_policy === 'MemberInvitesAllowed' && !value.invites_result?.__typename.includes('Unavailable'),
        created_at: new Date(value.created_at).toISOString(),
        creator: user(value.creator_results?.result) as User,
        description: value.description || '',
        member: !!value.is_member,
        members_count: value.member_count || 0,
        moderators_count: value.moderator_count || 0,
        name: value.name,
        nsfw: !!value.is_nsfw,
        pinned: !!value.is_pinned,
        role: (() => {
            switch (value.role) {
                case 'NonMember':
                    return CommunityRole.Guest;
                case 'Member':
                    return CommunityRole.Member;
                case 'Moderator':
                    return CommunityRole.Moderator;
                default:
                    return CommunityRole.Owner;
            }
        })(),
        rules: value.rules?.map((rule: any) => ({
            id: rule.rest_id,
            description: rule.description,
            name: rule.name
        })),
        topic: value.primary_community_topic?.topic_name
    };
}
