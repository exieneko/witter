import type { _Url } from '.';
import type { _Community } from './community';
import type { _User } from './user';

export interface _TweetMedia {
    display_url: string,
    expanded_url: string,
    ext_alt_text?: string,
    id_str: string,
    indices: [number, number],
    media_key: string,
    media_url_https: string,
    type: 'animated_gif' | 'photo' | 'video',
    url: string,
    ext_media_availability: {
        status: 'Available' | 'Unavailable'
    },
    sizes: {
        large: _TweetMediaSize,
        medium: _TweetMediaSize,
        small: _TweetMediaSize,
        thumb: _TweetMediaSize
    },
    original_info: {
        height: number,
        width: number,
        focus_rects: string[]
    },
    video_info?: {
        aspect_ratio: [number, number],
        variants: {
            bitrate: number,
            content_type: string,
            url: string
        }[]
    }
}

interface _TweetMediaSize {
    h: number,
    w: number,
    resize: 'fit' | 'crop'
}

interface _TweetEntities {
    hashtags: {
        indices: [number, number],
        text: string
    }[],
    media?: _TweetMedia[],
    symbols: string[],
    timestamps: {
        indices: [number, number],
        text: string
    }[],
    urls: {
        url: string,
        display_url: string,
        expanded_url: string
    }[],
    user_mentions?: {
        id_str: string,
        name: string,
        screen_name: string,
        indices: [number, number]
    }[]
}

export interface _Tweet {
    __typename: 'Tweet',
    rest_id: string,
    has_birdwatch_notes: boolean,
    birdwatch_pivot: {
        destinationUrl: string,
        note: {
            rest_id: string
        },
        subtitle: {
            text: string,
            entities: {
                fromIndex: number,
                toIndex: number,
                ref: {
                    type: 'TimelineUrl',
                    url: string
                }
            }[]
        },
        /** Default means note is visible to everyone */
        visualStyle: 'Default' | 'Tentative'
    },
    core: {
        user_results: {
            result: _User
        }
    },
    card?: _Card,
    unmention_data: {},
    edit_control: {
        edit_tweet_ids: string[],
        editable_until_msec: string,
        is_edit_eligible: boolean,
        edits_remaining: string
    },
    is_translatable: boolean,
    views: {
        count?: string,
        state: string
    },
    source: string,
    note_tweet?: {
        is_expandable: boolean,
        note_tweet_results: {
            result: {
                id: string,
                text: string,
                entity_set: _TweetEntities & {
                    user_mentions: {
                        id_str: string,
                        indices: [number, number],
                        name: string,
                        screen_name: string
                    }[]
                }
            }
        }
    },
    legacy: {
        bookmark_count: number,
        bookmarked: boolean,
        created_at: string,
        conversation_id_str?: string,
        display_text_range: [number, number],
        entities: _TweetEntities,
        favorite_count: number,
        favorited: boolean,
        full_text: string,
        in_reply_to_screen_name: string,
        in_reply_to_status_id_str: string,
        in_reply_to_user_id_str: string,
        is_quote_status: boolean,
        quoted_status_id_str?: string,
        quoted_status_permalink?: {
            url: string,
            expanded: string,
            display: string
        },
        lang: string,
        quote_count: number,
        reply_count: number,
        retweet_count: number,
        retweeted: boolean,
        retweeted_status_result?: {
            result: _Tweet
        },
        user_id_str: string,
        id_str: string
    },
    community_results?: {
        result: {
            __typename: 'Community',
            id_str: string,
            viewer_relationship: {
                moderation_state: {}
            }
        }
    },
    community_relationship?: {
        rest_id: string,
        moderation_state: {},
        actions: {}
    },
    author_community_relationship?: {
        community_results: {
            result: _Community
        },
        role: 'Member',
        user_results: {
            result: _User
        }
    },
    quoted_status_result?: {
        result: _Tweet | _VisibilityLimitedTweet | _TweetTombstone
    },
    grok_share_attachment: {
        items: {
            message: string,
            media_urls: _Url[]
        }[]
    }
}

export interface _Card {
    rest_id: string,
    legacy: ({
        binding_values: _PollBindingValue[],
        name: `poll${1 | 2 | 3 | 4}choice_text_only`
    }| {
        binding_values: _AudioBindingValue[],
        name: `${string}:audiospace`
    }) & {
        url: string,
        user_refs_results: {
            user_results: {
                result: _User
            }
        }[]
    }
}

export type _PollBindingKeysString = `choice${1 | 2 | 3 | 4}_${'label' | 'count'}` | `${'end' | 'last_updated'}_datetime_utc` | 'duration_minutes' | 'api' | 'card_url';
export type _PollBindingKeysBoolean = 'counts_are_final';
export type _PollBindingValue = {
    key: _PollBindingKeysString,
    value: {
        string_value: string,
        type: 'STRING'
    }
} | {
    key: _PollBindingKeysBoolean,
    value: {
        boolean_value: boolean,
        type: 'BOOLEAN'
    }
};

type _AudioBindingValue = {
    key: 'tweet_id' | 'narrow_cast_space_type' | 'id' | 'card_url',
    value: {
        string_value: string,
        type: 'STRING'
    }
};



export type _LimitedActionType = 'QuoteTweet' | 'CopyLink' | 'Like' | 'Follow' | 'VoteOnPoll' | 'ShowRetweetActionMenu' | 'AddToMoment' | 'PinToProfile' | 'ReplyDownVote' | 'ShareTweetVia' | 'React' | 'Embed' | 'Retweet' | 'SendViaDm' | 'ListsAddRemove' | 'AddToBookmarks' | 'Reply' | 'EditTweet' | 'Highlight';
export interface _LimitedAction {
    action: _LimitedActionType,
    prompt: {
        __typename: `${'Basic' | 'Cta'}LimitedActionPrompt`,
        headline: {
            text: string
        },
        subtext: {
            text: string
        }
    }
}

export interface _VisibilityLimitedTweet {
    __typename: 'TweetWithVisibilityResults',
    tweet: _Tweet,
    softInterventionPivot?: {
        text: {
            text: string,
            rtl: boolean
        },
        url: {
            url: string
        }
    },
    tweetInterstitial?: {
        __typename: 'ContextualTweetIntersitial',
        displayType: 'NonCompliant',
        text: {
            text: string,
            rtl: boolean
        },
        revealText: {
            text: string,
            rtl: boolean
        }
    },
    limitedActionResults?: {
        limited_actions: _LimitedAction[]
    },
    mediaVisibilityResults?: {
        blurred_image_interstitial: {
            opacity: number,
            text: {
                text: string,
                rtl: boolean,
                entities: {
                    fromIndex: number,
                    toIndex: number,
                    ref: {
                        url: string
                    }
                }[]
            },
            title: {
                text: string,
                rtl: boolean,
                entities: {
                    fromIndex: number,
                    toIndex: number,
                    ref: {
                        url: string
                    }
                }[]
            }
        }
    }
}

export interface _TweetTombstone {
    __typename: 'TweetTombstone',
    tombstone: {
        __typename: 'TextTombstone',
        text: {
            text: string,
            rtl: boolean,
            entities: {
                fromIndex: number,
                toIndex: number,
                ref: {
                    url: string
                }
            }[]
        }
    }
}


export interface _TweetTranslation {
    id_str: string,
    translation: string,
    entities: {}, // idk what goes here but it's probably not very important
    translationState: string,
    sourceLanguage: string,
    localizedSourceLanguage: string,
    destinationLanguage: string,
    translationSource: string
}
