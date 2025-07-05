import type { _Cursor } from '.';
import type { _EventSummary, _SportsTile, _Trend, _TrendStory } from './explore';
import type { _List } from './list';
import type { _Topic } from './topic';
import type { _Tweet, _TweetTombstone, _VisibilityLimitedTweet } from './tweet';
import type { _User } from './user';

// REMINDER!!!!!
// BASICALLY EVERYTHING HERE IS WHAT GOES IN EACH ENTRY, UNDER `content`
// SO ALL OF THESE NEED EITHER `itemContent` OR `items`

export interface _ExploreTrendItem {
    __typename: 'TimelineTimelineModule',
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

export type _ExplorePageItem = _ExploreTrendItem | _ExploreStoriesItem | _ExploreTopicItem | {
    __typename: 'TimelineTimelineModule',
    items: {
        entryId: string,
        item: {
            itemContent: _UserItem
        }
    }[]
};

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

export type _ListsItem = _ListModuleItem | _Cursor



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
                ref: {
                    type: 'TimelineRichTextUser',
                    user_results: {
                        result: _User
                    }
                }
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
                    result: _User
                }
            }[]
        },
        timestamp_ms: string
    },
    clientEventInfo: {
        component: string,
        element: 'device_follow_tweet_notification_entry' | 'users_liked_your_tweet' | 'users_liked_your_retweet' | 'users_followed_you' | 'user_mentioned_you' | 'generic_report_received' | `generic_birdwatch${'_not_' | '_'}helpful_valid_rater`
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
        highlights: {
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
            itemContent: _TweetItem['itemContent']
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
    __typename: 'TimelineUser',
    user_result: {
        result: _User
    }
}
