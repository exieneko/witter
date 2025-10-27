import * as flags from './flags.js';
import * as format from './formatter/index.js';
import type { List, SuspendedUser, Tweet, TweetTombstone, UnavailableUser, User } from './types/index.js';
import { v11, type Endpoint } from './utils.js';

const GET = 'get';
const POST = 'post';

export const ENDPOINTS = {
    // ACCOUNT
    BlockedAccountsAll: {
        url: 'zBszOnEZ9wS04Xl6griBAg/BlockedAccountsAll',
        method: GET,
        params: {} as { cursor?: string },
        variables: {"count":20,"includePromotedContent":false},
        features: flags.timeline,
        parser: data => format.userEntries(data.data.viewer.timeline.timeline.instructions)
    },
    BlockedAccountsImported: {
        url: 'PlcXB9lQyYZUCpllzduApA/BlockedAccountsImported',
        method: GET,
        params: {} as { cursor?: string },
        variables: {"count":20,"includePromotedContent":false},
        features: flags.timeline,
        parser: data => format.userEntries(data.data.viewer.timeline.timeline.instructions)
    },
    MutedAccounts: {
        url: 'qDMmRTJTAHkNvex2SoniGg/MutedAccounts',
        method: GET,
        params: {} as { cursor?: string },
        variables: {"count":20,"includePromotedContent":false},
        features: flags.timeline,
        parser: data => format.userEntries(data.data.viewer.muting_timeline.timeline.instructions)
    },
    account_settings: {
        url: v11('account/settings.json'),
        method: GET,
        variables: {"include_ext_sharing_audiospaces_listening_data_with_followers":true,"include_mention_filter":true,"include_nsfw_user_flag":true,"include_nsfw_admin_flag":true,"include_ranked_timeline":true,"include_alt_text_compose":true,"include_ext_dm_av_call_settings":true,"ext":"ssoConnections","include_country_code":true,"include_ext_dm_nsfw_media_filter":true},
        useOauthKey: true,
        parser: format.settings
    },
    /** @todo */
    account_update_profile: {
        url: v11('account/update_profile.json'),
        method: POST,
        params: {} as {
            birthdate_day: number,
            birthdate_month: number,
            birthdate_year: number,
            birthdate_visibility: 'self',
            birthdate_year_visibility: 'self' | 'followers',
            name: string,
            description: string,
            location: string
        },
        variables: {"displayNameMaxLength":50},
        useOauthKey: true,
        parser: data => data.id_str
    },
    account_verify_credentials: {
        url: v11('account/verify_credentials.json'),
        method: GET,
        useOauthKey: true,
        parser: format.userLegacy
    },



    // BOOKMARKS
    Bookmarks: {
        url: 'i0PhrJu6SkFzTRBDQZb6XA/Bookmarks',
        method: GET,
        params: {} as { cursor?: string },
        variables: {"count":50,"includePromotedContent":false},
        features: flags.timeline,
        parser: data => format.entries(data.data.bookmark_timeline_v2.timeline.instructions)
    },
    BookmarkSearchTimeline: {
        url: '0LGsA9ae91-DxM-oHuMLJg/BookmarkSearchTimeline',
        method: GET,
        params: {} as { rawQuery: string, cursor?: string },
        variables: {"count":50},
        features: flags.timeline,
        parser: data => format.entries(data.data.search_by_raw_query.bookmarks_search_timeline.timeline.instructions)
    },
    CreateBookmark: {
        url: 'aoDbu3RHznuiSkQ9aNM67Q/CreateBookmark',
        method: POST,
        params: {} as { tweet_id: string },
        useOauthKey: true,
        parser: data => data.data.tweet_bookmark_put === 'Done'
    },
    DeleteBookmark: {
        url: 'Wlmlj2-xzyS1GN3a6cj-mQ/DeleteBookmark',
        method: POST,
        params: {} as { tweet_id: string },
        useOauthKey: true,
        parser: data => data.data.tweet_bookmark_delete === 'Done'
    },
    BookmarksAllDelete: {
        url: 'skiACZKC1GDYli-M8RzEPQ/BookmarksAllDelete',
        method: POST,
        useOauthKey: true,
        parser: data => data.data.bookmark_all_delete === 'Done'
    },



    // COMMUNITY
    CommunityByRestId: {
        url: 'Y03_m7PHdhrmtNWaGlIVxg/CommunityByRestId',
        method: GET,
        params: {} as { communityId: string },
        features: flags.short,
        parser: data => format.community(data.data.communityResults.result)
    },
    CommunityTweetsTimeline: {
        url: 'wqGdeW2JAbULEtf-vR7rMQ/CommunityTweetsTimeline',
        method: GET,
        params: {} as { communityId: string, rankingMode: 'Relevance' | 'Recency', cursor?: string },
        variables: {"count":20,"displayLocation":"Community","withCommunity":true},
        features: flags.timeline,
        parser: data => format.entries(data.data.communityResults.result.ranked_community_timeline.timeline.instructions)
    },
    CommunityMediaTimeline: {
        url: 'nL37Srye08ev23ntrVoBDQ/CommunityMediaTimeline',
        method: GET,
        params: {} as { communityId: string, cursor?: string },
        variables: {"count":20,"displayLocation":"Community","withCommunity":true},
        features: flags.timeline,
        parser: data => format.mediaEntries(data.data.communityResults.result.ranked_community_timeline.timeline.instructions, {
            content: data.data.communityResults.result.ranked_community_timeline.timeline.instructions.find((i: any) => i.type === 'TimelineAddToModule'),
            key: 'moduleItems'
        })
    },
    JoinCommunity: {
        url: 'zvEh7Liv9P0mstZ0U2UV3Q/JoinCommunity',
        method: GET,
        params: {} as { communityId: string },
        features: flags.short,
        parser: data => !!data.data.community_join.id_str
    },
    LeaveCommunity: {
        url: 'PwtttWNOJ6pZq5Zb2QoejA/LeaveCommunity',
        method: GET,
        params: {} as { communityId: string },
        features: flags.short,
        parser: data => !!data.data.community_leave.id_str
    },



    // LIST
    ListByRestId: {
        url: 'r5na9hXeXVqb1XJYtx1fHQ/ListByRestId',
        method: GET,
        params: {} as { listId: string },
        features: flags.short,
        parser: data => format.list(data.data.list)
    },
    ListBySlug: {
        url: '8Z9ILKNAy_d-a57m93j8TA/ListBySlug',
        method: GET,
        params: {} as { listId: string },
        features: flags.short,
        parser: data => format.list(data.data.list)
    },
    ListLatestTweetsTimeline: {
        url: 'bV3FChw55I7PEquTudk3Hg/ListLatestTweetsTimeline',
        method: GET,
        params: {} as { listId: string, cursor?: string },
        variables: {"count":40},
        features: flags.timeline,
        parser: data => format.entries(data.data.list.tweets_timeline.timeline.instructions)
    },
    /** @todo */
    ListsManagementPageTimeline: {
        url: 'mjBb_n_f5Ci-eIysajMRWQ/ListsManagementPageTimeline',
        method: GET,
        variables: {"count":100},
        features: flags.timeline,
        parser: _ => _
    },
    ListsDiscovery: {
        url: 'NgIGY7tcOPNdxsWkNYt8tA/ListsDiscovery',
        method: GET,
        variables: {"count":40},
        features: flags.timeline,
        parser: data => format.listEntries(data.data.list_discovery_list_mixer_timeline.timeline.instructions)
    },
    ListMemberships: {
        url: 'hse8xYLs1zYRqzm1ZoKfDA/ListMemberships',
        method: GET,
        params: {} as { cursor?: string },
        variables: {"count":20},
        features: flags.timeline,
        parser: data => format.listEntries(data.data.user.result.timeline.instructions)
    },
    ListOwnerships: {
        url: '2PPrJxgM_t26Aut95OSoOg/ListOwnerships',
        method: GET,
        params: {} as { userId: string, isListMemberTargetUserId: string, cursor?: string },
        variables: {"count":20},
        features: flags.timeline,
        parser: data => format.listEntries(data.data.user.result.timeline.instructions)
    },
    ListMembers: {
        url: '8oGwd_SHm0nGs91qI4znfA/ListMembers',
        method: GET,
        params: {} as { listId: string, cursor?: string },
        variables: {"count":40},
        features: flags.timeline,
        parser: data => format.userEntries(data.data.list.members_timeline.timeline.instructions)
    },
    ListSubscribers: {
        url: 'PrKJMxRZyDyRGwAYcYG-xg/ListSubscribers',
        method: GET,
        params: {} as { listId: string, cursor?: string },
        variables: {"count":40},
        features: flags.timeline,
        parser: data => format.userEntries(data.data.list.subscribers_timeline.timeline.instructions)
    },
    ListCreationRecommendedUsers: {
        url: '523r-mStVzT8SWxXGIjlSA/ListCreationRecommendedUsers',
        method: GET,
        params: {} as { listId: string, cursor?: string },
        variables: {"count":20},
        features: flags.timeline,
        parser: data => format.userEntries(data.data.list.recommended_users.timeline.instructions)
    },
    ListEditRecommendedUsers: {
        url: 'Xoc7RqsKbJmPQJse8C0zDA/ListEditRecommendedUsers',
        method: GET,
        params: {} as { listId: string, cursor?: string },
        variables: {"count":20},
        features: flags.timeline,
        parser: data => format.userEntries(data.data.list.recommended_users.timeline.instructions)
    },
    CombinedLists: {
        url: 'xwox0wvlnPW6uXGLsRY8dA/CombinedLists',
        method: GET,
        params: {} as { userId: string, cursor?: string },
        variables: {"count":100},
        features: flags.timeline,
        parser: data => format.listEntries(data.data.user.result.timeline.timeline.instructions)
    },
    CreateList: {
        url: 'USp5yY9TOEbAdE_pftwDYQ/CreateList',
        method: POST,
        params: {} as { name: string, description: string, isPrivate: boolean },
        features: flags.short,
        parser: data => format.list(data.list) as List
    },
    DeleteList: {
        url: 'UnN9Th1BDbeLjpgjGSpL3Q/DeleteList',
        method: POST,
        params: {} as { listId: string },
        parser: data => data.list_delete === 'Done'
    },
    UpdateList: {
        url: 'kTDznPa9ZTZeMGuIKN-cgw/UpdateList',
        method: POST,
        params: {} as { listId: string, name: string, description: string, isPrivate: boolean },
        parser: data => !!data.data.list.id_str
    },
    EditListBanner: {
        url: '1-JRfISKRfFjJcYtmcT06w/EditListBanner',
        method: POST,
        params: {} as { listId: string, mediaId: string },
        features: flags.short,
        parser: data => !!data.data.list.id_str
    },
    DeleteListBanner: {
        url: 'AytGUXuc88pwSvgPC0iCYg/DeleteListBanner',
        method: POST,
        params: {} as { listId: string },
        features: flags.short,
        parser: data => !!data.data.list.id_str
    },
    ListAddMember: {
        url: '7MH6ZeGFZlvdbY1saKRwZA/ListAddMember',
        method: POST,
        params: {} as { listId: string, userId: string },
        features: flags.short,
        parser: data => !!data.data.list.id_str
    },
    ListRemoveMember: {
        url: 'Tuut-vp5KjOQ9qDOxYnzkg/ListRemoveMember',
        method: POST,
        params: {} as { listId: string, userId: string },
        features: flags.short,
        parser: data => !!data.data.list.id_str
    },
    ListSubscribe: {
        url: 'rhzuIVrAX_WzruA2xj8MzA/ListSubscribe',
        method: POST,
        params: {} as { listId: string },
        features: flags.short,
        parser: data => !!data.data.list_subscribe_v3.id_str
    },
    ListUnsubscribe: {
        url: 'aFJFaxitSwMMoSh_x1gQ7Q/ListUnsubscribe',
        method: POST,
        params: {} as { listId: string },
        features: flags.short,
        parser: data => !!data.data.list.id_str
    },
    PinTimeline: {
        url: 'LIaEysWfV7y5vS3A7sNjOw/PinTimeline',
        method: POST,
        params: {} as { pinnedTimelineItem: { id: string, pinned_timeline_type: 'List' } },
        features: flags.short,
        parser: data => !!data.data.pin_timeline.updated_pinned_timeline.list.id_str
    },
    UnpinTimeline: {
        url: 'oGxUOHovcZs7pOyBCn6arg/UnpinTimeline',
        method: POST,
        params: {} as { pinnedTimelineItem: { id: string, pinned_timeline_type: 'List' } },
        features: flags.short,
        parser: data => !!data.data.unpin_timeline.updated_pinned_timeline.list.id_str
    },
    MuteList: {
        url: 'ZYyanJsskNUcltu9bliMLA/MuteList',
        method: POST,
        params: {} as { listId: string },
        parser: data => data.data.list === 'Done'
    },
    UnmuteList: {
        url: 'pMZrHRNsmEkXgbn3tOyr7Q/UnmuteList',
        method: POST,
        params: {} as { listId: string },
        parser: data => data.data.list === 'Done'
    },



    // NOTIFICATIONS
    NotificationsTimeline: {
        url: 'tsGNf2EtaxOV9TRXknyrag/NotificationsTimeline',
        method: GET,
        params: {} as { timeline_type: 'All' | 'Verified' | 'Mentions', cursor?: string },
        variables: {"count":40},
        features: {"rweb_video_screen_enabled":false,"payments_enabled":false,"profile_label_improvements_pcf_label_in_post_enabled":true,"rweb_tipjar_consumption_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"premium_content_api_read_enabled":false,"communities_web_enable_tweet_community_results_fetch":true,"c9s_tweet_anatomy_moderator_badge_enabled":true,"responsive_web_grok_analyze_button_fetch_trends_enabled":false,"responsive_web_grok_analyze_post_followups_enabled":true,"responsive_web_jetfuel_frame":true,"responsive_web_grok_share_attachment_enabled":true,"articles_preview_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"responsive_web_grok_show_grok_translated_post":false,"responsive_web_grok_analysis_button_from_backend":true,"creator_subscriptions_quote_tweet_preview_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_grok_image_annotation_enabled":true,"responsive_web_enhance_cards_enabled":false},
        parser: data => format.notificationEntries(data.viewer_v2.user_results.result.notification_timeline.timeline.instructions)
    },
    badge_count: {
        url: 'https://twitter.com/i/api/2/badge_count/badge_count.json',
        method: GET,
        variables: {"supports_ntab_urt":1},
        parser: format.unreadCount
    },
    last_seen_cursor: {
        url: 'https://twitter.com/i/api/2/notifications/all/last_seen_cursor.json',
        method: POST,
        params: {} as { cursor: string },
        parser: data => data.cursor
    },
    device_follow: {
        url: 'https://twitter.com/i/api/2/notifications/device_follow.json',
        method: GET,
        params: {} as { cursor?: string },
        variables: {"include_profile_interstitial_type":1,"include_blocking":1,"include_blocked_by":1,"include_followed_by":1,"include_want_retweets":1,"include_mute_edge":1,"include_can_dm":1,"include_can_media_tag":1,"include_ext_has_nft_avatar":1,"include_ext_is_blue_verified":1,"include_ext_verified_type":1,"include_ext_profile_image_shape":1,"skip_status":1,"cards_platform":"Web-12","include_cards":1,"include_ext_alt_text":true,"include_ext_limited_action_results":true,"include_quote_count":true,"include_reply_count":1,"tweet_mode":"extended","include_ext_views":true,"include_entities":true,"include_user_entities":true,"include_ext_media_color":true,"include_ext_media_availability":true,"include_ext_sensitive_media_warning":true,"include_ext_trusted_friends_metadata":true,"send_error_codes":true,"simple_quoted_tweet":true,"count":20,"requestContext":"launch","ext":"mediaStats%2ChighlightedLabel%2ChasNftAvatar%2CvoiceInfo%2CbirdwatchPivot%2CsuperFollowMetadata%2CunmentionInfo%2CeditControl"},
        parser: data => format.deviceFollowEntries(
            (Object.entries(data.timeline.instructions).find(([, v]: [any, any]) => Object.entries(v).at(0)?.at(0) === 'addEntries')?.at(1) as any)?.addEntries?.entries || [],
            data.globalObjects
        )
    },



    // SEARCH
    SearchTimeline: {
        url: '0TyyrdQrH9390DdGyoPYfg/SearchTimeline',
        method: GET,
        params: {} as { rawQuery: string, querySource: 'typed_query' | 'recent_search_click' | 'tdqt', product: 'Top' | 'Latest' | 'People' | 'Media' | 'Lists', cursor?: string },
        variables: {"count":40},
        features: flags.timeline,
        parser: data => format.searchEntries(data.data.search_by_raw_query.search_timeline.timeline.instructions)
    },
    search_typeahead: {
        url: v11('search/typeahead.json'),
        method: GET,
        params: {} as { q: string },
        variables: {"include_ext_is_blue_verified":1,"include_ext_verified_type":1,"include_ext_profile_image_shape":1,"src":"search_box","result_type":"events,users,topics,lists"},
        parser: format.typeahead
    },



    // TIMELINE
    HomeLatestTimeline: {
        url: 'rA4kQTNf-wOA063umfp08Q/HomeLatestTimeline',
        method: GET,
        params: {} as { seenTweetIds: Array<string>, requestContext?: 'launch', cursor?: string },
        variables: {"count":20,"includePromotedContent":false,"latestControlAvailable":true,"withCommunity":true},
        features: flags.timeline,
        parser: data => format.entries(data.data.home_timeline_urt.instructions)
    },
    HomeTimeline: {
        url: 'wGPJhptsyASnUUJb9MPz0w/HomeTimeline',
        method: GET,
        params: {} as { seenTweetIds: Array<string>, requestContext?: 'launch', cursor?: string },
        variables: {"count":20,"includePromotedContent":false,"latestControlAvailable":true,"withCommunity":true},
        features: flags.timeline,
        parser: data => format.entries(data.data.home_timeline_urt.instructions)
    },



    // TWEET
    CreateTweet: {
        url: 'zR1cQ4Y_-6Bmc76d4Chn5Q/CreateTweet',
        method: POST,
        params: {} as {
            conversation_control?: {
                mode: 'Community' | 'Verified' | 'ByInvitation'
            },
            media: {
                media_entities: Array<{
                    media_id: string,
                    tagged_users: Array<string>
                }>,
                possibly_sensitive?: boolean
            },
            semantic_annotation_ids: Array<string>,
            tweet_text: string
        },
        variables: {"dark_request":false,"disallowed_reply_options":null},
        features: flags.timeline,
        parser: data => format.tweet(data.data.create_tweet?.result) as Tweet
    },
    CreateScheduledTweet: {
        url: 'LCVzRQGxOaGnOnYH01NQXg/CreateScheduledTweet',
        method: POST,
        params: {} as {
            execute_at: number,
            post_tweet_request: {
                auto_populate_reply_metadata: boolean,
                exclude_reply_user_ids: Array<string>,
                media_ids: Array<string>,
                status: string,
                thread_tweets: Array<string>
                // TODO
            }
        },
        parser: data => data.tweet.rest_id as string
    },
    DeleteTweet: {
        url: 'VaenaVgh5q5ih7kvyVjgtg/DeleteTweet',
        method: POST,
        params: {} as { tweet_id: string },
        variables: {"dark_request":false},
        parser: data => !!data.delete_tweet
    },
    TweetDetail: {
        url: '42jwneJuHpIeTQvoQoYfhw/TweetDetail',
        method: GET,
        params: {} as { focalTweetId: string, rankingMode: 'Relevance' | 'Recency' | 'Likes', cursor?: string },
        variables: {"with_rux_injections":false,"includePromotedContent":false,"withCommunity":true,"withBirdwatchNotes":true,"withVoice":true,"withV2Timeline":true},
        features: flags.timeline,
        parser: data => format.entries(data.data.threaded_conversation_with_injections_v2.instructions)
    },
    TweetResultByRestId: {
        url: 'jGOLj4UQ6l5z9uUKfhqEHA/TweetResultByRestId',
        method: GET,
        params: {} as { tweetId: string },
        variables: {"with_rux_injections":false,"includePromotedContent":false,"withCommunity":true,"withBirdwatchNotes":true,"withVoice":true,"withV2Timeline":true},
        features: flags.timeline,
        parser: data => format.tweet(data.data.tweetResult.result) as Tweet | TweetTombstone
    },
    TweetResultsByRestIds: {
        url: 'AmGn9FmJTSj-F_2grvcsxg/TweetResultsByRestIds',
        method: GET,
        params: {} as { tweetIds: Array<string> },
        variables: {"with_rux_injections":false,"includePromotedContent":false,"withCommunity":true,"withBirdwatchNotes":true,"withVoice":true,"withV2Timeline":true},
        features: flags.timeline,
        parser: data => data.data.tweetResult.map((tweet: any) => format.tweet(tweet?.result)) as Array<Tweet | TweetTombstone>
    },
    ModeratedTimeline: {
        url: 'uRM_fRG2eETuAnGz74btRw/ModeratedTimeline',
        method: GET,
        params: {} as { rootTweetId: string, cursor?: string },
        variables: {"count":40,"includePromotedContent":false},
        features: flags.timeline,
        parser: data => format.entries(data.data.tweet.result.timeline_response.timeline.instructions)
    },
    Favoriters: {
        url: 'V2RamVyN3YOAYZD7znHHcA/Favoriters',
        method: GET,
        params: {} as { tweetId: string },
        variables: {"count":40,"enableRanking":false,"includePromotedContent":false},
        features: flags.timeline,
        parser: data => format.userEntries(data.favoriters_timeline.timeline.instructions)
    },
    Retweeters: {
        url: 'qVNoKcBmvgXsPDFJbLM-NA/Retweeters',
        method: GET,
        params: {} as { tweetId: string },
        variables: {"count":40,"enableRanking":false,"includePromotedContent":false},
        features: flags.timeline,
        parser: data => format.userEntries(data.retweeters_timeline.timeline.instructions)
    },
    FavoriteTweet: {
        url: 'lI07N6Otwv1PhnEgXILM7A/FavoriteTweet',
        method: POST,
        params: {} as { tweet_id: string },
        parser: data => data.data.favorite_tweet === 'Done'
    },
    UnfavoriteTweet: {
        url: 'ZYKSe-w7KEslx3JhSIk5LA/UnfavoriteTweet',
        method: POST,
        params: {} as { tweet_id: string },
        parser: data => data.data.unfavorite_tweet === 'Done'
    },
    CreateRetweet: {
        url: 'ojPdsZsimiJrUGLR1sjUtA/CreateRetweet',
        method: POST,
        params: {} as { tweet_id: string },
        variables: {"dark_request":false},
        parser: data => !!data.data.create_retweet?.retweet_results?.result?.rest_id
    },
    DeleteRetweet: {
        url: 'iQtK4dl5hBmXewYZuEOKVw/DeleteRetweet',
        method: POST,
        params: {} as { source_tweet_id: string },
        variables: {"dark_request":false},
        parser: data => !!data.data.unretweet?.source_retweet_results?.result?.rest_id
    },
    ModerateTweet: {
        url: 'pjFnHGVqCjTcZol0xcBJjw/ModerateTweet',
        method: POST,
        params: {} as { tweetId: string },
        parser: data => data.data.tweet_moderate_put === 'Done'
    },
    UnmoderateTweet: {
        url: 'pVSyu6PA57TLvIE4nN2tsA/UnmoderateTweet',
        method: POST,
        params: {} as { tweetId: string },
        parser: data => data.data.tweet_unmoderate_put === 'Done'
    },
    PinTweet: {
        url: 'VIHsNu89pK-kW35JpHq7Xw/PinTweet',
        method: POST,
        params: {} as { tweet_id: string },
        parser: data => data.data.pin_tweet?.message?.includes('success') as boolean
    },
    UnpinTweet: {
        url: 'BhKei844ypCyLYCg0nwigw/UnpinTweet',
        method: POST,
        params: {} as { tweet_id: string },
        parser: data => data.data.unpin_tweet?.message?.includes('success') as boolean
    },
    ConversationControlChange: {
        url: 'hb1elGcj6769uT8qVYqtjw/ConversationControlChange',
        method: POST,
        params: {} as { tweet_id: string, mode: 'Community' | 'Verified' | 'ByInvitation' },
        parser: data => data.data.tweet_conversation_control_put === 'Done'
    },
    ConversationControlDelete: {
        url: 'OoMO_aSZ1ZXjegeamF9QmA/ConversationControlDelete',
        method: POST,
        params: {} as { tweet_id: string },
        parser: data => data.data.tweet_conversation_control_delete === 'Done'
    },
    UnmentionUserFromConversation: {
        url: 'xVW9j3OqoBRY9d6_2OONEg/UnmentionUserFromConversation',
        method: POST,
        params: {} as { tweet_id: string },
        parser: data => data.data.unmention_user === 'Done'
    },
    mutes_conversations_create: {
        url: v11('mutes/conversations/create.json'),
        method: POST,
        params: {} as { tweet_id: string },
        useOauthKey: true,
        parser: data => !!data.id_str
    },
    mutes_conversations_destroy: {
        url: v11('mutes/conversations/destroy.json'),
        method: POST,
        params: {} as { tweet_id: string },
        useOauthKey: true,
        parser: data => !!data.id_str
    },



    // USER
    UserByScreenName: {
        url: '6ND0OKRCgPajU_yJbcWSVw/UserByScreenName',
        method: GET,
        params: {} as { screen_name: string },
        features: flags.user,
        parser: data => format.user(data.data.user.result)
    },
    UsersByScreenNames: {
        url: 'fUj_I2cOVaiSPa0YOsfH9A/UsersByScreenNames',
        method: GET,
        params: {} as { screen_names: Array<string> },
        features: flags.user,
        parser: data => data.data.users.map((user: any) => format.user(user?.result)) as Array<User | SuspendedUser | UnavailableUser>
    },
    UserByRestId: {
        url: 'q9yeu7UlEs2YVx_-Z8Ps7Q/UserByRestId',
        method: GET,
        params: {} as { userId: string },
        features: flags.user,
        parser: data => format.user(data.data.user.result)
    },
    UsersByRestIds: {
        url: 'gtih_RnTA2LZEaFd-NxHkA/UsersByRestIds',
        method: GET,
        params: {} as { userIds: Array<string> },
        features: flags.user,
        parser: data => data.data.users.map((user: any) => format.user(user?.result)) as Array<User | SuspendedUser | UnavailableUser>
    },
    UserTweets: {
        url: 'Z15UW_bggbnuLrrt0-jOGA/UserTweets',
        method: GET,
        params: {} as { userId: string, cursor?: string },
        variables: {"count":40,"includePromotedContent":true,"withCommunity":true,"withVoice":true},
        features: flags.timeline,
        parser: data => format.entries(data.data.user.result.timeline.timeline.instructions)
    },
    UserTweetsAndReplies: {
        url: '-Zgw7BQRDjH8EHccXdD13w/UserTweetsAndReplies',
        method: GET,
        params: {} as { userId: string, cursor?: string },
        variables: {"count":40,"includePromotedContent":true,"withCommunity":true,"withVoice":true},
        features: flags.timeline,
        parser: data => format.entries(data.data.user.result.timeline.timeline.instructions)
    },
    UserMedia: {
        url: 'VwWNqXOyrgLzyzEx0d60jg/UserMedia',
        method: GET,
        params: {} as { userId: string, cursor?: string },
        variables: {"count":40,"includePromotedContent":true,"withCommunity":true,"withVoice":true},
        features: flags.timeline,
        parser: data => format.mediaEntries(data.data.user.result.timeline.timeline.instructions)
    },
    Likes: {
        url: 'J_5PGvwjn6N4FfWWg8uqdA/Likes',
        method: GET,
        params: {} as { userId: string, cursor?: string },
        variables: {"count":40,"includePromotedContent":true,"withCommunity":true,"withVoice":true},
        features: flags.timeline,
        parser: data => format.entries(data.data.user.result.timeline.timeline.instructions)
    },
    UserHighlightsTweets: {
        url: 'QzHVmkiRhEfSMY_BRkxFRQ/UserHighlightsTweets',
        method: GET,
        params: {} as { userId: string, cursor?: string },
        variables: {"count":40,"includePromotedContent":true,"withCommunity":true,"withVoice":true},
        features: flags.timeline,
        parser: data => format.entries(data.data.user.result.timeline.timeline.instructions)
    },
    UserSuperFollowTweets: {
        url: 'toCUR18_0OFliE5VXqwHfg/UserSuperFollowTweets',
        method: GET,
        params: {} as { userId: string, cursor?: string },
        variables: {"count":40,"includePromotedContent":true,"withCommunity":true,"withVoice":true},
        features: flags.timeline,
        parser: data => format.entries(data.data.user.result.timeline.timeline.instructions)
    },
    Following: {
        url: 'jPfTlY4NdAFcrsyqN-_r0Q/Following',
        method: GET,
        params: {} as { userId: string, cursor?: string },
        variables: {"count":50,"includePromotedContent":false,"withVoice":true},
        features: flags.timeline,
        useOauthKey: true,
        parser: data => format.userEntries(data.data.user.result.timeline.timeline.instructions)
    },
    Followers: {
        url: 'uESKxPWGzJL-IWZ9d0axRg/Followers',
        method: GET,
        params: {} as { userId: string, cursor?: string },
        variables: {"count":50,"includePromotedContent":false,"withVoice":true},
        features: flags.timeline,
        useOauthKey: true,
        parser: data => format.userEntries(data.data.user.result.timeline.timeline.instructions)
    },
    FollowersYouKnow: {
        url: 'vpF18_arFygcDteSDU-8BA/FollowersYouKnow',
        method: GET,
        params: {} as { userId: string, cursor?: string },
        variables: {"count":50,"includePromotedContent":false,"withVoice":true},
        features: flags.timeline,
        useOauthKey: true,
        parser: data => format.userEntries(data.data.user.result.timeline.timeline.instructions)
    },
    BlueVerifiedFollowers: {
        url: 'ImLL3QjcLG1_20F8r3dDZw/BlueVerifiedFollowers',
        method: GET,
        params: {} as { userId: string, cursor?: string },
        variables: {"count":50,"includePromotedContent":false,"withVoice":true},
        features: flags.timeline,
        useOauthKey: true,
        parser: data => format.userEntries(data.data.user.result.timeline.timeline.instructions)
    },
    UserCreatorSubscriptions: {
        url: 'BUQa9O6bcE-yfUL-I53QNQ/UserCreatorSubscriptions',
        method: GET,
        params: {} as { userId: string, cursor?: string },
        variables: {"count":50,"includePromotedContent":false,"withVoice":true},
        features: flags.timeline,
        parser: data => format.userEntries(data.data.user.result.timeline.timeline.instructions)
    },
    UserCreatorSubscribers: {
        url: '1h3V4JDDo-eByZuia1BrxQ/UserCreatorSubscribers',
        method: GET,
        params: {} as { userId: string, cursor?: string },
        variables: {"count":50,"includePromotedContent":false,"withVoice":true},
        features: flags.timeline,
        parser: data => format.userEntries(data.data.user.result.timeline.timeline.instructions)
    },
    UserBusinessProfileTeamTimeline: {
        url: 'BcDfw4nyJYiKGO6MjW34Hw/UserBusinessProfileTeamTimeline',
        method: GET,
        params: {} as { userId: string, teamName: string, cursor?: string },
        variables: {"count":50,"includePromotedContent":false,"withVoice":true},
        features: flags.timeline,
        parser: data => format.userEntries(data.data.user.result.timeline.timeline.instructions)
    },
    RemoveFollower: {
        url: 'QpNfg0kpPRfjROQ_9eOLXA/RemoveFollower',
        method: POST,
        params: {} as { target_user_id: string },
        parser: data => data.data.remove_follower?.unfollow_success_reason === 'Unfollowed'
    },
    friendships_create: {
        url: v11('friendships/create.json'),
        method: POST,
        params: {} as { user_id: string } | { screen_name: string },
        useOauthKey: true,
        parser: data => !!data.id_str
    },
    friendships_destroy: {
        url: v11('friendships/destroy.json'),
        method: POST,
        params: {} as { user_id: string } | { screen_name: string },
        useOauthKey: true,
        parser: data => !!data.id_str
    },
    friendships_update: {
        url: v11('friendships/update.json'),
        method: POST,
        params: {} as { id: string, retweets?: boolean, device?: boolean },
        variables: {"include_profile_interstitial_type":1,"include_blocking":1,"include_blocked_by":1,"include_followed_by":1,"include_want_retweets":1,"include_mute_edge":1,"include_can_dm":1,"include_can_media_tag":1,"include_ext_is_blue_verified":1,"include_ext_verified_type":1,"include_ext_profile_image_shape":1,"skip_status":1,"cursor":-1},
        useOauthKey: true,
        parser: data => !!data.relationship.target.id_str
    },
    friendships_cancel: {
        url: v11('friendships/cancel.json'),
        method: POST,
        params: {} as { user_id: string } | { screen_name: string },
        useOauthKey: true,
        parser: data => !!data.id_str
    },
    friendships_accept: {
        url: v11('friendships/accept.json'),
        method: POST,
        params: {} as { user_id: string } | { screen_name: string },
        parser: data => !!data.id_str
    },
    friendships_deny: {
        url: v11('friendships/deny.json'),
        method: POST,
        params: {} as { user_id: string } | { screen_name: string },
        parser: data => !!data.id_str
    },
    blocks_create: {
        url: v11('blocks/create.json'),
        method: POST,
        params: {} as { user_id: string } | { screen_name: string },
        useOauthKey: true,
        parser: data => !!data.id_str
    },
    blocks_destroy: {
        url: v11('blocks/destroy.json'),
        method: POST,
        params: {} as { user_id: string } | { screen_name: string },
        useOauthKey: true,
        parser: data => !!data.id_str
    },
    mutes_users_create: {
        url: v11('mutes/users/create.json'),
        method: POST,
        params: {} as { user_id: string } | { screen_name: string },
        useOauthKey: true,
        parser: data => !!data.id_str
    },
    mutes_users_destroy: {
        url: v11('mutes/users/destroy.json'),
        method: POST,
        params: {} as { user_id: string } | { screen_name: string },
        useOauthKey: true,
        parser: data => !!data.id_str
    }
} satisfies Record<string, Endpoint>;
