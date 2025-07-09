import { type Endpoint, gql, v11 } from './utils';
import { entries, formatEntries, formatList, formatListEntries, formatListModuleEntries, formatMediaEntries, formatNotificationEntries, formatNotificationTweetEntries, formatSettings, formatTypeahead, formatUnread, formatUser, formatUserEntries, formatUserLegacy } from './formatter';

import type { Result } from './types';
import type { _AccountSettings } from './types/raw/account';
import type { _ListDelete, _ListUpdate, _TopicFollowOrNotInterested, _TweetBookmark, _TweetCreate, _TweetDelete, _TweetHide, _TweetLike, _TweetMute, _TweetPin, _TweetRetweet, _TweetUnbookmark, _TweetUnbookmarkAll, _TweetUnhide, _TweetUnlike, _TweetUnpin, _TweetUnretweet, _UserForceUnfollow } from './types/raw/results';
import type { _Typeahead } from './types/raw/search';
import type { _UnreadCount } from './types/raw/notifications';
import type { _User } from './types/raw/user';
import type { _BookmarksWrapper, _HomeTimelineWrapper, _ListManagementWrapper, _ListSubscribersWrapper, _ListTweetsWrapper, _ListUsersWrapper, _ListWrapper, _NotificationsTweetsWrapper, _NotificationsWrapper, _SearchTimelineWrapper, _TweetHiddenRepliesWrapper, _TweetLikesWrapper, _TweetRetweetsWrapper, _TweetWrapper, _UserFollowersWrapper, _UserFriendsFollowingWrapper, _UserLikesWrapper, _UserListsWrapper, _UserMediaWrapper, _UsersByIdsWrapper, _UserTweetsWrapper, _UserWrapper, Data } from './types/raw/wrappers';

export const PUBLIC_TOKEN = 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';
export const OAUTH_KEY = 'Bearer AAAAAAAAAAAAAAAAAAAAAG5LOQEAAAAAbEKsIYYIhrfOQqm4H8u7xcahRkU%3Dz98HKmzbeXdKqBfUDmElcqYl0cmmKY9KdS2UoNIz3Phapgsowi';

const GET = 'get';
const POST = 'post';

