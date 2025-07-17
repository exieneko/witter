import type { _List } from './list';
import type { _Topic } from './topic';
import type { _PollBindingKeysBoolean, _PollBindingKeysString, _Tweet } from './tweet';
import type { _User } from './user';
import type { Data } from './wrappers';

/** create, update data, update members */
export type _ListUpdate = Data<{
    list: _List
}>;

export type _ListPinTimeline = Data<{
    pin_timeline: {
        __typename: 'PinTimelineSuccessResult',
        updated_pinned_timeline: {
            __typename: 'ListPinnedTimeline',
            list: _List
        }
    }
}>;

export type _ListUnpinTimeline = Data<{
    unpin_timeline: {
        __typename: 'UnpinTimelineSuccessResult',
        updated_pinned_timeline: {
            __typename: 'ListPinnedTimeline',
            list: _List
        }
    }
}>;

export type _ListMute = Data<{
    list: 'Done'
}>;

export type _ListDelete = Data<{
    list_delete: 'Done'
}>;



export type _TopicFollowOrNotInterested = Data<{
    topic: _Topic
}>;



export type _TweetCreate = Data<{
    create_tweet: {
        tweet_results: {
            result: _Tweet
        }
    }
}>;

export type _TweetDelete = Data<{
    delete_tweet: {
        tweet_results: {}
    }
}>;

export type _TweetRetweet = Data<{
    create_retweet: {
        retweet_results: {
            result: {
                rest_id: string,
                legacy: {
                    full_text: string
                }
            }
        }
    }
}>;

export type _TweetUnretweet = Data<{
    unretweet: {
        source_tweet_results: {
            result: {
                rest_id: string,
                legacy: {
                    full_text: string
                }
            }
        }
    }
}>;

export type _TweetLike = Data<{
    favorite_tweet: 'Done'
}>;

export type _TweetUnlike = Data<{
    unfavorite_tweet: 'Done'
}>;

export type _TweetBookmark = Data<{
    tweet_bookmark_put: 'Done'
}>;

export type _TweetUnbookmark = Data<{
    tweet_bookmark_delete: 'Done'
}>;

export type _TweetUnbookmarkAll = Data<{
    bookmark_all_delete: 'Done'
}>;

export type _TweetHide = Data<{
    tweet_moderate_put: 'Done'
}>;

export type _TweetUnhide = Data<{
    tweet_unmoderate_put: 'Done'
}>;

export type _TweetPin = Data<{
    pin_tweet: {
        added_tweet_to_highlights: boolean,
        message: 'post pinned successfully'
    }
}>;

export type _TweetUnpin = Data<{
    unpin_tweet: {
        message: 'post unpinned successfully'
    }
}>;

export type _TweetConversationControlChange = Data<{
    tweet_conversation_control_put: 'Done'
}>;

export type _TweetConversationControlDelete = Data<{
    tweet_conversation_control_delete: 'Done'
}>;

export type _TweetUnmention = Data<{
    unmention_user: 'Done'
}>;

export type _TweetMute = _Tweet['legacy'];

export type _TweetPollVote = {
    card: {
        name: `poll${1 | 2 | 3 | 4}choice_text_only`,
        url: string,
        binding_values: Record<_PollBindingKeysString | 'selected_choice', {
            string_value: string,
            type: 'STRING'
        }> & Record<_PollBindingKeysBoolean, {
            boolean_value: boolean,
            type: 'BOOLEAN'
        }>
    }
};



/** includes: follow, mute, block */
export type _UserRelationshipCreateOrDelete = _User['legacy'];

export type _UserRelationshipUpdate = {
    relationship: {
        source: _User['legacy'],
        target: _User['legacy']
    }
};

export type _UserForceUnfollow = Data<{
    remove_follower: {
        __typename: 'UnfollowSuccessResult',
        unfollow_success_reason: 'Unfollowed'
    }
}>;
