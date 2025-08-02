import type { _User } from './user.js';

interface _MediaInfo {
    original_img_url: string,
    original_img_width: number,
    original_img_height: number,
    salient_rect: {
        left: number,
        top: number,
        width: number,
        height: number
    }
}

interface _BannerMedia {
    media_info: _MediaInfo
}

interface _BannerMediaResult {
    result: {
        __typename: 'ApiMedia',
        id: string,
        media_key: string,
        media_id: string,
        media_info: _MediaInfo
    }
}

export interface _List {
    created_at: number,
    default_banner_media?: _BannerMedia,
    default_banner_media_results?: _BannerMediaResult,
    custom_banner_media?: _BannerMedia,
    custom_banner_media_results?: _BannerMediaResult,
    description: string,
    facepile_urls: string[],
    followers_context: `${string} followers${` including ${string}` | ''}`,
    following: boolean,
    id_str: string,
    is_member: boolean,
    member_count: number,
    members_context: string,
    mode: 'Public' | 'Private',
    muting: boolean,
    name: string,
    pinning: boolean,
    subscriber_count: number,
    user_results: {
        result: _User
    }
}

// export interface _ListItem {
//     __typename: 'TimelineTwitterList',
//     list: _List
// }
