import type { _Cursor, _GenericGetUserCursors, _ShittyAssCursor, Instructions, SegmentedTimelines } from '.';
import type { _BirdwatchContributor, _BirdwatchTweet } from './birdwatch';
import type { _Community, _CommunityTopic } from './community';
import type { _ExplorePageItem, _ExplorePageSportsItem, _ExploreSidebarItem, _ExploreTrendItem, _ListItem, _ListModuleItem, _ListsItem, _NotificationItem, _NotificationTweetItem, _TimelineTweetItem, _TopicItem, _TopicModuleItem, _TweetConversationItem, _UserItem } from './items';
import type { _List } from './list';
import type { _NotificationGlobalObjects } from './notifications';
import type { _SearchUserModulesItem } from './search';
import type { _Tweet } from './tweet';
import type { _User } from './user';

export interface Data<T extends object> {
    data: T,
    errors?: {
        code: number,
        message: string
    }[]
}



export interface _GenericTimelineWrapper<T extends { __typename: string } = _TimelineTweetItem> {
    timeline: {
        timeline: {
            instructions: Instructions<T>
        }
    }
}

export interface _BirdwatchTweetsWrapper {
    viewer: {
        birdwatch_home_page: {
            body: SegmentedTimelines
        }
    }
}

export interface _BookmarksWrapper {
    bookmark_timeline_v2: {
        timeline: {
            instructions: Instructions
        }
    }
}

export interface _CommunityWrapper {
    communityResults: {
        result: _Community
    }
}

export interface _CommunityTweetsWrapper {
    communityResults: {
        result: {
            ranked_community_timeline: {
                timeline: {
                    instructions: Instructions<_TimelineTweetItem, 'pin'>
                }
            }
        }
    }
}

export interface _CommunityExploreWrapper {
    viewer: {
        explore_communities_timeline: {
            timeline: {
                instructions: Instructions
            }
        }
    }
}

export interface _CommunityTopicCarousel {
    communityTopicResults: {
        community_topics: _CommunityTopic[]
    }
}

export interface _ExploreWrapper {
    explore_page: {
        body: SegmentedTimelines<_ExplorePageItem | _Cursor>
    }
}

export type _ExploreMiscWrapper = _GenericTimelineWrapper<_ExplorePageSportsItem>;

// inbox stuff here
// i'll add it when i feel like it

export interface _ListWrapper {
    list: _List
}

export interface _ListManagementWrapper {
    viewer: {
        list_management_timeline: {
            timeline: {
                instructions: Instructions<_ListsItem>
            }
        }
    }
}

export interface _ListTweetsWrapper {
    list: {
        tweets_timeline: {
            timeline: {
                instructions: Instructions
            }
        }
    }
}

export interface _ListDiscoveryWrapper {
    list_discovery_list_mixer_timeline: {
        timeline: {
            instructions: Instructions<_ListsItem>
        }
    }
}

export interface _ListPinnedTimelinesWrapper {
    pinned_timelines: {
        pinned_timelines: {
            __typename: 'ListPinnedTimeline',
            list: _List
        }[]
    }
}

export interface _ListUsersWrapper {
    list: {
        members_timeline: {
            timeline: {
                instructions: Instructions<_UserItem | _Cursor>
            }
        }
    }
}

export interface _ListSubscribersWrapper {
    list: {
        subscribers_timeline: {
            timeline: {
                instructions: Instructions<_UserItem | _Cursor>
            }
        }
    }
}

export interface _ListSuggestedUsersWrapper {
    list: {
        recommended_users: {}
    }
}

export interface _NotificationsWrapper {
    viewer_v2: {
        user_results: {
            result: {
                notification_timeline: {
                    timeline: {
                        instructions: Instructions<_NotificationItem | _Cursor>
                    }
                }
            }
        }
    }
}

export interface _NotificationsTweetsWrapper {
    globalObjects: _NotificationGlobalObjects,
    timeline: {
        instructions: Instructions<_NotificationTweetItem | _ShittyAssCursor>
    }
}

