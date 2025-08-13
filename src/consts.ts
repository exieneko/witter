import { type Endpoint, v11 } from './utils.js';
import { entries, formatBirdwatchAuthenticatedUser, formatBirdwatchContributor, formatBirdwatchTimeline, formatBirdwatchTweet, formatCard, formatCommunity, formatCommunityMembers, formatEntries, formatExplorePage, formatHashflag, formatList, formatListEntries, formatListModuleEntries, formatMediaEntries, formatMutedWord, formatNotificationEntries, formatNotificationTweetEntries, formatSearchEntries, formatSettings, formatSidebarItem, formatTypeahead, formatUnread, formatUser, formatUserEntries, formatUserLegacy } from './formatter/index.js';

import type { BirdwatchHelpfulTag, BirdwatchNotHelpfulTag, Result, User } from './types/index.js';
import type { _AccountSettings, _MutedWord } from './types/raw/account.js';
import type { _Hashflag } from './types/raw/explore.js';
import type { _ExploreTrendItem } from './types/raw/items.js';
import type { _Typeahead } from './types/raw/search.js';
import type { _UnreadCount } from './types/raw/notifications.js';
import type { _BirdwatchCreateRating, _BirdwatchDeleteRating, _BirdwatchNotificationSettingsChange, _CommunityAllowCreation, _CommunityJoin, _CommunityLeave, _CommunityPin, _CommunityUnpin, _ListDelete, _ListUpdate, _TopicFollowOrNotInterested, _TweetBookmark, _TweetConversationControlChange, _TweetConversationControlDelete, _TweetCreate, _TweetDelete, _TweetHide, _TweetLike, _TweetMute, _TweetPin, _TweetRetweet, _TweetUnbookmark, _TweetUnbookmarkAll, _TweetUnhide, _TweetUnlike, _TweetUnmention, _TweetUnpin, _TweetUnretweet, _UserForceUnfollow, _UserRelationshipUpdate } from './types/raw/results.js';
import type { _Card, _Tweet } from './types/raw/tweet.js';
import type { _User } from './types/raw/user.js';
import type { _AccountBlockedUsersWrapper, _AccountMutedUsersWrapper, _BirdwatchAuthenticatedUserWrapper, _BirdwatchContributorWrapper, _BirdwatchNotesWrapper, _BirdwatchTweetsWrapper, _BookmarksWrapper, _CommunityAboutWrapper, _CommunityExploreWrapper, _CommunityMediaWrapper, _CommunityMembersWrapper, _CommunityModeratorsWrapper, _CommunitySearchWrapper, _CommunityTweetsWrapper, _CommunityWrapper, _ExploreTrendingWrapper, _ExploreWrapper, _GenericTimelineWrapper, _HomeTimelineWrapper, _ListManagementWrapper, _ListSubscribersWrapper, _ListTweetsWrapper, _ListUsersWrapper, _ListWrapper, _NotificationsTweetsWrapper, _NotificationsWrapper, _SearchTimelineWrapper, _SidebarUserRecommendationsWrapper, _TweetHiddenRepliesWrapper, _TweetLikesWrapper, _TweetRetweetsWrapper, _TweetWrapper, _UserFollowersWrapper, _UserFriendsFollowingWrapper, _UserLikesWrapper, _UserListsWrapper, _UserMediaWrapper, _UsersByIdsWrapper, _UserTweetsWrapper, _UserWrapper, Data } from './types/raw/wrappers.js';

export const PUBLIC_TOKEN = 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';
export const OAUTH_KEY = 'Bearer AAAAAAAAAAAAAAAAAAAAAG5LOQEAAAAAbEKsIYYIhrfOQqm4H8u7xcahRkU%3Dz98HKmzbeXdKqBfUDmElcqYl0cmmKY9KdS2UoNIz3Phapgsowi';

const GET = 'get';
const POST = 'post';

const optional = <T>(value: T): T | undefined => value;

