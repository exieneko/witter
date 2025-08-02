import type { _User } from './user.js';

export interface _Typeahead {
    num_results: number,
    users: (_User['legacy'] & {
        social_context: {
            following: boolean,
            followed_by: boolean
        }
    })[],
    topics: {
        topic: string,
        rounded_score: number,
        tokens: string[],
        inline: boolean,
        result_context: {
            display_string: string,
            redirect_url: string,
            redirect_url_tv: string,
            types: {
                type: string
            }[]
        }
    }[],
    //? usually there's nothing in these even if you search for them so it doesn't matter
    // events: {}[],
    // lists: {}[],
    // ordered_sections: {}[],
    // oneclick: {}[],
    // hashtags: {}[],
    completed_in: number,
    query: string
}

export interface _SearchUserModulesItem { // not putting this in items fuck you
    __typename: 'TimelineTimelineModule',
    items: {
        entryId: string,
        item: {
            itemContent: {
                __typename: 'TimelineUser',
                user_results: {
                    result: _User
                }
            }
        }
    }[]
}
