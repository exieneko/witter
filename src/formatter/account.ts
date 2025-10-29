import type { Settings } from '../types/account.js';

export function settings(value: any): Settings {
    return {
        allow_personalized_ads: !!value.allow_ads_personalization,
        allow_cookies: !!value.use_cookie_personalization,
        allow_selling_your_information: !!value.allow_sharing_data_for_third_party_personalization,
        allow_location_history: !!value.allow_location_history_personalization,
        autoplay: !value.autoplay_disabled,
        country: value.country_code || '?',
        display_sensitive_media: !!value.display_sensitive_media,
        dm_allowed_from: value.allow_dms_from || 'all',
        dm_groups_allowed_from: value.allow_dm_groups_from || 'all',
        dm_receipts: value.dm_receipt_setting !== 'all_disabled',
        dm_quality_filter: value.dm_quality_filter !== 'disabled',
        eu: value.settings_medadata?.is_eu === 'true',
        is_email_public: !!value.discoverable_by_email_address,
        is_phone_number_public: !!value.discoverable_by_mobile_phone,
        lang: value.language,
        nsfw: !!value.nfsw_user || !!value.nsfw_admin,
        personalized_trends: !!value.personalized_trends,
        protected: !!value.protected,
        show_current_audiospace_publicly: !!value.ext_sharing_audiospaces_listening_data_with_followers,
        username: value.screen_name
    };
}
