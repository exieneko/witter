export interface _AccountSettings {
    protected: boolean,
    screen_name: string,
    always_use_https: boolean,
    use_cookie_personalization: boolean,
    geo_enabled: boolean,
    language: string,
    discoverable_by_email: boolean,
    discoverable_by_mobile_phone: boolean,
    display_sensitive_media: boolean,
    personalized_trends: boolean,
    allow_media_tagging: 'none',
    allow_contributor_request: 'none',
    allow_ads_personalization: boolean,
    allow_logged_out_device_personalization: boolean,
    allow_location_history_personalization: boolean,
    allow_sharing_data_for_third_party_personalization: boolean,
    allow_authenticated_periscope_requests: boolean,
    allow_dms_from: 'all' | 'verified' | 'following',
    translator_type: 'none',
    country_code: string,
    nsfw_user: boolean,
    nsfw_admin: boolean,
    address_book_live_sync_enabled: boolean,
    universal_quality_filtering_enabled: 'enabled' | 'disabled',
    dm_receipt_setting: 'all_enabled' | 'all_disabled',
    alt_text_compose_enabled: null,
    mention_filter: 'unfiltered',
    protect_password_reset: boolean,
    require_password_login: boolean,
    requires_login_verification: boolean,
    dm_quality_filter: 'enabled' | 'disabled',
    autoplay_disabled: boolean,
    settings_metadata: {
        is_eu: 'true' | 'false'
    }
}

export interface _MutedWord {
    keyword: string,
    id: string,
    valid_from: string | null,
    valid_until: string | null,
    created_at: string,
    mute_surfaces: ('home_timeline' | 'tweet_replies' | 'notifications')[],
    mute_options: ('exclude_following_accounts')[]
}
