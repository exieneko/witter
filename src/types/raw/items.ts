import type { _Cursor } from './index.js';
import type { _EventSummary, _SportsTile, _Trend, _TrendStory } from './explore.js';
import type { _List } from './list.js';
import type { _Topic } from './topic.js';
import type { _Tweet, _TweetTombstone, _VisibilityLimitedTweet } from './tweet.js';
import type { _User, _UserV3 } from './user.js';

// REMINDER!!!!!
// BASICALLY EVERYTHING HERE IS WHAT GOES IN EACH ENTRY, UNDER `content`
// SO ALL OF THESE NEED EITHER `itemContent` OR `items`

export interface _ExploreTrendItem<Type extends 'Module' | 'Item' = 'Module'> {
    __typename: `TimelineTimeline${Type}`,
    itemContent: _EventSummary | _Trend
}

export interface _ExploreStoriesItem {
    __typename: 'TimelineTimelineModule',
    items: {
        entryId: string,
        item: {
            itemContent: _TrendStory
        }
    }[]
}

export interface _ExploreTopicItem extends _TweetConversationItem {
    header: {
        text: string,
        landingUrl: {
            url: string
        }
    }
}

export interface _ExploreWhoToFollowItem {
    __typename: 'TimelineTimelineModule',
    items: {
        entryId: string,
        item: _UserItem
    }[]
}

export type _ExplorePageItem = _TweetItem | _ExploreTrendItem | _ExploreStoriesItem | _ExploreTopicItem | _ExploreWhoToFollowItem;

export interface _ExploreSportsItem {
    __typename: 'TimelineTimelineModule',
    items: {
        entryId: string,
        item: {
            itemContent: _SportsTile
        }
    }[]
}

export type _ExplorePageSportsItem = _ExploreTrendItem | _ExploreSportsItem | _Cursor;

export interface _ExploreSidebarItem {
    __typename: 'TimelineTimelineModule',
    items: {
        entryId: string,
        item: {
            itemContent: _EventSummary | _Trend
        }
    }[]
}



export interface _ListItem {
    __typename: 'TimelineTimelineItem',
    itemContent: {
        __typename: 'TimelineTwitterList',
        list: _List
    }
}

export interface _ListModuleItem {
    __typename: 'TimelineTimelineModule',
    items: {
        entryId: string,
        item: {
            itemContent: {
                list: _List
            }
        }
    }[]
}

export type _ListsItem = _ListModuleItem | _Cursor;

export interface _NotificationUserEntity {
    type: 'TimelineRichTextUser',
    user_results: {
        result: _UserV3
    }
}

export interface _NotificationListEntity {
    type: 'TimelineRichTextList',
    id: string,
    url: string
}

export interface _NotificationItem {
    __typename: 'TimelineTimelineItem',
    itemContent: {
        __typename: 'TimelineNotification',
        id: string,
        notification_icon: string,
        rich_message: {
            text: string,
            rtl: boolean,
            entities: {
                fromIndex: number,
                toIndex: number,
                ref: _NotificationUserEntity | _NotificationListEntity
            }[]
        },
        notification_url: {
            url: string
        },
        template: {
            __typename: 'TimelineNotificationAggregateUserActions',
            target_objects: any[],
            from_users: {
                __typename: 'TimelineNotificationUserRef',
                user_results: {
                    result: _UserV3
                }
            }[]
        },
        timestamp_ms: string
    },
    clientEventInfo: {
        component: string,
        element: 'device_follow_tweet_notification_entry' | 'users_liked_your_tweet' | 'users_liked_your_retweet' | 'users_followed_you' | 'user_mentioned_you' | 'generic_report_received' | `generic_birdwatch${'_not_' | '_'}helpful_valid_rater` | 'users_subscribed_to_your_list' | 'generic_login_notification'
    }
}

export interface _NotificationTweetItem {
    __typename: 'undefined',
    item: {
        content: {
            tweet: {
                id: string
            }
        }
    }
}



export interface _TopicItem {
    __typename: 'TimelineTimelineItem',
    itemContent: {
        __typename: 'TimelineTopic',
        topic: _Topic
    }
}

export interface _TopicModuleItem {
    __typename: 'TimelineTimelineModule',
    items: {
        entryId: string,
        item: {
            itemContent: {
                topic: _Topic
            }
        }
    }[]
}



export interface _TweetItem {
    __typename: 'TimelineTimelineItem',
    itemContent: {
        __typename: 'TimelineTweet',
        tweet_results: {
            result: _Tweet | _VisibilityLimitedTweet | _TweetTombstone
        },
        hasModeratedReplies?: boolean,
        highlights?: {
            textHighlights: {
                startIndex: number,
                endIndex: number
            }[]
        }
    },
    socialContext: {
        type: 'TimelineGeneralContext',
        contextType: 'Community',
        text: string,
        landingUrl: {
            url: `https://twitter.com/i/communities/${number}`
        }
    }
}

export interface _TweetConversationItem {
    __typename: 'TimelineTimelineModule',
    items: {
        entryId: string,
        item: {
            itemContent: _TweetItem['itemContent'] | _Cursor
        }
    }[],
    metadata?: {
        conversationMetadata: {
            allTweetIds: string[],
            enableDeduplication: boolean
        }
    }
}

export type _TimelineTweetItem = _TweetItem | _TweetConversationItem | _Cursor;



export interface _UserItem {
    __typename: 'TimelineTimelineItem',
    itemContent: {
        __typename: 'TimelineUser',
        user_results: {
            result: _User
        }
    }
}
