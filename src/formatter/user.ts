import { formatCursor } from './index.js';

import type { Entry, MutedWord, Settings, TimelineUser, User } from '../types/index.js';
import type { _Cursor, _Entry } from '../types/raw/index.js';
import type { _AccountSettings, _MutedWord } from '../types/raw/account.js';
import type { _UserItem } from '../types/raw/items.js';
import type { _SuspendedUser, _User, _UserV3 } from '../types/raw/user.js';

export const formatUser = (input: _User | _SuspendedUser | _UserV3): TimelineUser => {
    if (!input) {
        return {
            __type: 'UnavailableUser',
            reason: 'not_found'
        };
    }

    // @ts-ignore
    const user = input && input.core ? normalizeUserV3(input as _UserV3) : input;

    if (user.__typename === 'User') {
        return {
            __type: 'User',
            id: user.rest_id,
            affiliatesCount: user.business_account?.affiliates_count || 0,
            affiliateLabel: user.affiliates_highlighted_label.label && !!user.affiliates_highlighted_label.label.url?.url ? {
                title: user.affiliates_highlighted_label.label.description,
                owner: user.affiliates_highlighted_label.label.url.url.split('.com/')[1],
                imageUrl: user.affiliates_highlighted_label.label.badge.url
            } : undefined,
            avatarUrl: user.legacy.profile_image_url_https.replace('normal', '400x400'),
            bannerUrl: user.legacy.profile_banner_url,
            birthdate: user.legacy_extended_profile?.birthdate ? {
                day: user.legacy_extended_profile.birthdate.day,
                month: user.legacy_extended_profile.birthdate.month,
                year: user.legacy_extended_profile.birthdate.year
            } : undefined,
            blocked: user.legacy.blocking || false,
            blockedBy: user.legacy.blocked_by || false,
            canDm: user.legacy.can_dm,
            canMediaTag: user.legacy.can_media_tag,
            createdAt: new Date(user.legacy.created_at).toISOString(),
            description: user.legacy.description || undefined,
            followersCount: user.legacy.followers_count,
            followingCount: user.legacy.friends_count,
            followed: user.legacy.following || false,
            followRequested: user.legacy.protected ? user.legacy.follow_request_sent || false : undefined,
            followedBy: user.legacy.followed_by || false,
            job: user.professional?.category.at(0)?.name,
            location: user.legacy.location || undefined,
            muted: user.legacy.muting || false,
            name: user.legacy.name,
            pinnedTweetId: user.legacy.pinned_tweet_ids_str?.at(0),
            private: user.legacy.protected || false,
            translatable: user.is_profile_translatable,
            tweetsCount: user.legacy.statuses_count,
            mediaCount: user.legacy.media_count,
            likesCount: user.legacy.favourites_count,
            listedCount: user.legacy.listed_count,
            username: user.legacy.screen_name,
            url: user.legacy.url || undefined,
            verified: user.legacy.verified,
            verifiedType: user.legacy.verified ? user.legacy.verified_type === 'Business' ? 'gold' : user.legacy.verified_type === 'Government' ? 'gray' : 'blue' : undefined,
            wantRetweets: user.legacy.want_retweets || true,
            wantNotifications: user.legacy.notifications || false
        };
    }

    return {
        __type: 'UnavailableUser',
        reason: user.__typename === 'UserUnavailable' ? 'suspended' : 'not_found'
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

export const formatUserEntries = (input: _Entry<_UserItem | _Cursor>[]): Entry<TimelineUser>[] => {
    return input.map(entry => ({
        id: entry.entryId,
        content: entry.content.__typename === 'TimelineTimelineCursor'
            ? formatCursor(entry.content)
            : formatUser(entry.content.user_result.result) as User
    }));
};



const normalizeUserV3 = (input: _UserV3): _User => {
    let legacy = {
        ...input.legacy,
        can_dm: input.dm_permissions?.can_dm || false,
        can_media_tag: input.media_permissions?.can_media_tag || false,
        created_at: input.core.created_at || new Date().toISOString(),
        followed_by: !!input.relationship_perspective?.followed_by,
        following: !!input.relationship_perspective?.following,
        name: input.core.name,
        screen_name: input.core.screen_name,
        location: input.location?.location,
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
