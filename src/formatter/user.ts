import { formatCursor } from './index.js';

import type { Cursor, Entry, MutedWord, Settings, UnavailableUser, User } from '../types/index.js';
import type { _Cursor, _Entry } from '../types/raw/index.js';
import type { _AccountSettings, _MutedWord } from '../types/raw/account.js';
import type { _UserItem } from '../types/raw/items.js';
import type { _SuspendedUser, _User, _UserV3 } from '../types/raw/user.js';

export const formatUser = (input: _User | _SuspendedUser): User | UnavailableUser => {
    if (input.__typename === 'User') {
        return {
            __type: 'User',
            id: input.rest_id,
            affiliatesCount: input.business_account?.affiliates_count || 0,
            affiliateLabel: input.affiliates_highlighted_label.label && !!input.affiliates_highlighted_label.label.url?.url ? {
                title: input.affiliates_highlighted_label.label.description,
                owner: input.affiliates_highlighted_label.label.url.url.split('.com/')[1],
                imageUrl: input.affiliates_highlighted_label.label.badge.url
            } : undefined,
            avatarUrl: input.legacy.profile_image_url_https.replace('normal', '400x400'),
            bannerUrl: input.legacy.profile_banner_url,
            birthdate: input.legacy_extended_profile?.birthdate ? {
                day: input.legacy_extended_profile.birthdate.day,
                month: input.legacy_extended_profile.birthdate.month,
                year: input.legacy_extended_profile.birthdate.year
            } : undefined,
            blocked: input.legacy.blocking || false,
            blockedBy: input.legacy.blocked_by || false,
            canDm: input.legacy.can_dm,
            canMediaTag: input.legacy.can_media_tag,
            createdAt: new Date(input.legacy.created_at).toISOString(),
            description: input.legacy.description || undefined,
            followersCount: input.legacy.followers_count,
            followingCount: input.legacy.friends_count,
            followed: input.legacy.following || false,
            followRequested: input.legacy.protected ? input.legacy.follow_request_sent || false : undefined,
            followedBy: input.legacy.followed_by || false,
            job: input.professional?.category.at(0)?.name,
            location: input.legacy.location || undefined,
            muted: input.legacy.muting || false,
            name: input.legacy.name,
            pinnedTweetId: input.legacy.pinned_tweet_ids_str.at(0),
            private: input.legacy.protected || false,
            translatable: input.is_profile_translatable,
            tweetsCount: input.legacy.statuses_count,
            mediaCount: input.legacy.media_count,
            likesCount: input.legacy.favourites_count,
            listedCount: input.legacy.listed_count,
            username: input.legacy.screen_name,
            url: input.legacy.url || undefined,
            verified: input.legacy.verified,
            verifiedType: input.legacy.verified ? input.legacy.verified_type === 'Business' ? 'gold' : input.legacy.verified_type === 'Government' ? 'gray' : 'blue' : undefined,
            wantRetweets: input.legacy.want_retweets || true,
            wantNotifications: input.legacy.notifications || false
        };
    }

    return {
        __type: 'UnavailableUser',
        reason: input.__typename === 'UserUnavailable' ? 'suspended' : 'not_found'
    };
};

export const formatUserLegacy = (input: _User['legacy']): User => {
    return {
        __type: 'User',
        id: input.id_str,
        avatarUrl: input.profile_image_url_https.replace('normal', '400x400'),
        bannerUrl: input.profile_banner_url,
        blocked: input.blocking || false,
        blockedBy: input.blocked_by || false,
        canDm: input.can_dm,
        canMediaTag: input.can_media_tag,
        createdAt: new Date(input.created_at || 0).toISOString(),
        description: input.description || undefined,
        followersCount: input.followers_count,
        followingCount: input.friends_count,
        followed: input.following || false,
        followRequested: input.protected ? input.follow_request_sent || false : undefined,
        followedBy: input.followed_by || false,
        location: input.location || undefined,
        muted: input.muting || false,
        name: input.name,
        pinnedTweetId: input.pinned_tweet_ids_str?.at(0),
        private: input.protected,
        translatable: false,
        tweetsCount: input.statuses_count,
        mediaCount: input.media_count,
        likesCount: input.favourites_count,
        listedCount: input.listed_count,
        username: input.screen_name,
        url: input.url || undefined,
        verified: input.verified,
        verifiedType: input.verified ? input.verified_type === 'Business' ? 'gold' : input.verified_type === 'Government' ? 'gray' : 'blue' : undefined,
        wantRetweets: input.want_retweets || true,
        wantNotifications: input.notifications || false
    };
};

export const formatUserEntries = (input: _Entry<_UserItem | _Cursor>[]): Entry<User | Cursor>[] => {
    return input.map(entry => ({
        id: entry.entryId,
        content: entry.content.__typename === 'TimelineTimelineCursor'
            ? formatCursor(entry.content)
            : formatUser(entry.content.user_result.result) as User
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
            euMember: (input.settings_metadata?.is_eu || false).toString() === 'true'
        },
        inbox: {
            allowIncomingMessages: input.allow_dms_from !== 'following',
            allowIncomingMessagesFromVerifiedOnly: input.allow_dms_from === 'verified',
            readReceipts: input.dm_receipt_setting === 'all_enabled',
            qualityFilter: input.dm_quality_filter === 'enabled'
        },
        mentionFilter: input.mention_filter !== 'unfiltered',
        lang: input.language,
        username: input.screen_name,
        warnings: {
            personalizedAdsEnabled: input.allow_ads_personalization || false,
            dataSellingEnabled: input.allow_sharing_data_for_third_party_personalization || false,
            discoverableByEmail: input.discoverable_by_email || false,
            discoverableByPhoneNumber: input.discoverable_by_mobile_phone || false
        }
    };
};

export const formatMutedWord = (input: _MutedWord): MutedWord => {
    return {
        id: input.id,
        createdAt: new Date(input.created_at).toISOString(),
        expires: input.valid_until ? new Date(input.valid_until).toISOString() : undefined,
        includes: {
            following: !input.mute_options.includes('exclude_following_accounts'),
            timeline: input.mute_surfaces.includes('home_timeline'),
            replies: input.mute_surfaces.includes('tweet_replies'),
            notifications: input.mute_surfaces.includes('notifications')
        },
        value: input.keyword
    };
};
