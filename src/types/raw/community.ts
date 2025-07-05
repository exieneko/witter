import type { _User } from './user';

export interface _Community {
    __typename: 'Community',
    rest_id: string,
    name: string,
    description: string,
    created_at: number,
    search_tags: string[],
    is_nsfw: boolean,
    primary_community_topic: _CommunityTopic,
    join_policy: 'Open' | 'Closed', // TODO verify
    invites_policy: 'MemberInvitesAllowed', // TODO
    is_pinned: boolean,
    members_facepile_results: {
        result: _User
    }[],
    moderator_count: number,
    member_count: number,
    role: 'NonMember' | 'Member' | 'Moderator', // TODO verify
    rules: {
        rest_id: string,
        name: string,
        description: string
    }[],
    custom_banner_media: {
        media_info: _CommunityMedia & {
            salient_rect: {
                left: number,
                top: number,
                width: number,
                height: number
            }
        }
    },
    default_banner_media: {
        media_info: _CommunityMedia
    },
    viewer_relationship: {
        moderation_state: {} // TODO
    },
    join_requests_result: {
        __typename: 'CommunityJoinRequestsUnavailable' // TODO
    },
    
    invites_result?: {
        __typename: 'CommunityInvitesUnavailable' // TODO
    },
    creator_results?: {
        result: {
            legacy: {
                screen_name: string
            }
        }
    },
    trending_hashtags_slice?: {
        __typename: 'CommunityHashtagSlice',
        items: string[]
    }
}

interface _CommunityMedia {
    color_info: {
        palette: {
            rgb: {
                red: number,
                green: number,
                blue: number
            },
            percentage: number
        }[]
    },
    original_img_url: string,
    original_img_width: number,
    original_img_height: number
}

export interface _CommunityTopic {
    subtopics?: Omit<_CommunityTopic, 'subtopics'>[]
    topic_id: string,
    topic_name: string
}