export interface _HomeTimelineWrapper {
    home: {
        home_timeline_urt: {
            instructions: Instructions
        }
    }
}

export interface _UserTweetsWrapper {
    user: {
        result: {
            timeline_v2: {
                timeline: {
                    instructions: Instructions<_TimelineTweetItem, 'pin'>
                }
            }
        }
    }
}

export interface _UserMediaWrapper {
    user: {
        result: {
            timeline_v2: {
                timeline: {
                    instructions: Instructions<_TweetConversationItem | _Cursor>
                }
            }
        }
    }
}

export interface _UserLikesWrapper {
    user: {
        result: {
            timeline_v2: {
                timeline?: {
                    instructions: Instructions
                }
            }
        }
    }
}

export interface _UserFollowersWrapper {
    user: {
        result: {
            timeline: {
                timeline: {
                    instructions: Instructions<_UserItem | _Cursor>
                }
            }
        }
    }
}

export interface _UserTopicsWrapper {
    user: {
        result: {
            viewing_other_users_topics_page: {
                body: {
                    timeline: {
                        instructions: Instructions<_TopicItem | _TopicModuleItem> // missing cursor is on purpose but maybe needs to be added later
                    }
                }
            }
        }
    }
}

/** same as quote tweets interaction */
export interface _SearchTimelineWrapper {
    search_by_raw_query: {
        search_timeline: {
            timeline: {
                instructions: Instructions<_TimelineTweetItem | _SearchUserModulesItem>
            }
        }
    }
}



export interface _BirdwatchContributorWrapper {
    birdwatch_profile_by_alias: _BirdwatchContributor
}

export interface _BirdwatchNotesWrapper {
    tweet_result_by_rest_id: {
        result: _BirdwatchTweet
    }
}

export interface _CommunityWrapper {
    communityResults: {
        result: _Community
    }
}

export interface _ExploreTrendingWrapper {
    explore_sidebar: {
        instructions: Instructions<_ExploreSidebarItem | _Cursor>
    }
}

export interface _TweetWrapper {
    threaded_conversation_with_injections_v2: {
        instructions: Instructions
    }
}

export interface _TweetHiddenRepliesWrapper {
    tweet: {
        result: {
            timeline_response: {
                timeline: {
                    instructions: Instructions
                }
            }
        }
    }
}

export interface _TweetRetweetsWrapper {
    retweeters_timeline: {
        timeline: {
            instructions: Instructions<_UserItem | _Cursor>
        }
    }
}

export interface _TweetLikesWrapper {
    favoriters_timeline: {
        timeline: {
            instructions: Instructions<_UserItem | _Cursor>
        }
    }
}

export interface _UserWrapper {
    user: {
        result: _User
    }
}

export interface _UsersByIdsWrapper {
    users: {
        result: _User
    }[]
}

export interface _UserListsWrapper {
    user: {
        result: {
            __typename: 'User',
            timeline: {
                timeline: {
                    instructions: Instructions<_ListItem | _Cursor>
                }
            }
        }
    }
}

export interface _SidebarUserRecommendationsWrapper {
    sidebar_user_recommendations: {
        token: string,
        user_results: {
            result: _User
        }
    }[]
}

export interface _UserFriendsFollowingWrapper extends _GenericGetUserCursors {
    users: _User['legacy'][]
}

export interface _FollowRequests extends _GenericGetUserCursors {
    ids: string[]
}



export interface _DraftsWrapper {
    viewer: {
        draft_list: {
            response_data: {
                rest_id: string,
                user_results: {
                    result: {
                        __typename: 'User',
                        rest_id: string
                    }
                },
                tweet_create_request: {
                    type: 'PostTweetRequest',
                    status: string,
                    exclude_reply_user_list: {}[],
                    media_ids: string[],
                    auto_populate_reply_metadata: boolean,
                    thread_tweets: {}[]
                }
            }[]
        }
    }
}

export interface _ScheduledTweetsWrapper {
    viewer: {
        scheduled_tweet_list: _Tweet[]
    }
}
