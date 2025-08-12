import type { _Url } from './index.js';

export interface _User {
    __typename: 'User',
    id: string,
    rest_id: string,
    affiliates_highlighted_label: {
        label?: {
            url?: {
                /** link to company account */
                url: `https://twitter.com/${string}`
            },
            badge: {
                url: string
            },
            description: string
        }
    },
    has_graduated_access: boolean,
    is_blue_verified: boolean,
    legacy: {
        id_str: string,
        name: string,
        screen_name: string,
        location?: string,
        description: string,
        url: string | null,
        entities: {
            description?: {
                urls?: _Url[]
            },
            url?: {
                urls?: [_Url]
            }
        },
        protected: boolean,
        followers_count: number,
        friends_count: number,
        listed_count: number,
        created_at: string,
        favourites_count: number,
        verified: boolean,
        verified_type?: 'Business' | 'Government',
        statuses_count: number,
        media_count: number,
        lang: string | null,
        contributors_enabled: boolean,
        is_translator: boolean,
        is_translation_enabled: boolean,
        profile_image_url_https: string,
        profile_banner_url: string,
        has_extended_profile: boolean,
        pinned_tweet_ids_str?: string[],
        has_custom_timelines: boolean,
        can_dm: boolean
        can_media_tag: boolean,
        followed_by: boolean,
        following: boolean,
        follow_request_sent?: boolean,
        notifications: boolean,
        blocking?: boolean,
        blocked_by?: boolean,
        muting?: boolean,
        want_retweets?: boolean,
        withheld_in_countries: string[],
        require_some_consent: boolean
    },
    parody_commentary_fan_label: 'None',
    profile_image_shape: 'Circle' | 'Square',
    professional?: {
        rest_id: string,
        professional_type: 'Business',
        category: [{
            id: number,
            name: string
        }]
    },
    tipjar_settings: {
        is_enabled: boolean
    },

    legacy_extended_profile?: {
        birthdate?: {
            day: number,
            month: number,
            year?: number,
            visibility: 'Public' | 'Followers',
            year_visibility: 'Public' | 'Followers'
        }
    },
    is_profile_translatable: boolean,
    has_hidden_subscriptions_on_profile?: boolean,
    verification_info?: {
        is_identity_verified: boolean,
        reason?: {
            description: {
                text: string,
                entities: {
                    from_index: number,
                    to_index: number,
                    ref: {
                        url: string
                    }
                }[]
            },
            verified_since_msec: string
        }
    },
    business_account?: {
        affiliates_count: number
    }
}

export interface _UserV3 extends _User {
    avatar: {
        image_url: string
    },
    core: {
        created_at?: string,
        name: string,
        screen_name: string
    },
    dm_permissions?: {
        can_dm: boolean
    },
    location?: {
        location: string
    }
    media_permissions?: {
        can_media_tag: boolean
    },
    privacy: {
        protected: boolean
    },
    relationship_perspective?: {
        followed_by?: boolean,
        following?: boolean
    },
    verification: {
        verified: boolean
        verified_type?: 'Business' | 'Government'
    }
}

export interface _UserReducedInfo {
    __typename: 'User',
    id: string,
    rest_id: string,
    affiliates_highlighted_label: _User['affiliates_highlighted_label'],
    has_graduated_access: boolean,
    is_blue_verified: boolean,
    legacy: _User['legacy'],
    parody_commentary_fan_label: _User['parody_commentary_fan_label'],
    profile_image_shape: _User['profile_image_shape']
}

export interface _SuspendedUser {
    __typename: 'UserUnavailable',
    message: string,
    reason: string
}
