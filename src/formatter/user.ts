import { formatCursor } from '.';

import { Cursor, Entry } from '../types';
import { Settings } from '../types/account';
import { User } from '../types/user';
import { _Cursor, _Entry } from '../types/raw';
import { _AccountSettings } from '../types/raw/account';
import { _UserItem } from '../types/raw/items';
import { _User, _UserV3 } from '../types/raw/user';

export const formatUser = (input: _User): User => {
    return {
        __type: 'User',
        id: input.rest_id,
        affiliates_count: input.business_account?.affiliates_count,
        affiliate_label: input.affiliates_highlighted_label.label && !!input.affiliates_highlighted_label.label.url?.url ? {
            title: input.affiliates_highlighted_label.label.description,
            owner: input.affiliates_highlighted_label.label.url.url.split('.com/')[1],
            image_url: input.affiliates_highlighted_label.label.badge.url
        } : undefined,
        avatar_url: input.legacy.profile_image_url_https.replace('normal', '400x400'),
        banner_url: input.legacy.profile_banner_url,
        birthdate: input.legacy_extended_profile?.birthdate ? {
            day: input.legacy_extended_profile.birthdate.day,
            month: input.legacy_extended_profile.birthdate.month - 1,
            year: input.legacy_extended_profile.birthdate.year
        } : undefined,
        blocked: input.legacy.blocking || false,
        blocked_by: input.legacy.blocked_by || false,
        can_dm: input.legacy.can_dm,
        can_media_tag: input.legacy.can_media_tag,
        created_at: new Date(input.legacy.created_at).toISOString(),
        description: input.legacy.description || undefined,
        followers_count: input.legacy.followers_count,
        following_count: input.legacy.friends_count,
        followed: input.legacy.following || false,
        follow_requested: input.legacy.protected ? input.legacy.follow_request_sent || false : undefined,
        followed_by: input.legacy.followed_by || false,
        job: input.professional?.category.at(0)?.name,
        location: input.legacy.location || undefined,
        muted: input.legacy.muting || false,
        name: input.legacy.name,
        pinned_tweet_id: input.legacy.pinned_tweet_ids_str.at(0),
        private: input.legacy.protected,
        translatable: input.is_profile_translatable,
        tweets_count: input.legacy.statuses_count,
        media_count: input.legacy.media_count,
        likes_count: input.legacy.favourites_count,
        listed_count: input.legacy.listed_count,
        username: input.legacy.screen_name,
        url: input.legacy.url || undefined,
        verified: input.legacy.verified,
        verified_type: input.legacy.verified ? input.legacy.verified_type === 'Business' ? 'gold' : input.legacy.verified_type === 'Government' ? 'gray' : 'blue' : undefined,
        want_retweets: input.legacy.want_retweets || true,
        want_notifications: input.legacy.notifications || false
    };
};

export const formatUserLegacy = (input: _User['legacy']): User => {
    return {
        __type: 'User',
        id: input.id_str,
        avatar_url: input.profile_image_url_https.replace('normal', '400x400'),
        banner_url: input.profile_banner_url,
        blocked: input.blocking || false,
        blocked_by: input.blocked_by || false,
        can_dm: input.can_dm,
        can_media_tag: input.can_media_tag,
        created_at: new Date(input.created_at || 0).toISOString(),
        description: input.description || undefined,
        followers_count: input.followers_count,
        following_count: input.friends_count,
        followed: input.following || false,
        follow_requested: input.protected ? input.follow_request_sent || false : undefined,
        followed_by: input.followed_by || false,
        location: input.location || undefined,
        muted: input.muting || false,
        name: input.name,
        pinned_tweet_id: input.pinned_tweet_ids_str?.at(0),
        private: input.protected,
        translatable: false,
        tweets_count: input.statuses_count,
        media_count: input.media_count,
        likes_count: input.favourites_count,
        listed_count: input.listed_count,
        username: input.screen_name,
        url: input.url || undefined,
        verified: input.verified,
        verified_type: input.verified ? input.verified_type === 'Business' ? 'gold' : input.verified_type === 'Government' ? 'gray' : 'blue' : undefined,
        want_retweets: input.want_retweets || true,
        want_notifications: input.notifications || false
    };
};

export const formatUserEntries = (input: _Entry<_UserItem | _Cursor>[]): Entry<User | Cursor>[] => {
    return input.map(entry => ({
        id: entry.entryId,
        content: entry.content.__typename === 'TimelineTimelineCursor'
            ? formatCursor(entry.content)
            : formatUser(entry.content.user_result.result)
    }));
};



export const normalizeUserV3 = (input: _UserV3): _User => {
    let legacy = {
        ...input.legacy,
        can_dm: input.dm_permissions.can_dm,
        can_media_tag: input.media_permissions.can_media_tag,
        created_at: input.core.created_at,
        followed_by: !!input.relationship_perspective?.followed_by,
        following: !!input.relationship_perspective?.following,
        name: input.core.name,
        screen_name: input.core.screen_name,
        location: input.location.location,
        profile_image_url_https: input.avatar.image_url,
        protected: input.privacy.protected,
        verified: input.verification.verified
    };

    return { ...input, legacy: legacy };
};



export const formatSettings = (input: _AccountSettings): Settings => {
    return {
        country: {
            code: input.country_code,
            eu_member: (input.settings_metadata?.is_eu || false).toString() === 'true'
        },
        inbox: {
            allow_incoming_messages: input.allow_dms_from !== 'following',
            allow_incoming_messages_from_verified_only: input.allow_dms_from === 'verified',
            read_receipts: input.dm_receipt_setting === 'all_enabled',
            quality_filter: input.dm_quality_filter === 'enabled'
        },
        mention_filter: input.mention_filter !== 'unfiltered',
        lang: input.language,
        warnings: {
            personalized_ads_enabled: input.allow_ads_personalization || false,
            data_selling_enabled: input.allow_sharing_data_for_third_party_personalization || false,
            discoverable_by_email: input.discoverable_by_email || false,
            discoverable_by_phone_number: input.discoverable_by_mobile_phone || false
        }
    };
};