const CONTENT_TYPE_FORM = { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' };

const optional = <T>(value: T): T | undefined => value;

export const endpoints = {
    // account
    account_verify_credentials: {
        url: v11('account/verify_credentials.json'),
        method: GET,
        headers: { authorization: OAUTH_KEY },
        parser: (data: _User['legacy']) => formatUserLegacy(data)
    },
    account_multi_switch: {
        url: v11('account/multi/switch.json'),
        method: POST,
        params: { user_id: String() },
        static: {
            form: 'user_id={}'
        },
        headers: { authorization: OAUTH_KEY, ...CONTENT_TYPE_FORM },
        parser: (data: _User['legacy']) => formatUserLegacy(data)
    },
    account_multi_list: {
        url: v11('account/multi/list.json'),
        method: GET,
        headers: { authorization: OAUTH_KEY },
        parser: (data: _UserFriendsFollowingWrapper) => data.users.map(formatUserLegacy)
    },
    account_update_profile: {
        url: v11('account/update_profile.json'),
        method: POST,
        params: { birthdate_day: Number(), birthdate_month: Number(), birthdate_year: Number(), birthdate_visibility: String() as 'self', birthdate_year_visibility: String() as 'self', name: String(), description: String(), location: String() },
        static: {
            form: 'birthdate_day={}&birthdate_month={}&birthdate_year={}&birthdate_visibility={}&birthdate_year_visibility={}&displayNameMaxLength=50&name={}&description={}&location={}'
        },
        headers: { authorization: OAUTH_KEY },
        parser: (data: _User['legacy']): Result => ({ result: !!data.id_str })
    },
    account_settings: {
        url: v11('account/settings.json'),
        method: GET,
        headers: { authorization: OAUTH_KEY },
        parser: (data: _AccountSettings) => formatSettings(data)
    },



    // birdwatch
    // TODO



    // bookmarks
    Bookmarks: {
        url: gql('3OjEFzT2VjX-X7w4KYBJRg/Bookmarks'),
        method: GET,
        params: { cursor: optional(String()) },
        static: {
            variables: {"count":50,"includePromotedContent":false},
            features: {"graphql_timeline_v2_bookmark_timeline":true,"blue_business_profile_image_shape_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"tweetypie_unmention_optimization_enabled":true,"vibe_api_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":false,"interactive_text_enabled":true,"responsive_web_text_conversations_enabled":false,"longform_notetweets_rich_text_read_enabled":true,"responsive_web_enhance_cards_enabled":false}
        },
        parser: (data: Data<_BookmarksWrapper>) => formatEntries(entries(data.data.bookmark_timeline_v2.timeline.instructions))
    },
    CreateBookmark: {
        url: gql('aoDbu3RHznuiSkQ9aNM67Q/CreateBookmark'),
        method: POST,
        params: { tweet_id: String() },
        parser: (data: _TweetBookmark): Result => ({ result: data.data.tweet_bookmark_put === 'Done' })
    },
    DeleteBookmark: {
        url: gql('Wlmlj2-xzyS1GN3a6cj-mQ/DeleteBookmark'),
        method: POST,
        params: { tweet_id: String() },
        parser: (data: _TweetUnbookmark): Result => ({ result: data.data.tweet_bookmark_delete === 'Done' })
    },
    BookmarksAllDelete: {
        url: gql('skiACZKC1GDYli-M8RzEPQ/BookmarksAllDelete'),
        method: POST,
        parser: (data: _TweetUnbookmarkAll): Result => ({ result: data.data.bookmark_all_delete === 'Done' })
    },



    // dms
    // TODO



    // explore
    // TODO



    // list
    ListByRestId: {
        url: gql('vxx-Y8zadpAP64HHiw4hMQ/ListByRestId'),
        method: GET,
        params: { listId: String() },
        static: {
            variables: {"withSuperFollowsUserFields":true},
            features: {"responsive_web_graphql_timeline_navigation_enabled":false}
        },
        parser: (data: Data<_ListWrapper>) => formatList(data.data.list)
    },
    ListsManagementPageTimeline: {
        url: gql('cl2dF-zeGiLvZDsMGZhL4g/ListsManagementPageTimeline'),
        method: GET,
        static: {
            variables: {"count":100,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true},
            features: {"responsive_web_graphql_timeline_navigation_enabled":false,"unified_cards_ad_metadata_container_dynamic_card_content_query_enabled":false,"dont_mention_me_view_api_enabled":true,"responsive_web_uc_gql_enabled":true,"vibe_api_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":false,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":false,"interactive_text_enabled":true,"responsive_web_text_conversations_enabled":false,"responsive_web_enhance_cards_enabled":true}
        },
        parser: (data: Data<_ListManagementWrapper>) => formatListModuleEntries(entries(data.data.viewer.list_management_timeline.timeline.instructions))
    },
    ListLatestTweetsTimeline: {
        url: gql('2Vjeyo_L0nizAUhHe3fKyA/ListLatestTweetsTimeline'),
        method: GET,
        params: { listId: String(), cursor: optional(String()) },
        static: {
            variables: {"count":40},
            features: {"rweb_lists_timeline_redesign_enabled":false,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":false,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_media_download_video_enabled":false,"responsive_web_enhance_cards_enabled":false}
        },
        parser: (data: Data<_ListTweetsWrapper>) => formatEntries(entries(data.data.list.tweets_timeline.timeline.instructions))
    },
    ListMembers: {
        url: gql('sXFXEmtFr3nLyG1dmS81jw/ListMembers'),
        method: GET,
        params: { listId: String(), cursor: optional(String()) },
        static: {
            variables: {"count":20,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true,"withSafetyModeUserFields":true},
            features: {"responsive_web_graphql_timeline_navigation_enabled":false,"unified_cards_ad_metadata_container_dynamic_card_content_query_enabled":false,"dont_mention_me_view_api_enabled":true,"responsive_web_uc_gql_enabled":true,"vibe_api_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":false,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":false,"interactive_text_enabled":true,"responsive_web_text_conversations_enabled":false,"responsive_web_enhance_cards_enabled":true}
        },
        parser: (data: Data<_ListUsersWrapper>) => formatUserEntries(entries(data.data.list.members_timeline.timeline.instructions))
    },
    ListSubscribers: {
        url: gql('LxXoouvfd5E8PXsdrQ0iMg/ListSubscribers'),
        method: GET,
        params: { listId: String(), cursor: optional(String()) },
        static: {
            variables: {"count":20,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true,"withSafetyModeUserFields":true},
            features: {"responsive_web_graphql_timeline_navigation_enabled":false,"unified_cards_ad_metadata_container_dynamic_card_content_query_enabled":false,"dont_mention_me_view_api_enabled":true,"responsive_web_uc_gql_enabled":true,"vibe_api_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":false,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":false,"interactive_text_enabled":true,"responsive_web_text_conversations_enabled":false,"responsive_web_enhance_cards_enabled":true}
        },
        parser: (data: Data<_ListSubscribersWrapper>) => formatUserEntries(entries(data.data.list.subscribers_timeline.timeline.instructions))
    },
    ListSubscribe: {
        url: gql('nymTz5ek0FQPC3kh63Tp1w/ListSubscribe'),
        method: POST,
        params: { listId: String() },
        static: {
            variables: {"withSuperFollowsUserFields":true},
            features: {"responsive_web_graphql_timeline_navigation_enabled":false}
        },
        parser: (data: any): Result => ({ result: !!data.data.list_subscribe_v2.id_str })
    },
    ListUnsubscribe: {
        url: gql('Wi5-aG4bvTmdjyRyRGkyhA/ListUnsubscribe'),
        method: POST,
        params: { listId: String() },
        static: {
            variables: {"withSuperFollowsUserFields":true},
            features: {"responsive_web_graphql_timeline_navigation_enabled":false}
        },
        parser: (data: _ListUpdate): Result => ({ result: !!data.data.list.id_str })
    },
    CreateList: {
        url: gql('x5aSMDodNU02VT1VRyW48A/CreateList'),
        method: POST,
        params: { name: String(), description: String(), isPrivate: Boolean() },
        static: {
            variables: {"withSuperFollowsUserFields":true},
            features: {"responsive_web_graphql_timeline_navigation_enabled":false}
        },
        parser: (data: _ListUpdate): Result => ({ result: !!data.data.list.id_str })
    },
    UpdateList: {
        url: gql('P9YDuvCt6ogRf-kyr5E5xw/UpdateList'),
        method: POST,
        params: { listId: String(), name: String(), description: String(), isPrivate: Boolean() },
        static: {
            variables: {"withSuperFollowsUserFields":true},
            features: {"responsive_web_graphql_timeline_navigation_enabled":false}
        },
        parser: (data: _ListUpdate): Result => ({ result: !!data.data.list.id_str })
    },
    DeleteList: {
        url: gql('UnN9Th1BDbeLjpgjGSpL3Q/DeleteList'),
        method: POST,
        params: { listId: String() },
        parser: (data: _ListDelete): Result => ({ result: data.data.list_delete === 'Done' })
    },
    ListAddMember: {
        url: gql('RKtQuzpcy2gym71UorWg6g/ListAddMember'),
        method: POST,
        params: { listId: String(), userId: String() },
        static: {
            variables: {"withSuperFollowsUserFields":true},
            features: {"responsive_web_graphql_timeline_navigation_enabled":false}
        },
        parser: (data: _ListUpdate): Result => ({ result: !!data.data.list.id_str })
    },
    ListRemoveMember: {
        url: gql('mDlp1UvnnALC_EzybKAMtA/ListRemoveMember'),
        method: POST,
        params: { listId: String(), userId: String() },
        static: {
            variables: {"withSuperFollowsUserFields":true},
            features: {"responsive_web_graphql_timeline_navigation_enabled":false}
        },
        parser: (data: _ListUpdate): Result => ({ result: !!data.data.list.id_str })
    },
    ListOwnerships: {
        url: gql('6E69fsenLDPDcprqtogzdw/ListOwnerships'),
        method: GET,
        params: { userId: String(), isListMemberTargetUserId: String() },
        static: {
            variables: {"count":100,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true},
            features: {"responsive_web_graphql_timeline_navigation_enabled":false,"unified_cards_ad_metadata_container_dynamic_card_content_query_enabled":false,"dont_mention_me_view_api_enabled":true,"responsive_web_uc_gql_enabled":true,"vibe_api_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":false,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":false,"interactive_text_enabled":true,"responsive_web_text_conversations_enabled":false,"responsive_web_enhance_cards_enabled":true}
        },
        parser: (data: unknown) => data // TODO
    },



    // notifications
    NotificationsTimeline: {
        url: gql('xds00fmkr7ZucQHr6GFwEQ/NotificationsTimeline'),
        method: GET,
        params: { timeline_type: String() as 'All' | 'Verified' | 'Mentions', cursor: optional(String()) },
        static: {
            variables: {"count":40},
            features: {"rweb_video_screen_enabled":false,"payments_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":true,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":false,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_enhance_cards_enabled":false}
        },
        parser: (data: _NotificationsWrapper) => formatNotificationEntries(entries(data.viewer_v2.user_results.result.notification_timeline.timeline.instructions))
    },
    badge_count: {
        url: 'https://twitter.com/i/api/2/badge_count/badge_count.json?supports_ntab_urt=1',
        method: GET,
        parser: (data: _UnreadCount) => formatUnread(data)
    },
    // notifications_all: {
    //     url: 'https://twitter.com/i/api/2/notifications/all.json',
    //     method: GET,
    //     params: { cursor: optional(String()) },
    //     static: {
    //         form: 'cursor={}&include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&include_ext_has_nft_avatar=1&include_ext_is_blue_verified=1&include_ext_verified_type=1&include_ext_profile_image_shape=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_ext_alt_text=true&include_ext_limited_action_results=true&include_quote_count=true&include_reply_count=1&tweet_mode=extended&include_ext_views=true&include_entities=true&include_user_entities=true&include_ext_media_color=true&include_ext_media_availability=true&include_ext_sensitive_media_warning=true&include_ext_trusted_friends_metadata=true&send_error_codes=true&simple_quoted_tweet=true&count=20&requestContext=launch&ext=mediaStats%2ChighlightedLabel%2ChasNftAvatar%2CvoiceInfo%2CbirdwatchPivot%2CsuperFollowMetadata%2CunmentionInfo%2CeditControl'
    //     },
    //     parser: (data: any) => data
    // },
    // notifications_mentions: {
    //     url: 'https://twitter.com/i/api/2/notifications/mentions.json',
    //     method: GET,
    //     params: { cursor: optional(String()) },
    //     static: {
    //         form: 'cursor={}&include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&include_ext_has_nft_avatar=1&include_ext_is_blue_verified=1&include_ext_verified_type=1&include_ext_profile_image_shape=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_ext_alt_text=true&include_ext_limited_action_results=true&include_quote_count=true&include_reply_count=1&tweet_mode=extended&include_ext_views=true&include_entities=true&include_user_entities=true&include_ext_media_color=true&include_ext_media_availability=true&include_ext_sensitive_media_warning=true&include_ext_trusted_friends_metadata=true&send_error_codes=true&simple_quoted_tweet=true&count=20&requestContext=launch&ext=mediaStats%2ChighlightedLabel%2ChasNftAvatar%2CvoiceInfo%2CbirdwatchPivot%2CsuperFollowMetadata%2CunmentionInfo%2CeditControl'
    //     },
    //     parser: (data: any) => data
    // },
    // notifications_all_last_seen_cursor: {
    //     url: 'https://twitter.com/i/api/2/notifications/all/last_seen_cursor.json',
    //     method: POST,
    //     params: { cursor: optional(String()) },
    //     static: {
    //         form: 'cursor={}'
    //     },
    //     headers: CONTENT_TYPE_FORM,
    //     parser: (data: unknown) => data
    // },
    notifications_device_follow: {
        url: 'https://twitter.com/i/api/2/notifications/device_follow.json',
        method: GET,
        params: { cursor: optional(String()) },
        static: {
            form: 'cursor={}&include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&include_ext_has_nft_avatar=1&include_ext_is_blue_verified=1&include_ext_verified_type=1&include_ext_profile_image_shape=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_ext_alt_text=true&include_ext_limited_action_results=true&include_quote_count=true&include_reply_count=1&tweet_mode=extended&include_ext_views=true&include_entities=true&include_user_entities=true&include_ext_media_color=true&include_ext_media_availability=true&include_ext_sensitive_media_warning=true&include_ext_trusted_friends_metadata=true&send_error_codes=true&simple_quoted_tweet=true&count=20&requestContext=launch&ext=mediaStats%2ChighlightedLabel%2ChasNftAvatar%2CvoiceInfo%2CbirdwatchPivot%2CsuperFollowMetadata%2CunmentionInfo%2CeditControl'
        },
        parser: (data: _NotificationsTweetsWrapper) => formatNotificationTweetEntries(entries(data.timeline.instructions), data.globalObjects)
    },



    // search
    /** to check quote tweets: `{ rawQuery: 'quoted_tweet_id:<rest_id>', querySource: 'tdqt'`, product: 'Top' }` */
    SearchTimeline: {
        url: gql('TQmyZ_haUqANuyBcFBLkUw/SearchTimeline'),
        method: GET,
        params: { rawQuery: String(), querySource: String() as 'typed_query' | 'recent_search_click' | 'tdqt', product: String() as 'Top' | 'Latest' | 'People' | 'Media' | 'Lists', cursor: optional(String()) },
        static: {
            variables: {"count":40},
            features: {"rweb_tipjar_consumption_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"articles_preview_enabled":true,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"rweb_video_timestamps_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_enhance_cards_enabled":false}
        },
        // @ts-ignore
        // TODO
        parser: (data: Data<_SearchTimelineWrapper>) => formatEntries(entries(data.data.search_by_raw_query.search_timeline.timeline.instructions))
    },
    search_typeahead: {
        url: v11('search/typeahead.json'),
        method: GET,
        params: { q: String() },
        static: {
            form: 'q={}&include_can_dm=1&count=10&prefetch=false&cards_platform=Web-13&include_entities=1&include_user_entities=1&include_cards=1&send_error_codes=1&tweet_mode=extended&include_ext_alt_text=true&include_reply_count=true&ext=views%2CmediaStats%2CverifiedType%2CisBlueVerified'
        },
        parser: (data: _Typeahead) => formatTypeahead(data)
    },



    // timeline
    HomeLatestTimeline: {
        url: gql('U0cdisy7QFIoTfu3-Okw0A/HomeLatestTimeline'),
        method: GET,
        params: { cursor: optional(String()) },
        static: {
            variables: {"count":20,"includePromotedContent":false,"latestControlAvailable":true,"requestContext":"launch","withCommunity":true},
            features: {"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"c9s_tweet_anatomy_moderator_badge_enabled":true,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"rweb_video_timestamps_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_enhance_cards_enabled":false}
        },
        parser: (data: Data<_HomeTimelineWrapper>) => formatEntries(entries(data.data.home.home_timeline_urt.instructions))
    },
    HomeTimeline: {
        url: gql('k3YiLNE_MAy5J-NANLERdg/HomeTimeline'),
        method: GET,
        params: { cursor: optional(String()), seenTweetIds: optional(Array(String())) },
        static: {
            variables: {"count":20,"includePromotedContent":false,"latestControlAvailable":true,"requestContext":"launch","withCommunity":true},
            features: {"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"c9s_tweet_anatomy_moderator_badge_enabled":true,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"rweb_video_timestamps_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_enhance_cards_enabled":false}
        },
        parser: (data: Data<_HomeTimelineWrapper>) => formatEntries(entries(data.data.home.home_timeline_urt.instructions))
    },



    // topics
    TopicLandingPage: {
        url: gql('4exqISyA1-LejxLHY4RqJA/TopicLandingPage'),
        method: GET,
        params: { rest_id: String() },
        static: {
            variables: {"context":"{}","withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true},
            features: {"responsive_web_graphql_timeline_navigation_enabled":false,"unified_cards_ad_metadata_container_dynamic_card_content_query_enabled":true,"dont_mention_me_view_api_enabled":true,"responsive_web_uc_gql_enabled":true,"vibe_api_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":false,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":false,"interactive_text_enabled":true,"responsive_web_text_conversations_enabled":false,"responsive_web_enhance_cards_enabled":true}
        },
        parser: (data: unknown) => data // TODO
    },
    TopicFollow: {
        url: gql('ElqSLWFmsPL4NlZI5e1Grg/TopicFollow'),
        method: POST,
        params: { topicId: String() },
        parser: (data: _TopicFollowOrNotInterested): Result => ({ result: !!data.data.topic.id })
    },
    TopicUnfollow: {
        url: gql('srwjU6JM_ZKTj_QMfUGNcw/TopicUnfollow'),
        method: POST,
        params: { topicId: String() },
        parser: (data: _TopicFollowOrNotInterested): Result => ({ result: !!data.data.topic.id })
    },
    TopicNotInterested: {
        url: gql('cPCFdDAaqRjlMRYInZzoDA/TopicNotInterested'),
        method: POST,
        params: { topicId: String() },
        parser: (data: _TopicFollowOrNotInterested): Result => ({ result: !!data.data.topic.id })
    },
    TopicUndoNotInterested: {
        url: gql('4tVnt6FoSxaX8L-mDDJo4Q/TopicUndoNotInterested'),
        method: POST,
        params: { topicId: String() },
        parser: (data: _TopicFollowOrNotInterested): Result => ({ result: !!data.data.topic.id })
    },



    // tweets
    CreateTweet: {
        url: gql('I_J3_LvnnihD0Gjbq5pD2g/CreateTweet'),
        method: POST,
        params: { tweet_text: String(), /* TODO media */ },
        static: {
            variables: {"media":{"media_entities":[],"possibly_sensitive": false},"semantic_annotation_ids":[],"dark_request":false},
            features: {"c9s_tweet_anatomy_moderator_badge_enabled":true,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":false,"tweet_awards_web_tipping_enabled":false,"responsive_web_home_pinned_timelines_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"responsive_web_media_download_video_enabled":false,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_enhance_cards_enabled":false}
        },
        parser: (data: _TweetCreate): Result => ({ result: !!data.data.create_tweet.tweet_results.result.rest_id })
    },
    CreateScheduledTweet: {
        url: gql('LCVzRQGxOaGnOnYH01NQXg/CreateScheduledTweet'),
        method: POST,
        params: { tweet_text: String(), /* TODO media */ },
        static: {
            variables: {"media":{"media_entities":[],"possibly_sensitive": false},"semantic_annotation_ids":[],"dark_request":false},
            features: {"c9s_tweet_anatomy_moderator_badge_enabled":true,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":false,"tweet_awards_web_tipping_enabled":false,"responsive_web_home_pinned_timelines_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"responsive_web_media_download_video_enabled":false,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_enhance_cards_enabled":false}
        },
        parser: (data: _TweetCreate): Result => ({ result: !!data.data.create_tweet.tweet_results.result.rest_id })
    },
    DeleteTweet: {
        url: gql('VaenaVgh5q5ih7kvyVjgtg/DeleteTweet'),
        method: POST,
        params: { tweet_id: String() },
        static: {
            variables: {"dark_request":false}
        },
        parser: (data: _TweetDelete): Result => ({ result: data.data.delete_tweet.tweet_results !== undefined })
    },
    TweetDetail: {
        url: gql('KwGBbJZc6DBx8EKmyQSP7g/TweetDetail'),
        method: GET,
        params: { focalTweetId: String(), cursor: optional(String()) },
        static: {
            variables: {"with_rux_injections":false,"includePromotedContent":false,"withCommunity":true,"withQuickPromoteEligibilityTweetFields":true,"withBirdwatchNotes":true,"withVoice":true,"withV2Timeline":true},
            features: {"rweb_lists_timeline_redesign_enabled":false,"blue_business_profile_image_shape_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"tweetypie_unmention_optimization_enabled":true,"vibe_api_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":false,"interactive_text_enabled":true,"responsive_web_text_conversations_enabled":false,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":false,"responsive_web_enhance_cards_enabled":false}
        },
        parser: (data: Data<_TweetWrapper>) => formatEntries(entries(data.data.threaded_conversation_with_injections_v2.instructions))
    },
    ModeratedTimeline: {
        url: gql('SiKS1_3937rb72ytFnDHmA/ModeratedTimeline'),
        method: GET,
        params: { rootTweetId: String(), cursor: optional(String()) },
        static: {
            variables: {"includePromotedContent":false},
            features: {"rweb_lists_timeline_redesign_enabled":false,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":false,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_media_download_video_enabled":false,"responsive_web_enhance_cards_enabled":false}
        },
        parser: (data: Data<_TweetHiddenRepliesWrapper>) => formatEntries(entries(data.data.tweet.result.timeline_response.timeline.instructions))
    },
    Favoriters: {
        url: gql('RMoTahkos95Jcdw-UWlZog/Favoriters'),
        method: GET,
        params: { tweetId: String(), cursor: optional(String()) },
        static: {
            variables: {"count":20,"includePromotedContent":false,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true,"withClientEventToken":false,"withBirdwatchNotes":false,"withVoice":true,"withV2Timeline":true},
            features: {"dont_mention_me_view_api_enabled":true,"interactive_text_enabled":true,"responsive_web_uc_gql_enabled":false,"vibe_tweet_context_enabled":false,"responsive_web_edit_tweet_api_enabled":false,"standardized_nudges_misinfo":false,"responsive_web_enhance_cards_enabled":false}
        },
        parser: (data: Data<_TweetLikesWrapper>) => formatUserEntries(entries(data.data.favoriters_timeline.timeline.instructions))
    },
    Retweeters: {
        url: gql('qVWT1Tn1FiklyVDqYiOhLg/Retweeters'),
        method: GET,
        params: { tweetId: String(), cursor: optional(String()) },
        static: {
            variables: {"count":20,"includePromotedContent":false,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true,"withClientEventToken":false,"withBirdwatchNotes":false,"withVoice":true,"withV2Timeline":true},
            features: {"dont_mention_me_view_api_enabled":true,"interactive_text_enabled":true,"responsive_web_uc_gql_enabled":false,"vibe_tweet_context_enabled":false,"responsive_web_edit_tweet_api_enabled":false,"standardized_nudges_misinfo":false,"responsive_web_enhance_cards_enabled":false}
        },
        parser: (data: Data<_TweetRetweetsWrapper>) => formatUserEntries(entries(data.data.retweeters_timeline.timeline.instructions))
    },
    FavoriteTweet: {
        url: gql('lI07N6Otwv1PhnEgXILM7A/FavoriteTweet'),
        method: POST,
        params: { tweet_id: String() },
        parser: (data: _TweetLike): Result => ({ result: data.data.favorite_tweet === 'Done' })
    },
    UnfavoriteTweet: {
        url: gql('ZYKSe-w7KEslx3JhSIk5LA/UnfavoriteTweet'),
        method: POST,
        params: { tweet_id: String() },
        parser: (data: _TweetUnlike): Result => ({ result: data.data.unfavorite_tweet === 'Done' })
    },
    CreateRetweet: {
        url: gql('ojPdsZsimiJrUGLR1sjUtA/CreateRetweet'),
        method: POST,
        params: { tweet_id: String() },
        static: {
            variables: {"dark_request":false}
        },
        parser: (data: _TweetRetweet): Result => ({ result: !!data.data.create_retweet.retweet_results.result.rest_id })
    },
    DeleteRetweet: {
        url: gql('iQtK4dl5hBmXewYZuEOKVw/DeleteRetweet'),
        method: POST,
        params: { source_tweet_id: String() },
        static: {
            variables: {"dark_request":false}
        },
        parser: (data: _TweetUnretweet): Result => ({ result: !!data.data.unretweet.source_tweet_results.result.rest_id })
    },
    ModerateTweet: {
        url: gql('pjFnHGVqCjTcZol0xcBJjw/ModerateTweet'),
        method: POST,
        params: { tweetId: String() },
        parser: (data: _TweetHide): Result => ({ result: data.data.tweet_moderate_put === 'Done' })
    },
    UnmoderateTweet: {
        url: gql('pVSyu6PA57TLvIE4nN2tsA/UnmoderateTweet'),
        method: POST,
        params: { tweetId: String() },
        parser: (data: _TweetUnhide): Result => ({ result: data.data.tweet_unmoderate_put === 'Done' })
    },
    PinTweet: {
        url: gql('VIHsNu89pK-kW35JpHq7Xw/PinTweet'),
        method: POST,
        params: { tweet_id: String() },
        parser: (data: _TweetPin): Result => ({ result: data.data.pin_tweet.message === 'post pinned successfully' })
    },
    UnpinTweet: {
        url: gql('BhKei844ypCyLYCg0nwigw/UnpinTweet'),
        method: POST,
        params: { tweet_id: String() },
        parser: (data: _TweetUnpin): Result => ({ result: data.data.unpin_tweet.message === 'post unpinned successfully' })
    },
    // TODO card stuff
    mutes_conversations_create: {
        url: v11('mutes/conversations/create.json'),
        method: POST,
        params: { tweet_id: String() },
        static: {
            form: 'tweet_id={}'
        },
        headers: CONTENT_TYPE_FORM,
        parser: (data: _TweetMute): Result => ({ result: !!data.id_str })
    },
    mutes_conversations_destroy: {
        url: v11('mutes/conversations/destroy.json'),
        method: POST,
        params: { tweet_id: String() },
        static: {
            form: 'tweet_id={}'
        },
        headers: CONTENT_TYPE_FORM,
        parser: (data: _TweetMute): Result => ({ result: !!data.id_str })
    },



    // users
    UserByScreenName: {
        url: gql('sLVLhk0bGj3MVFEKTdax1w/UserByScreenName'),
        method: GET,
        params: { screen_name: String() },
        static: {
            features: {"blue_business_profile_image_shape_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true}
        },
        parser: (data: Data<_UserWrapper>) => formatUser(data.data.user.result)
    },
    UserByRestId: {
        url: gql('GazOglcBvgLigl3ywt6b3Q/UserByRestId'),
        method: GET,
        params: { userId: String() },
        static: {
            features: {"blue_business_profile_image_shape_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true}
        },
        parser: (data: Data<_UserWrapper>) => formatUser(data.data.user.result)
    },
    UsersByRestIds: {
        url: gql('OJBgJQIrij6e3cjqQ3Zu1Q/UsersByRestIds'),
        method: GET,
        params: { userIds: Array(String()) },
        static: {
            features: {"blue_business_profile_image_shape_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true}
        },
        parser: (data: Data<_UsersByIdsWrapper>) => data.data.users.map(user => formatUser(user.result))
    },
    UserTweets: {
        url: gql('VgitpdpNZ-RUIp5D1Z_D-A/UserTweets'),
        method: GET,
        params: { userId: String(), cursor: optional(String()) },
        static: {
            variables: {"count":20,"includePromotedContent":true,"withCommunity":true,"withVoice":true,"withV2Timeline":true},
            features: {"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"responsive_web_home_pinned_timelines_enabled":true,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"c9s_tweet_anatomy_moderator_badge_enabled":true,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":false,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_media_download_video_enabled":false,"responsive_web_enhance_cards_enabled":false}
        },
        parser: (data: Data<_UserTweetsWrapper>) => formatEntries(entries(data.data.user.result.timeline_v2.timeline.instructions))
    },
    UserTweetsAndReplies: {
        url: gql('pz0IHaV_t7T4HJavqqqcIA/UserTweetsAndReplies'),
        method: GET,
        params: { userId: String(), cursor: optional(String()) },
        static: {
            variables: {"count":20,"includePromotedContent":true,"withCommunity":true,"withVoice":true,"withV2Timeline":true},
            features: {"rweb_video_screen_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":false,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":false,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_enhance_cards_enabled":false}
        },
        parser: (data: Data<_UserTweetsWrapper>) => formatEntries(entries(data.data.user.result.timeline_v2.timeline.instructions))
    },
    UserMedia: {
        url: gql('1dmA2m-qIsGm2XfqQtcD3A/UserMedia'),
        method: GET,
        params: { userId: String(), cursor: optional(String()) },
        static: {
            variables: {"count":20,"includePromotedContent":false,"withClientEventToken":false,"withBirdwatchNotes":false,"withVoice":true,"withV2Timeline":true},
            features: {"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"responsive_web_home_pinned_timelines_enabled":true,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"c9s_tweet_anatomy_moderator_badge_enabled":true,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":false,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_media_download_video_enabled":false,"responsive_web_enhance_cards_enabled":false}
        },
        parser: (data: Data<_UserMediaWrapper>) => formatMediaEntries(entries(data.data.user.result.timeline_v2.timeline.instructions))
    },
    Likes: {
        url: gql('vni8vUvtZvJoIsl49VPudg/Likes'),
        method: GET,
        params: { userId: String(), cursor: optional(String()) },
        static: {
            variables: {"count":50,"includePromotedContent":false,"withClientEventToken":false,"withBirdwatchNotes":false,"withVoice":true,"withV2Timeline":true},
            features: {"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"responsive_web_home_pinned_timelines_enabled":true,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"c9s_tweet_anatomy_moderator_badge_enabled":true,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":false,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_media_download_video_enabled":false,"responsive_web_enhance_cards_enabled":false}
        },
        parser: (data: Data<_UserLikesWrapper>) => formatEntries(entries(data.data.user.result.timeline_v2.timeline?.instructions || []))
    },
    Following: {
        url: gql('t-BPOrMIduGUJWO_LxcvNQ/Following'),
        method: GET,
        params: { userId: String(), cursor: optional(String()) },
        static: {
            variables: {"count":50,"includePromotedContent":false,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true,"withClientEventToken":false,"withBirdwatchNotes":false,"withVoice":true,"withV2Timeline":true},
            features: {"dont_mention_me_view_api_enabled":true,"interactive_text_enabled":true,"responsive_web_uc_gql_enabled":false,"vibe_tweet_context_enabled":false,"responsive_web_edit_tweet_api_enabled":false,"standardized_nudges_misinfo":false,"responsive_web_enhance_cards_enabled":false}
        },
        parser: (data: Data<_UserFollowersWrapper>) => formatUserEntries(entries(data.data.user.result.timeline.timeline.instructions))
    },
    Followers: {
        url: gql('fJSopkDA3UP9priyce4RgQ/Followers'),
        method: GET,
        params: { userId: String(), cursor: optional(String()) },
        static: {
            variables: {"count":50,"includePromotedContent":false,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true,"withClientEventToken":false,"withBirdwatchNotes":false,"withVoice":true,"withV2Timeline":true},
            features: {"dont_mention_me_view_api_enabled":true,"interactive_text_enabled":true,"responsive_web_uc_gql_enabled":false,"vibe_tweet_context_enabled":false,"responsive_web_edit_tweet_api_enabled":false,"standardized_nudges_misinfo":false,"responsive_web_enhance_cards_enabled":false}
        },
        parser: (data: Data<_UserFollowersWrapper>) => formatUserEntries(entries(data.data.user.result.timeline.timeline.instructions))
    },
    FollowersYouKnow: {
        url: gql('m8AXvuS9H0aAI09J3ISOrw/FollowersYouKnow'),
        method: GET,
        params: { userId: String(), cursor: optional(String()) },
        static: {
            variables: {"count":50,"includePromotedContent":false,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true,"withClientEventToken":false,"withBirdwatchNotes":false,"withVoice":true,"withV2Timeline":true},
            features: {"dont_mention_me_view_api_enabled":true,"interactive_text_enabled":true,"responsive_web_uc_gql_enabled":false,"vibe_tweet_context_enabled":false,"responsive_web_edit_tweet_api_enabled":false,"standardized_nudges_misinfo":false,"responsive_web_enhance_cards_enabled":false}
        },
        parser: (data: Data<_UserFollowersWrapper>) => formatUserEntries(entries(data.data.user.result.timeline.timeline.instructions))
    },
    CombinedLists: {
        url: gql('mLKOzzVOWUycBiExBT1gjg/CombinedLists'),
        method: GET,
        params: { userId: String(), cursor: optional(String()) },
        static: {
            variables: {"count":100,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true},
            features: {"responsive_web_graphql_timeline_navigation_enabled":false,"unified_cards_ad_metadata_container_dynamic_card_content_query_enabled":false,"dont_mention_me_view_api_enabled":true,"responsive_web_uc_gql_enabled":true,"vibe_api_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":false,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":false,"interactive_text_enabled":true,"responsive_web_text_conversations_enabled":false,"responsive_web_enhance_cards_enabled":true}
        },
        parser: (data: Data<_UserListsWrapper>) => formatListEntries(entries(data.data.user.result.timeline.timeline.instructions))
    },
    RemoveFollower: {
        url: gql('QpNfg0kpPRfjROQ_9eOLXA/RemoveFollower'),
        method: POST,
        params: { target_user_id: String() },
        parser: (data: _UserForceUnfollow): Result => ({ result: data.data.remove_follower.unfollow_success_reason === 'Unfollowed' })
    },
    friendships_create: {
        url: v11('friendships/create.json'),
        method: POST,
        params: { user_id: String() },
        static: {
            form: 'user_id={}'
        },
        headers: CONTENT_TYPE_FORM,
        parser: (data: _User['legacy']): Result => ({ result: !!data.id_str })
    },
    friendships_destroy: {
        url: v11('friendships/destroy.json'),
        method: POST,
        params: { user_id: String() },
        static: {
            form: 'user_id={}'
        },
        headers: CONTENT_TYPE_FORM,
        parser: (data: _User['legacy']): Result => ({ result: !!data.id_str })
    },
    friendships_cancel: {
        url: v11('friendships/cancel.json'),
        method: POST,
        params: { user_id: String() },
        static: {
            form: 'user_id={}'
        },
        headers: CONTENT_TYPE_FORM,
        parser: (data: _User['legacy']): Result => ({ result: !!data.id_str })
    },
    friendships_incoming: {
        url: v11('friendships/incoming.json'),
        method: GET,
        params: { screen_name: String(), cursor: Number() },
        static: {
            form: 'include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&include_ext_has_nft_avatar=1&skip_status=1&cursor={}&stringify_ids=true&count=100'
        },
        parser: (data: _UserFriendsFollowingWrapper) => data.users.map(formatUserLegacy)
    },
    friendships_accept: {
        url: v11('friendships/accept.json'),
        method: POST,
        params: { user_id: String() },
        static: {
            form: 'user_id={}'
        },
        headers: CONTENT_TYPE_FORM,
        parser: (data: _User['legacy']): Result => ({ result: !!data.id_str })
    },
    friendships_deny: {
        url: v11('friendships/deny.json'),
        method: POST,
        params: { user_id: String() },
        static: {
            form: 'user_id={}'
        },
        headers: CONTENT_TYPE_FORM,
        parser: (data: _User['legacy']): Result => ({ result: !!data.id_str })
    },
    blocks_create: {
        url: v11('blocks/create.json'),
        method: POST,
        params: { user_id: String() },
        static: {
            form: 'user_id={}'
        },
        headers: CONTENT_TYPE_FORM,
        parser: (data: _User['legacy']): Result => ({ result: !!data.id_str })
    },
    blocks_destroy: {
        url: v11('blocks/destroy.json'),
        method: POST,
        params: { user_id: String() },
        static: {
            form: 'user_id={}'
        },
        headers: CONTENT_TYPE_FORM,
        parser: (data: _User['legacy']): Result => ({ result: !!data.id_str })
    },
    mutes_users_create: {
        url: v11('mutes/users/create.json'),
        method: POST,
        params: { user_id: String() },
        static: {
            form: 'user_id={}'
        },
        headers: CONTENT_TYPE_FORM,
        parser: (data: _User['legacy']): Result => ({ result: !!data.id_str })
    },
    mutes_users_destroy: {
        url: v11('mutes/users/destroy.json'),
        method: POST,
        params: { user_id: String() },
        static: {
            form: 'user_id={}'
        },
        headers: CONTENT_TYPE_FORM,
        parser: (data: _User['legacy']): Result => ({ result: !!data.id_str })
    },
    friends_following_list: {
        url: v11('friends/following/list.json'),
        method: GET,
        params: { user_id: String() },
        static: {
            form: 'include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&include_ext_has_nft_avatar=1&skip_status=1&cursor=-1&user_id={}&count=10&with_total_count=true'
        },
        parser: (data: _UserFriendsFollowingWrapper) => data.users.map(formatUserLegacy)
    }
} satisfies Record<string, Endpoint>;