export const endpoints = {
    GenericTimelineById: {
        url: ['LZfAdxTdNolKXw6ZkoY_kA', 'GenericTimelineById'],
        method: GET,
        params: { timelineId: String() },
        variables: {"count":20,"withQuickPromoteEligibilityTweetFields":true},
        features: {"rweb_video_screen_enabled":false,"payments_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"verified_phone_label_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":true,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":false,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_grok_community_note_auto_translation_is_enabled":false,"responsive_web_enhance_cards_enabled":false,"interactive_text_enabled":true,"responsive_web_text_conversations_enabled":true,"vibe_api_enabled":true,"tweetypie_unmention_optimization_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"blue_business_profile_image_shape_enabled":true},
        parser: (data: Data<_GenericTimelineWrapper<any>>) => entries(data.data.timeline.timeline.instructions)
    },



    // account
    BlockedAccountsAll: {
        url: ['h52d1F7dumWGE1tJAhQBpg', 'BlockedAccountsAll'],
        method: GET,
        params: { cursor: optional(String()) },
        variables: {"count":20,"includePromotedContent":false},
        features: {"rweb_video_screen_enabled":false,"payments_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":true,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":false,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_grok_community_note_auto_translation_is_enabled":false,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_AccountBlockedUsersWrapper>) => formatUserEntries(entries(data.data.viewer.timeline.timeline.instructions))
    },
    MutedAccounts: {
        url: ['-G9eXTmseyiSenbqjrEG6w', 'MutedAccounts'],
        method: GET,
        params: { cursor: optional(String()) },
        variables: {"count":20,"includePromotedContent":false},
        features: {"rweb_video_screen_enabled":false,"payments_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":true,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":false,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_grok_community_note_auto_translation_is_enabled":false,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_AccountMutedUsersWrapper>) => formatUserEntries(entries(data.data.viewer.muting_timeline.timeline.instructions))
    },
    account_verify_credentials: {
        url: v11('account/verify_credentials.json'),
        method: GET,
        useOauthKey: true,
        parser: (data: _User['legacy']) => formatUserLegacy(data)
    },
    account_multi_switch: {
        url: v11('account/multi/switch.json'),
        method: POST,
        params: { user_id: String() },
        body: '{user_id}',
        useOauthKey: true,
        parser: (data: _User['legacy']) => formatUserLegacy(data)
    },
    account_multi_list: {
        url: v11('account/multi/list.json'),
        method: GET,
        useOauthKey: true,
        parser: (data: _UserFriendsFollowingWrapper) => data.users.map(formatUserLegacy)
    },
    account_update_profile: {
        url: v11('account/update_profile.json'),
        method: POST,
        params: { birthdate_day: Number(), birthdate_month: Number(), birthdate_year: Number(), birthdate_visibility: String() as 'self', birthdate_year_visibility: String() as 'self', name: String(), description: String(), location: String() },
        body: 'birthdate_day={}&birthdate_month={}&birthdate_year={}&birthdate_visibility={}&birthdate_year_visibility={}&displayNameMaxLength=50&name={}&description={}&location={}',
        useOauthKey: true,
        parser: (data: _User['legacy']): Result => ({ result: !!data.id_str })
    },
    account_settings: {
        url: v11('account/settings.json'),
        method: GET,
        useOauthKey: true,
        parser: (data: _AccountSettings) => formatSettings(data)
    },
    mutes_keywords_list: {
        url: v11('mutes/keywords/list.json'),
        method: GET,
        useOauthKey: true,
        parser: (data: { muted_keywords: _MutedWord[] }) => data.muted_keywords.map(formatMutedWord)
    },
    mutes_keywords_create: {
        url: v11('mutes/keywords/create.json'),
        method: POST,
        params: { keyword: String(), mute_surfaces: String(), mute_options: String(), duration: String() },
        body: 'keyword={}&mute_surfaces={}&mute_options={}&duration={}',
        useOauthKey: true,
        parser: (data: { muted_keywords: _MutedWord[] }) => data.muted_keywords.map(formatMutedWord)
    },
    mutes_keywords_destroy: {
        url: v11('mutes/keywords/destroy.json'),
        method: POST,
        params: { ids: String() },
        body: 'ids={}',
        useOauthKey: true,
        parser: (data: { muted_keywords: _MutedWord[] }) => data.muted_keywords.map(formatMutedWord)
    },



    // birdwatch
    BirdwatchFetchGlobalTimeline: {
        url: ['L3LftPt6fhYqoQ5Vnxm7UQ', 'BirdwatchFetchGlobalTimeline'],
        method: GET,
        params: { cursor: optional(String()) },
        features: {"graphql_timeline_v2_bookmark_timeline":true,"blue_business_profile_image_shape_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"tweetypie_unmention_optimization_enabled":true,"vibe_api_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":false,"interactive_text_enabled":true,"responsive_web_text_conversations_enabled":false,"longform_notetweets_rich_text_read_enabled":true,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_BirdwatchTweetsWrapper>) => formatBirdwatchTimeline(entries(data.data.viewer.birdwatch_home_page.body.initialTimeline.timeline.timeline.instructions), data.data.viewer.birdwatch_home_page.body.timelines)
    },
    BirdwatchFetchBirdwatchProfile: {
        url: ['id9iGfEQF47W1kvRBHUmRQ', 'BirdwatchFetchBirdwatchProfile'],
        method: GET,
        params: { alias: String() },
        features: {"responsive_web_birdwatch_top_contributor_enabled":true},
        parser: (data: Data<_BirdwatchContributorWrapper>) => formatBirdwatchContributor(data.data.birdwatch_profile_by_alias)
    },
    BirdwatchFetchAuthenticatedUserProfile: {
        url: ['kD74-qBfrdRT5rO9YOl57g', 'BirdwatchFetchAuthenticatedUserProfile'],
        method: GET,
        features: {"responsive_web_birdwatch_top_contributor_enabled":true,"responsive_web_birdwatch_mobile_nav_setting_enabled":false,"responsive_web_birdwatch_note_limit_enabled":true},
        parser: (data: Data<_BirdwatchAuthenticatedUserWrapper>) => formatBirdwatchAuthenticatedUser(data.data.authenticated_user_birdwatch_profile)
    },
    BirdwatchFetchNotes: {
        url: ['2YbknhtutZWw5C5h2wDooA', 'BirdwatchFetchNotes'],
        method: GET,
        params: { tweet_id: String() },
        features: {"responsive_web_birdwatch_enforce_author_user_quotas":true,"responsive_web_birdwatch_media_notes_enabled":true,"responsive_web_birdwatch_url_notes_enabled":true,"responsive_web_grok_community_note_translation_is_enabled":false,"responsive_web_birdwatch_fast_notes_badge_enabled":true,"responsive_web_grok_community_note_auto_translation_is_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true,"payments_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"verified_phone_label_enabled":false,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false},
        // @ts-ignore
        parser: (data: Data<_BirdwatchNotesWrapper>) => formatBirdwatchTweet(Object.hasOwn(data.data.tweet_result_by_rest_id.result, 'tweet') ? data.data.tweet_result_by_rest_id.result.tweet : data.data.tweet_result_by_rest_id.result)
    },
    BirdwatchEditNotificationSettings: {
        url: ['FLgLReVIssXjB_ui3wcrRQ', 'BirdwatchEditNotificationSettings'],
        method: POST,
        params: { settings: String() as 'All' | 'Week' | 'Month' | 'Never' },
        parser: (data: _BirdwatchNotificationSettingsChange): Result => ({ result: data.data.authenticated_user_birdwatch_profile_set_notification_settings_put === 'Done' })
    },
    BirdwatchCreateRating: {
        url: ['e3UGQnUm1M3BSDUgUt4oHA', 'BirdwatchCreateRating'],
        method: POST,
        params: { data_v2: Object() as { helpfulness_level: 'Helpful' | 'NotHelpful' | 'SomewhatHelpful', helpful_tags?: BirdwatchHelpfulTag[], not_helpful_tags?: BirdwatchNotHelpfulTag[], note_match?: { all_media_note_match: boolean } }, note_id: String(), tweet_id: String() },
        variables: {"rating_source":"BirdwatchForYouTimeline","source_platform":"BirdwatchWeb"},
        parser: (data: _BirdwatchCreateRating): Result => ({ result: data.data.birdwatchnote_rate_v3.__typename === 'BirdwatchNoteRating' })
    },
    BirdwatchDeleteRating: {
        url: ['OpvCOyOoQClUND66zDzrnA', 'BirdwatchDeleteRating'],
        method: POST,
        params: { note_id: String() },
        parser: (data: _BirdwatchDeleteRating): Result => ({ result: data.data.birdwatch_rating_delete === 'Done' })
    },



    // bookmarks
    Bookmarks: {
        url: ['3OjEFzT2VjX-X7w4KYBJRg', 'Bookmarks'],
        method: GET,
        params: { cursor: optional(String()) },
        variables: {"count":50,"includePromotedContent":false},
        features: {"graphql_timeline_v2_bookmark_timeline":true,"blue_business_profile_image_shape_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"tweetypie_unmention_optimization_enabled":true,"vibe_api_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":false,"interactive_text_enabled":true,"responsive_web_text_conversations_enabled":false,"longform_notetweets_rich_text_read_enabled":true,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_BookmarksWrapper>) => formatEntries(entries(data.data.bookmark_timeline_v2.timeline.instructions))
    },
    CreateBookmark: {
        url: ['aoDbu3RHznuiSkQ9aNM67Q', 'CreateBookmark'],
        method: POST,
        params: { tweet_id: String() },
        useOauthKey: true,
        parser: (data: _TweetBookmark): Result => ({ result: data.data.tweet_bookmark_put === 'Done' })
    },
    DeleteBookmark: {
        url: ['Wlmlj2-xzyS1GN3a6cj-mQ', 'DeleteBookmark'],
        method: POST,
        params: { tweet_id: String() },
        useOauthKey: true,
        parser: (data: _TweetUnbookmark): Result => ({ result: data.data.tweet_bookmark_delete === 'Done' })
    },
    BookmarksAllDelete: {
        url: ['skiACZKC1GDYli-M8RzEPQ', 'BookmarksAllDelete'],
        method: POST,
        useOauthKey: true,
        parser: (data: _TweetUnbookmarkAll): Result => ({ result: data.data.bookmark_all_delete === 'Done' })
    },



    // communities
    /** unused */
    CommunityQuery: {
        url: ['2W09l7nD7ZbxGQHXvfB22w', 'CommunityQuery'],
        method: GET,
        params: { communityId: String() },
        features: {"c9s_list_members_action_api_enabled":false,"c9s_superc9s_indication_enabled":false},
        parser: (data: Data<_CommunityWrapper>) => formatCommunity(data.data.communityResults.result)
    },
    CommunityByRestId: {
        url: ['bCVwRBDPi15jrdJQ7NCENQ', 'CommunityByRestId'],
        method: GET,
        params: { communityId: String() },
        features: {"rweb_lists_timeline_redesign_enabled":false,"blue_business_profile_image_shape_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"tweetypie_unmention_optimization_enabled":true,"vibe_api_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":false,"interactive_text_enabled":true,"responsive_web_text_conversations_enabled":false,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":false,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_CommunityWrapper>) => formatCommunity(data.data.communityResults.result)
    },
    CommunityTweetsTimeline: {
        url: ['2JgHOlqfeLusxAT0yGQJjg', 'CommunityTweetsTimeline'],
        method: GET,
        params: { communityId: String(), rankingMode: String() as 'Relevance' | 'Recency', cursor: optional(String()) },
        variables: {"count":20,"displayLocation":"Community","withCommunity":true},
        features: {"rweb_lists_timeline_redesign_enabled":false,"blue_business_profile_image_shape_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"tweetypie_unmention_optimization_enabled":true,"vibe_api_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":false,"interactive_text_enabled":true,"responsive_web_text_conversations_enabled":false,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":false,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_CommunityTweetsWrapper>) => formatEntries(entries((data.data.communityResults.result.ranked_community_timeline || data.data.communityResults.result.community_timeline).timeline.instructions))
    },
    CommunityMediaTimeline: {
        url: ['PyP2EKnfiKX-joyg7dnWEw', 'CommunityMediaTimeline'],
        method: GET,
        params: { communityId: String(), cursor: optional(String()) },
        variables: {"count":20,"withCommunity":true},
        features: {"rweb_video_screen_enabled":false,"payments_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":true,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":false,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_grok_community_note_auto_translation_is_enabled":false,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_CommunityMediaWrapper>) => formatMediaEntries(entries((data.data.communityResults.result.community_media_timeline || data.data.communityResults.result.community_timeline).timeline.instructions))
    },
    /** unimplemented */
    CommunityAboutTimeline: {
        url: ['plOgdpBzpVVQbTOEVuRc_A', 'CommunityAboutTimeline'],
        method: GET,
        params: { communityId: String() },
        variables: {"count":20},
        features: {"rweb_lists_timeline_redesign_enabled":false,"blue_business_profile_image_shape_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"tweetypie_unmention_optimization_enabled":true,"vibe_api_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":false,"interactive_text_enabled":true,"responsive_web_text_conversations_enabled":false,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":false,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_CommunityAboutWrapper>) => data
    },
    /** `timelineId: communityTweetSearch-<rest_id>-a-(Likes|Recency)` */
    CommunityTweetSearchModuleQuery: {
        url: ['VPq2G6XCKGAcIdXS20st5w', 'CommunityTweetSearchModuleQuery'],
        method: GET,
        params: { communityId: String(), query: String(), timelineRankingMode: String() as 'Recency' | 'Likes', timelineId: String(), cursor: optional(String()) },
        variables: {"count":20,"includePromotedContent":false,"withBirdwatchNotes":true,"withDmMuting":false,"withClientEventToken":false,"withVoice":false,"isListMemberTargetUserId":"0","withCommunity":false,"withQuickPromoteEligibilityTweetFields":false,"withGrokTranslatedBio":false},
        features: {"articles_preview_enabled":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"communities_web_enable_tweet_community_results_fetch":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"freedom_of_speech_not_reach_fetch_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"longform_notetweets_consumption_enabled":true,"longform_notetweets_inline_media_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"payments_enabled":false,"premium_content_api_read_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"responsive_web_enhance_cards_enabled":false,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_grok_analysis_button_from_backend":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_grok_community_note_auto_translation_is_enabled":false,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_grok_share_attachment_enabled":true,"responsive_web_grok_show_grok_translated_post":false,"responsive_web_jetfuel_frame":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"rweb_tipjar_consumption_enabled":true,"rweb_video_screen_enabled":false,"standardized_nudges_misinfo":true,"tweet_awards_web_tipping_enabled":false,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"verified_phone_label_enabled":false,"view_counts_everywhere_api_enabled":true},
        parser: (data: Data<_CommunitySearchWrapper>) => formatEntries(entries(data.data.communityResults.result.community_filtered_timeline.timeline.instructions))
    },
    CommunitiesExploreTimeline: {
        url: ['RG4mGNHKeNF7Yd_CpuD-eA', 'CommunitiesExploreTimeline'],
        method: GET,
        variables: {"count":20,"withCommunity":true},
        features: {"rweb_video_screen_enabled":false,"payments_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":true,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":false,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_grok_community_note_auto_translation_is_enabled":false,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_CommunityExploreWrapper>) => formatEntries(entries(data.data.viewer.explore_communities_timeline.timeline.instructions))
    },
    membersSliceTimeline_Query: {
        url: ['gwNDrhzDr9kuoulEqgSQcQ', 'membersSliceTimeline_Query'],
        method: GET,
        params: { communityId: String(), cursor: optional(String()) },
        variables: {"count":20},
        features: {"responsive_web_graphql_timeline_navigation_enabled":true},
        parser: (data: Data<_CommunityMembersWrapper>) => formatCommunityMembers(data.data.communityResults.result.members_slice.items_results.map(item => item.result), data.data.communityResults.result.members_slice.slice_info?.next_cursor)
    },
    moderatorsSliceTimeline_Query: {
        url: ['hIHwUEnebpLYLqFyZKGbPQ', 'moderatorsSliceTimeline_Query'],
        method: GET,
        params: { communityId: String(), cursor: optional(String()) },
        variables: {"count":20},
        features: {"responsive_web_graphql_timeline_navigation_enabled":true},
        parser: (data: Data<_CommunityModeratorsWrapper>) => formatCommunityMembers(data.data.communityResults.result.moderators_slice.items_results.map(item => item.result), data.data.communityResults.result.moderators_slice.slice_info?.next_cursor)
    },
    JoinCommunity: {
        url: ['rylcLRRbgyYOSU2Ja5SeeQ', 'JoinCommunity'],
        method: POST,
        params: { communityId: String() },
        features: {"payments_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"verified_phone_label_enabled":false,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true},
        parser: (data: _CommunityJoin): Result => ({ result: !!data.data.community_join })
    },
    LeaveCommunity: {
        url: ['quQU4fIRAQTzJ4y1DERLRg', 'LeaveCommunity'],
        method: POST,
        params: { communityId: String() },
        features: {"payments_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"verified_phone_label_enabled":false,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true},
        parser: (data: _CommunityLeave): Result => ({ result: !!data.data.community_leave })
    },
    PinTimeline: {
        url: ['zl1jxgu7LLbJApF1BZjWsQ', 'PinTimeline'],
        method: POST,
        params: { pinnedTimelineItem: Object() as { id: string, pinned_timeline_type: 'Community' } },
        features: {"payments_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"verified_phone_label_enabled":false,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true},
        parser: (data: _CommunityPin): Result => ({ result: data.data.pin_timeline.__typename === 'PinTimelineSuccessResult' })
    },
    UnpinTimeline: {
        url: ['mYj5TSPAEGtMbP7S_t-BXw', 'UnpinTimeline'],
        method: POST,
        params: { pinnedTimelineItem: Object() as { id: string, pinned_timeline_type: 'Community' } },
        features: {"payments_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"verified_phone_label_enabled":false,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true},
        parser: (data: _CommunityUnpin): Result => ({ result: data.data.unpin_timeline.__typename === 'UnpinTimelineSuccessResult' })
    },
    CommunitiesCreateButtonQuery: {
        url: ['ScODPHsG2d28Xr-rDSBThg', 'CommunitiesCreateButtonQuery'],
        method: GET,
        variables: {},
        parser: (data: _CommunityAllowCreation): Result => ({ result: data.data.viewer.create_community_action_result.reason !== 'NotVerified' })
    },



    // dms
    // TODO



    // explore
    ExplorePage: {
        url: ['fkypGKlR9Xz9kLvUZDLoXw', 'ExplorePage'],
        method: GET,
        params: { cursor: optional(String()) },
        features: {"rweb_video_screen_enabled":false,"payments_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"verified_phone_label_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":true,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":false,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_grok_community_note_auto_translation_is_enabled":false,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_ExploreWrapper>) => formatExplorePage(entries(data.data.explore_page.body.initialTimeline.timeline.timeline.instructions), data.data.explore_page.body.timelines)
    },
    ExploreSidebar: {
        url: ['awK5hXpuSvqOizUnq8IcuA', 'ExploreSidebar'],
        method: GET,
        variables: {},
        features: {"rweb_video_screen_enabled":false,"payments_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":true,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":false,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_grok_community_note_auto_translation_is_enabled":false,"responsive_web_enhance_cards_enabled":false},
        // @ts-ignore
        parser: (data: Data<_ExploreTrendingWrapper>) => formatSidebarItem(entries(data.data.explore_sidebar.timeline.instructions).find(x => x.content.__typename === 'TimelineTimelineModule')?.content)
    },
    SidebarUserRecommendations: {
        url: ['IWdZXQ2Hdh_gprXkyn58ug', 'SidebarUserRecommendations'],
        method: GET,
        params: { profileUserId: String() },
        variables: {},
        features: {"payments_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"verified_phone_label_enabled":false,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true},
        parser: (data: Data<_SidebarUserRecommendationsWrapper>) => data.data.sidebar_user_recommendations.map(user => user.user_results ? formatUser(user.user_results.result) as User : null).filter(x => !!x)
    },
    hashflags: {
        url: v11('hashflags.json'),
        method: GET,
        parser: (data: _Hashflag[]) => data.map(formatHashflag)
    },



    // list
    ListByRestId: {
        url: ['vxx-Y8zadpAP64HHiw4hMQ', 'ListByRestId'],
        method: GET,
        params: { listId: String() },
        variables: {"withSuperFollowsUserFields":true},
        features: {"responsive_web_graphql_timeline_navigation_enabled":false},
        parser: (data: Data<_ListWrapper>) => formatList(data.data.list)
    },
    ListsManagementPageTimeline: {
        url: ['cl2dF-zeGiLvZDsMGZhL4g', 'ListsManagementPageTimeline'],
        method: GET,
        variables: {"count":100,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true},
        features: {"responsive_web_graphql_timeline_navigation_enabled":false,"unified_cards_ad_metadata_container_dynamic_card_content_query_enabled":false,"dont_mention_me_view_api_enabled":true,"responsive_web_uc_gql_enabled":true,"vibe_api_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":false,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":false,"interactive_text_enabled":true,"responsive_web_text_conversations_enabled":false,"responsive_web_enhance_cards_enabled":true},
        parser: (data: Data<_ListManagementWrapper>) => formatListModuleEntries(entries(data.data.viewer.list_management_timeline.timeline.instructions))
    },
    ListLatestTweetsTimeline: {
        url: ['2Vjeyo_L0nizAUhHe3fKyA', 'ListLatestTweetsTimeline'],
        method: GET,
        params: { listId: String(), cursor: optional(String()) },
        variables: {"count":40},
        features: {"rweb_lists_timeline_redesign_enabled":false,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":false,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_media_download_video_enabled":false,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_ListTweetsWrapper>) => formatEntries(entries(data.data.list.tweets_timeline.timeline.instructions))
    },
    ListMembers: {
        url: ['sXFXEmtFr3nLyG1dmS81jw', 'ListMembers'],
        method: GET,
        params: { listId: String(), cursor: optional(String()) },
        variables: {"count":20,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true,"withSafetyModeUserFields":true},
        features: {"responsive_web_graphql_timeline_navigation_enabled":false,"unified_cards_ad_metadata_container_dynamic_card_content_query_enabled":false,"dont_mention_me_view_api_enabled":true,"responsive_web_uc_gql_enabled":true,"vibe_api_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":false,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":false,"interactive_text_enabled":true,"responsive_web_text_conversations_enabled":false,"responsive_web_enhance_cards_enabled":true},
        parser: (data: Data<_ListUsersWrapper>) => formatUserEntries(entries(data.data.list.members_timeline.timeline.instructions))
    },
    ListSubscribers: {
        url: ['LxXoouvfd5E8PXsdrQ0iMg', 'ListSubscribers'],
        method: GET,
        params: { listId: String(), cursor: optional(String()) },
        variables: {"count":20,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true,"withSafetyModeUserFields":true},
        features: {"responsive_web_graphql_timeline_navigation_enabled":false,"unified_cards_ad_metadata_container_dynamic_card_content_query_enabled":false,"dont_mention_me_view_api_enabled":true,"responsive_web_uc_gql_enabled":true,"vibe_api_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":false,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":false,"interactive_text_enabled":true,"responsive_web_text_conversations_enabled":false,"responsive_web_enhance_cards_enabled":true},
        parser: (data: Data<_ListSubscribersWrapper>) => formatUserEntries(entries(data.data.list.subscribers_timeline.timeline.instructions))
    },
    ListSubscribe: {
        url: ['nymTz5ek0FQPC3kh63Tp1w', 'ListSubscribe'],
        method: POST,
        params: { listId: String() },
        variables: {"withSuperFollowsUserFields":true},
        features: {"responsive_web_graphql_timeline_navigation_enabled":false},
        parser: (data: any): Result => ({ result: !!data.data.list_subscribe_v2.id_str })
    },
    ListUnsubscribe: {
        url: ['Wi5-aG4bvTmdjyRyRGkyhA', 'ListUnsubscribe'],
        method: POST,
        params: { listId: String() },
        variables: {"withSuperFollowsUserFields":true},
        features: {"responsive_web_graphql_timeline_navigation_enabled":false},
        parser: (data: _ListUpdate): Result => ({ result: !!data.data.list.id_str })
    },
    CreateList: {
        url: ['x5aSMDodNU02VT1VRyW48A', 'CreateList'],
        method: POST,
        params: { name: String(), description: String(), isPrivate: Boolean() },
        variables: {"withSuperFollowsUserFields":true},
        features: {"responsive_web_graphql_timeline_navigation_enabled":false},
        parser: (data: _ListUpdate): Result => ({ result: !!data.data.list.id_str })
    },
    UpdateList: {
        url: ['P9YDuvCt6ogRf-kyr5E5xw', 'UpdateList'],
        method: POST,
        params: { listId: String(), name: String(), description: String(), isPrivate: Boolean() },
        variables: {"withSuperFollowsUserFields":true},
        features: {"responsive_web_graphql_timeline_navigation_enabled":false},
        parser: (data: _ListUpdate): Result => ({ result: !!data.data.list.id_str })
    },
    DeleteList: {
        url: ['UnN9Th1BDbeLjpgjGSpL3Q', 'DeleteList'],
        method: POST,
        params: { listId: String() },
        parser: (data: _ListDelete): Result => ({ result: data.data.list_delete === 'Done' })
    },
    ListAddMember: {
        url: ['RKtQuzpcy2gym71UorWg6g', 'ListAddMember'],
        method: POST,
        params: { listId: String(), userId: String() },
        variables: {"withSuperFollowsUserFields":true},
        features: {"responsive_web_graphql_timeline_navigation_enabled":false},
        parser: (data: _ListUpdate): Result => ({ result: !!data.data.list.id_str })
    },
    ListRemoveMember: {
        url: ['mDlp1UvnnALC_EzybKAMtA', 'ListRemoveMember'],
        method: POST,
        params: { listId: String(), userId: String() },
        variables: {"withSuperFollowsUserFields":true},
        features: {"responsive_web_graphql_timeline_navigation_enabled":false},
        parser: (data: _ListUpdate): Result => ({ result: !!data.data.list.id_str })
    },
    ListOwnerships: {
        url: ['6E69fsenLDPDcprqtogzdw', 'ListOwnerships'],
        method: GET,
        params: { userId: String(), isListMemberTargetUserId: String() },
        variables: {"count":100,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true},
        features: {"responsive_web_graphql_timeline_navigation_enabled":false,"unified_cards_ad_metadata_container_dynamic_card_content_query_enabled":false,"dont_mention_me_view_api_enabled":true,"responsive_web_uc_gql_enabled":true,"vibe_api_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":false,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":false,"interactive_text_enabled":true,"responsive_web_text_conversations_enabled":false,"responsive_web_enhance_cards_enabled":true},
        parser: (data: unknown) => data // TODO
    },



    // notifications
    NotificationsTimeline: {
        url: ['xds00fmkr7ZucQHr6GFwEQ', 'NotificationsTimeline'],
        method: GET,
        params: { timeline_type: String() as 'All' | 'Verified' | 'Mentions', cursor: optional(String()) },
        variables: {"count":40},
        features: {"rweb_video_screen_enabled":false,"payments_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":true,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":false,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_NotificationsWrapper>) => formatNotificationEntries(entries(data.data.viewer_v2.user_results.result.notification_timeline.timeline.instructions))
    },
    badge_count: {
        url: 'https://twitter.com/i/api/2/badge_count/badge_count.json',
        method: GET,
        body: 'supports_ntab_urt=1',
        parser: (data: _UnreadCount) => formatUnread(data)
    },
    notifications_device_follow: {
        url: 'https://twitter.com/i/api/2/notifications/device_follow.json',
        method: GET,
        params: { cursor: optional(String()) },
        body: 'cursor={}&include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&include_ext_has_nft_avatar=1&include_ext_is_blue_verified=1&include_ext_verified_type=1&include_ext_profile_image_shape=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_ext_alt_text=true&include_ext_limited_action_results=true&include_quote_count=true&include_reply_count=1&tweet_mode=extended&include_ext_views=true&include_entities=true&include_user_entities=true&include_ext_media_color=true&include_ext_media_availability=true&include_ext_sensitive_media_warning=true&include_ext_trusted_friends_metadata=true&send_error_codes=true&simple_quoted_tweet=true&count=20&requestContext=launch&ext=mediaStats%2ChighlightedLabel%2ChasNftAvatar%2CvoiceInfo%2CbirdwatchPivot%2CsuperFollowMetadata%2CunmentionInfo%2CeditControl',
        useOauthKey: true,
        parser: (data: _NotificationsTweetsWrapper) => formatNotificationTweetEntries(entries(data.timeline.instructions), data.globalObjects)
    },



    // search
    /** to check quote tweets: `{ rawQuery: 'quoted_tweet_id:<rest_id>', querySource: 'tdqt'`, product: 'Top' }` */
    SearchTimeline: {
        url: ['TQmyZ_haUqANuyBcFBLkUw', 'SearchTimeline'],
        method: GET,
        params: { rawQuery: String(), querySource: String() as 'typed_query' | 'recent_search_click' | 'tdqt', product: String() as 'Top' | 'Latest' | 'People' | 'Media' | 'Lists', cursor: optional(String()) },
        variables: {"count":50},
        features: {"rweb_tipjar_consumption_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"articles_preview_enabled":true,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"rweb_video_timestamps_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_SearchTimelineWrapper>) => formatSearchEntries(entries(data.data.search_by_raw_query.search_timeline.timeline.instructions))
    },
    search_typeahead: {
        url: v11('search/typeahead.json'),
        method: GET,
        params: { q: String() },
        body: 'q={}&include_can_dm=1&count=10&prefetch=false&cards_platform=Web-13&include_entities=1&include_user_entities=1&include_cards=1&send_error_codes=1&tweet_mode=extended&include_ext_alt_text=true&include_reply_count=true&ext=views%2CmediaStats%2CverifiedType%2CisBlueVerified',
        useOauthKey: true,
        parser: (data: _Typeahead) => formatTypeahead(data)
    },



    // timeline
    HomeLatestTimeline: {
        url: ['U0cdisy7QFIoTfu3-Okw0A', 'HomeLatestTimeline'],
        method: GET,
        params: { cursor: optional(String()) },
        variables: {"count":20,"includePromotedContent":false,"latestControlAvailable":true,"requestContext":"launch","withCommunity":true},
        features: {"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"c9s_tweet_anatomy_moderator_badge_enabled":true,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"rweb_video_timestamps_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_HomeTimelineWrapper>) => formatEntries(entries(data.data.home.home_timeline_urt.instructions))
    },
    HomeTimeline: {
        url: ['k3YiLNE_MAy5J-NANLERdg', 'HomeTimeline'],
        method: GET,
        params: { cursor: optional(String()), seenTweetIds: optional(Array(String())) },
        variables: {"count":20,"includePromotedContent":false,"latestControlAvailable":true,"requestContext":"launch","withCommunity":true},
        features: {"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"c9s_tweet_anatomy_moderator_badge_enabled":true,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"rweb_video_timestamps_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_HomeTimelineWrapper>) => formatEntries(entries(data.data.home.home_timeline_urt.instructions))
    },



    // topics
    TopicLandingPage: {
        url: ['4exqISyA1-LejxLHY4RqJA', 'TopicLandingPage'],
        method: GET,
        params: { rest_id: String() },
        variables: {"context":"{}","withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true},
        features: {"responsive_web_graphql_timeline_navigation_enabled":false,"unified_cards_ad_metadata_container_dynamic_card_content_query_enabled":true,"dont_mention_me_view_api_enabled":true,"responsive_web_uc_gql_enabled":true,"vibe_api_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":false,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":false,"interactive_text_enabled":true,"responsive_web_text_conversations_enabled":false,"responsive_web_enhance_cards_enabled":true},
        parser: (data: unknown) => data // TODO
    },
    TopicFollow: {
        url: ['ElqSLWFmsPL4NlZI5e1Grg', 'TopicFollow'],
        method: POST,
        params: { topicId: String() },
        parser: (data: _TopicFollowOrNotInterested): Result => ({ result: !!data.data.topic.id })
    },
    TopicUnfollow: {
        url: ['srwjU6JM_ZKTj_QMfUGNcw', 'TopicUnfollow'],
        method: POST,
        params: { topicId: String() },
        parser: (data: _TopicFollowOrNotInterested): Result => ({ result: !!data.data.topic.id })
    },
    TopicNotInterested: {
        url: ['cPCFdDAaqRjlMRYInZzoDA', 'TopicNotInterested'],
        method: POST,
        params: { topicId: String() },
        parser: (data: _TopicFollowOrNotInterested): Result => ({ result: !!data.data.topic.id })
    },
    TopicUndoNotInterested: {
        url: ['4tVnt6FoSxaX8L-mDDJo4Q', 'TopicUndoNotInterested'],
        method: POST,
        params: { topicId: String() },
        parser: (data: _TopicFollowOrNotInterested): Result => ({ result: !!data.data.topic.id })
    },



    // tweets
    CreateTweet: {
        url: ['I_J3_LvnnihD0Gjbq5pD2g', 'CreateTweet'],
        method: POST,
        params: { tweet_text: String(), conversation_control: optional(Object()) as { mode: 'Community' | 'Verified' | 'ByInvitation' } | undefined, media: Object() as { media_entities: { media_id: string, tagged_users: string[] }[], possibly_sensitive: boolean } },
        variables: {"disallowed_reply_options":null,"semantic_annotation_ids":[],"dark_request":false},
        features: {"c9s_tweet_anatomy_moderator_badge_enabled":true,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":false,"tweet_awards_web_tipping_enabled":false,"responsive_web_home_pinned_timelines_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"responsive_web_media_download_video_enabled":false,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_enhance_cards_enabled":false},
        parser: (data: _TweetCreate): Result => ({ result: !!data.data.create_tweet.tweet_results.result.rest_id })
    },
    CreateScheduledTweet: {
        url: ['LCVzRQGxOaGnOnYH01NQXg', 'CreateScheduledTweet'],
        method: POST,
        params: { tweet_text: String(), /* TODO media */ },
        variables: {"media":{"media_entities":[],"possibly_sensitive":false},"semantic_annotation_ids":[],"dark_request":false},
        features: {"c9s_tweet_anatomy_moderator_badge_enabled":true,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":false,"tweet_awards_web_tipping_enabled":false,"responsive_web_home_pinned_timelines_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"responsive_web_media_download_video_enabled":false,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_enhance_cards_enabled":false},
        parser: (data: _TweetCreate): Result => ({ result: !!data.data.create_tweet.tweet_results.result.rest_id })
    },
    DeleteTweet: {
        url: ['VaenaVgh5q5ih7kvyVjgtg', 'DeleteTweet'],
        method: POST,
        params: { tweet_id: String() },
        variables: {"dark_request":false},
        parser: (data: _TweetDelete): Result => ({ result: data.data.delete_tweet.tweet_results !== undefined })
    },
    TweetDetail: {
        url: ['KwGBbJZc6DBx8EKmyQSP7g', 'TweetDetail'],
        method: GET,
        params: { focalTweetId: String(), rankingMode: String() as 'Relevance' | 'Recency' | 'Likes', cursor: optional(String()) },
        variables: {"with_rux_injections":false,"includePromotedContent":false,"withCommunity":true,"withQuickPromoteEligibilityTweetFields":true,"withBirdwatchNotes":true,"withVoice":true,"withV2Timeline":true},
        features: {"rweb_lists_timeline_redesign_enabled":false,"blue_business_profile_image_shape_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"tweetypie_unmention_optimization_enabled":true,"vibe_api_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":false,"interactive_text_enabled":true,"responsive_web_text_conversations_enabled":false,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":false,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_TweetWrapper>) => formatEntries(entries(data.data.threaded_conversation_with_injections_v2.instructions))
    },
    ModeratedTimeline: {
        url: ['SiKS1_3937rb72ytFnDHmA', 'ModeratedTimeline'],
        method: GET,
        params: { rootTweetId: String(), cursor: optional(String()) },
        variables: {"includePromotedContent":false},
        features: {"rweb_lists_timeline_redesign_enabled":false,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":false,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_media_download_video_enabled":false,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_TweetHiddenRepliesWrapper>) => formatEntries(entries(data.data.tweet.result.timeline_response.timeline.instructions))
    },
    Favoriters: {
        url: ['RMoTahkos95Jcdw-UWlZog', 'Favoriters'],
        method: GET,
        params: { tweetId: String(), cursor: optional(String()) },
        variables: {"count":20,"includePromotedContent":false,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true,"withClientEventToken":false,"withBirdwatchNotes":false,"withVoice":true,"withV2Timeline":true},
        features: {"dont_mention_me_view_api_enabled":true,"interactive_text_enabled":true,"responsive_web_uc_gql_enabled":false,"vibe_tweet_context_enabled":false,"responsive_web_edit_tweet_api_enabled":false,"standardized_nudges_misinfo":false,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_TweetLikesWrapper>) => formatUserEntries(entries(data.data.favoriters_timeline.timeline.instructions))
    },
    Retweeters: {
        url: ['qVWT1Tn1FiklyVDqYiOhLg', 'Retweeters'],
        method: GET,
        params: { tweetId: String(), cursor: optional(String()) },
        variables: {"count":20,"includePromotedContent":false,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true,"withClientEventToken":false,"withBirdwatchNotes":false,"withVoice":true,"withV2Timeline":true},
        features: {"dont_mention_me_view_api_enabled":true,"interactive_text_enabled":true,"responsive_web_uc_gql_enabled":false,"vibe_tweet_context_enabled":false,"responsive_web_edit_tweet_api_enabled":false,"standardized_nudges_misinfo":false,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_TweetRetweetsWrapper>) => formatUserEntries(entries(data.data.retweeters_timeline.timeline.instructions))
    },
    FavoriteTweet: {
        url: ['lI07N6Otwv1PhnEgXILM7A', 'FavoriteTweet'],
        method: POST,
        params: { tweet_id: String() },
        parser: (data: _TweetLike): Result => ({ result: data.data.favorite_tweet === 'Done' })
    },
    UnfavoriteTweet: {
        url: ['ZYKSe-w7KEslx3JhSIk5LA', 'UnfavoriteTweet'],
        method: POST,
        params: { tweet_id: String() },
        parser: (data: _TweetUnlike): Result => ({ result: data.data.unfavorite_tweet === 'Done' })
    },
    CreateRetweet: {
        url: ['ojPdsZsimiJrUGLR1sjUtA', 'CreateRetweet'],
        method: POST,
        params: { tweet_id: String() },
        variables: {"dark_request":false},
        parser: (data: _TweetRetweet): Result => ({ result: !!data.data.create_retweet.retweet_results.result.rest_id })
    },
    DeleteRetweet: {
        url: ['iQtK4dl5hBmXewYZuEOKVw', 'DeleteRetweet'],
        method: POST,
        params: { source_tweet_id: String() },
        variables: {"dark_request":false},
        parser: (data: _TweetUnretweet): Result => ({ result: !!data.data.unretweet.source_tweet_results.result.rest_id })
    },
    ModerateTweet: {
        url: ['pjFnHGVqCjTcZol0xcBJjw', 'ModerateTweet'],
        method: POST,
        params: { tweetId: String() },
        parser: (data: _TweetHide): Result => ({ result: data.data.tweet_moderate_put === 'Done' })
    },
    UnmoderateTweet: {
        url: ['pVSyu6PA57TLvIE4nN2tsA', 'UnmoderateTweet'],
        method: POST,
        params: { tweetId: String() },
        parser: (data: _TweetUnhide): Result => ({ result: data.data.tweet_unmoderate_put === 'Done' })
    },
    PinTweet: {
        url: ['VIHsNu89pK-kW35JpHq7Xw', 'PinTweet'],
        method: POST,
        params: { tweet_id: String() },
        parser: (data: _TweetPin): Result => ({ result: data.data.pin_tweet.message === 'post pinned successfully' })
    },
    UnpinTweet: {
        url: ['BhKei844ypCyLYCg0nwigw', 'UnpinTweet'],
        method: POST,
        params: { tweet_id: String() },
        parser: (data: _TweetUnpin): Result => ({ result: data.data.unpin_tweet.message === 'post unpinned successfully' })
    },
    ConversationControlChange: {
        url: ['hb1elGcj6769uT8qVYqtjw', 'ConversationControlChange'],
        method: POST,
        params: { tweet_id: String(), mode: String() as 'Community' | 'Verified' | 'ByInvitation' },
        parser: (data: _TweetConversationControlChange): Result => ({ result: data.data.tweet_conversation_control_put === 'Done' })
    },
    ConversationControlDelete: {
        url: ['OoMO_aSZ1ZXjegeamF9QmA', 'ConversationControlDelete'],
        method: POST,
        params: { tweet_id: String() },
        parser: (data: _TweetConversationControlDelete): Result => ({ result: data.data.tweet_conversation_control_delete === 'Done' })
    },
    UnmentionUserFromConversation: {
        url: ['xVW9j3OqoBRY9d6_2OONEg', 'UnmentionUserFromConversation'],
        method: POST,
        params: { tweet_id: String() },
        parser: (data: _TweetUnmention): Result => ({ result: data.data.unmention_user === 'Done' })
    },
    cards_create: {
        url: 'https://caps.twitter.com/v2/cards/create.json',
        method: POST,
        useOauthKey: true,
        parser: (data: any) => data // TODO
    },
    passthrough: {
        url: 'https://caps.twitter.com/v2/capi/passthrough/1',
        method: POST,
        params: { card_uri: String(), original_tweet_id: String(), response_card_name: String(), selected_choice: Number() },
        body: 'twitter%3Astring%3Acard_uri={}&twitter%3Along%3Aoriginal_tweet_id={}&twitter%3Astring%3Aresponse_card_name={}&twitter%3Astring%3Acards_platform=Web-12&twitter%3Astring%3Aselected_choice={}',
        useOauthKey: true,
        parser: (data: { card: _Card['legacy'] }) => formatCard(data.card)
    },
    mutes_conversations_create: {
        url: v11('mutes/conversations/create.json'),
        method: POST,
        params: { tweet_id: String() },
        body: 'tweet_id={}',
        useOauthKey: true,
        parser: (data: _TweetMute): Result => ({ result: !!data.id_str })
    },
    mutes_conversations_destroy: {
        url: v11('mutes/conversations/destroy.json'),
        method: POST,
        params: { tweet_id: String() },
        body: 'tweet_id={}',
        useOauthKey: true,
        parser: (data: _TweetMute): Result => ({ result: !!data.id_str })
    },



    // users
    UserByScreenName: {
        url: ['sLVLhk0bGj3MVFEKTdax1w', 'UserByScreenName'],
        method: GET,
        params: { screen_name: String() },
        features: {"blue_business_profile_image_shape_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true},
        parser: (data: Data<_UserWrapper>) => formatUser(data.data?.user?.result)
    },
    UserByRestId: {
        url: ['GazOglcBvgLigl3ywt6b3Q', 'UserByRestId'],
        method: GET,
        params: { userId: String() },
        features: {"blue_business_profile_image_shape_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true},
        parser: (data: Data<_UserWrapper>) => formatUser(data.data?.user?.result)
    },
    UsersByRestIds: {
        url: ['OJBgJQIrij6e3cjqQ3Zu1Q', 'UsersByRestIds'],
        method: GET,
        params: { userIds: Array(String()) },
        features: {"blue_business_profile_image_shape_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"responsive_web_graphql_timeline_navigation_enabled":true},
        useOauthKey: true,
        parser: (data: Data<_UsersByIdsWrapper>) => data.data.users.map(user => formatUser(user.result))
    },
    UserTweets: {
        url: ['VgitpdpNZ-RUIp5D1Z_D-A', 'UserTweets'],
        method: GET,
        params: { userId: String(), cursor: optional(String()) },
        variables: {"count":20,"includePromotedContent":true,"withCommunity":true,"withVoice":true,"withV2Timeline":true},
        features: {"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"responsive_web_home_pinned_timelines_enabled":true,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"c9s_tweet_anatomy_moderator_badge_enabled":true,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":false,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_media_download_video_enabled":false,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_UserTweetsWrapper>) => formatEntries(entries(data.data.user.result.timeline_v2.timeline.instructions))
    },
    UserTweetsAndReplies: {
        url: ['pz0IHaV_t7T4HJavqqqcIA', 'UserTweetsAndReplies'],
        method: GET,
        params: { userId: String(), cursor: optional(String()) },
        variables: {"count":20,"includePromotedContent":true,"withCommunity":true,"withVoice":true,"withV2Timeline":true},
        features: {"rweb_video_screen_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":false,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":false,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_UserTweetsWrapper>) => formatEntries(entries(data.data.user.result.timeline_v2.timeline.instructions))
    },
    UserMedia: {
        url: ['1dmA2m-qIsGm2XfqQtcD3A', 'UserMedia'],
        method: GET,
        params: { userId: String(), cursor: optional(String()) },
        variables: {"count":20,"includePromotedContent":false,"withClientEventToken":false,"withBirdwatchNotes":false,"withVoice":true,"withV2Timeline":true},
        features: {"rweb_tipjar_consumption_enabled":true,"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"articles_preview_enabled":true,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"rweb_video_timestamps_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_UserMediaWrapper>) => formatMediaEntries(entries(data.data.user.result.timeline_v2.timeline.instructions))
    },
    Likes: {
        url: ['A1SbgzyeCaiD0Mf7WOQNfw', 'Likes'],
        method: GET,
        params: { userId: String(), cursor: optional(String()) },
        variables: {"count":50,"includePromotedContent":false,"withClientEventToken":false,"withBirdwatchNotes":false,"withVoice":true},
        features: {"rweb_video_screen_enabled":false,"payments_enabled":false,"rweb_xchat_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":true,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":true,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_grok_imagine_annotation_enabled":true,"responsive_web_grok_community_note_auto_translation_is_enabled":false,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_UserLikesWrapper>) => formatEntries(entries(data.data.user.result.timeline.timeline?.instructions || []))
    },
    Following: {
        url: ['HiVckx-N4J3whIKFTiHdLw', 'Following'],
        method: GET,
        params: { userId: String(), cursor: optional(String()) },
        variables: {"count":50,"includePromotedContent":false,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true,"withClientEventToken":false,"withBirdwatchNotes":false,"withVoice":true,"withV2Timeline":true},
        features: {"rweb_video_screen_enabled":false,"payments_enabled":false,"rweb_xchat_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":true,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":true,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_grok_imagine_annotation_enabled":true,"responsive_web_grok_community_note_auto_translation_is_enabled":false,"responsive_web_enhance_cards_enabled":false},
        parser: (data: Data<_UserFollowersWrapper>) => formatUserEntries(entries(data.data.user.result.timeline.timeline.instructions))
    },
    Followers: {
        url: ['mCKZXEfy1vBxKiWEddhRDA', 'Followers'],
        method: GET,
        params: { userId: String(), cursor: optional(String()) },
        variables: {"count":50,"includePromotedContent":false,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true,"withClientEventToken":false,"withBirdwatchNotes":false,"withVoice":true,"withV2Timeline":true},
        features: {"rweb_video_screen_enabled":false,"payments_enabled":false,"rweb_xchat_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":true,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":true,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_grok_imagine_annotation_enabled":true,"responsive_web_grok_community_note_auto_translation_is_enabled":false,"responsive_web_enhance_cards_enabled":false},
        useOauthKey: true,
        parser: (data: Data<_UserFollowersWrapper>) => formatUserEntries(entries(data.data.user.result.timeline.timeline.instructions))
    },
    FollowersYouKnow: {
        url: ['vab2kJw7Z1Nyz1lh0ANTVA', 'FollowersYouKnow'],
        method: GET,
        params: { userId: String(), cursor: optional(String()) },
        variables: {"count":50,"includePromotedContent":false,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true,"withClientEventToken":false,"withBirdwatchNotes":false,"withVoice":true,"withV2Timeline":true},
        features: {"rweb_video_screen_enabled":false,"payments_enabled":false,"rweb_xchat_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":true,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":true,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_grok_imagine_annotation_enabled":true,"responsive_web_grok_community_note_auto_translation_is_enabled":false,"responsive_web_enhance_cards_enabled":false},
        useOauthKey: true,
        parser: (data: Data<_UserFollowersWrapper>) => formatUserEntries(entries(data.data.user.result.timeline.timeline.instructions))
    },
    CombinedLists: {
        url: ['mLKOzzVOWUycBiExBT1gjg', 'CombinedLists'],
        method: GET,
        params: { userId: String(), cursor: optional(String()) },
        variables: {"count":100,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true},
        features: {"responsive_web_graphql_timeline_navigation_enabled":false,"unified_cards_ad_metadata_container_dynamic_card_content_query_enabled":false,"dont_mention_me_view_api_enabled":true,"responsive_web_uc_gql_enabled":true,"vibe_api_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":false,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":false,"interactive_text_enabled":true,"responsive_web_text_conversations_enabled":false,"responsive_web_enhance_cards_enabled":true},
        useOauthKey: true,
        parser: (data: Data<_UserListsWrapper>) => formatListEntries(entries(data.data.user.result.timeline.timeline.instructions))
    },
    RemoveFollower: {
        url: ['QpNfg0kpPRfjROQ_9eOLXA', 'RemoveFollower'],
        method: POST,
        params: { target_user_id: String() },
        parser: (data: _UserForceUnfollow): Result => ({ result: data.data.remove_follower.unfollow_success_reason === 'Unfollowed' })
    },
    friendships_create: {
        url: v11('friendships/create.json'),
        method: POST,
        params: { user_id: String() },
        body: 'user_id={}',
        useOauthKey: true,
        parser: (data: _User['legacy']): Result => ({ result: !!data.id_str })
    },
    friendships_destroy: {
        url: v11('friendships/destroy.json'),
        method: POST,
        params: { user_id: String() },
        body: 'user_id={}',
        useOauthKey: true,
        parser: (data: _User['legacy']): Result => ({ result: !!data.id_str })
    },
    friendships_update_device: {
        url: v11('friendships/update.json'),
        method: POST,
        params: { id: String(), device: Boolean() },
        body: 'include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&include_ext_is_blue_verified=1&include_ext_verified_type=1&include_ext_profile_image_shape=1&skip_status=1&cursor=-1&id={}&device={}',
        useOauthKey: true,
        parser: (data: _UserRelationshipUpdate): Result => ({ result: !!data.relationship.target.id_str })
    },
    friendships_update_retweets: {
        url: v11('friendships/update.json'),
        method: POST,
        params: { id: String(), retweets: Boolean() },
        body: 'include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&include_ext_is_blue_verified=1&include_ext_verified_type=1&include_ext_profile_image_shape=1&skip_status=1&cursor=-1&id={}&retweets={}',
        useOauthKey: true,
        parser: (data: _UserRelationshipUpdate): Result => ({ result: !!data.relationship.target.id_str })
    },
    friendships_cancel: {
        url: v11('friendships/cancel.json'),
        method: POST,
        params: { user_id: String() },
        body: 'user_id={}',
        useOauthKey: true,
        parser: (data: _User['legacy']): Result => ({ result: !!data.id_str })
    },
    friendships_incoming: {
        url: v11('friendships/incoming.json'),
        method: GET,
        params: { user_id: String(), cursor: Number() },
        body: 'include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&include_ext_has_nft_avatar=1&skip_status=1&cursor={}&stringify_ids=true&count=100',
        useOauthKey: true,
        parser: (data: _UserFriendsFollowingWrapper) => data.users.map(formatUserLegacy)
    },
    friendships_accept: {
        url: v11('friendships/accept.json'),
        method: POST,
        params: { user_id: String() },
        body: 'user_id={}',
        useOauthKey: true,
        parser: (data: _User['legacy']): Result => ({ result: !!data.id_str })
    },
    friendships_deny: {
        url: v11('friendships/deny.json'),
        method: POST,
        params: { user_id: String() },
        body: 'user_id={}',
        useOauthKey: true,
        parser: (data: _User['legacy']): Result => ({ result: !!data.id_str })
    },
    blocks_create: {
        url: v11('blocks/create.json'),
        method: POST,
        params: { user_id: String() },
        body: 'user_id={}',
        useOauthKey: true,
        parser: (data: _User['legacy']): Result => ({ result: !!data.id_str })
    },
    blocks_destroy: {
        url: v11('blocks/destroy.json'),
        method: POST,
        params: { user_id: String() },
        body: 'user_id={}',
        useOauthKey: true,
        parser: (data: _User['legacy']): Result => ({ result: !!data.id_str })
    },
    mutes_users_create: {
        url: v11('mutes/users/create.json'),
        method: POST,
        params: { user_id: String() },
        body: 'user_id={}',
        useOauthKey: true,
        parser: (data: _User['legacy']): Result => ({ result: !!data.id_str })
    },
    mutes_users_destroy: {
        url: v11('mutes/users/destroy.json'),
        method: POST,
        params: { user_id: String() },
        body: 'user_id={}',
        useOauthKey: true,
        parser: (data: _User['legacy']): Result => ({ result: !!data.id_str })
    },
    friends_following_list: {
        url: v11('friends/following/list.json'),
        method: GET,
        params: { user_id: String() },
        body: 'include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&include_ext_has_nft_avatar=1&skip_status=1&cursor=-1&user_id={}&count=10&with_total_count=true',
        useOauthKey: true,
        parser: (data: _UserFriendsFollowingWrapper) => data.users.map(formatUserLegacy)
    }
} satisfies Record<string, Endpoint>;
