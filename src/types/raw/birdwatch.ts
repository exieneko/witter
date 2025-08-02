import * as Birdwatch from '../birdwatch.js';

export interface _BirdwatchContributor {
    alias: string,
    has_notes?: boolean,
    deleted_notes_count?: number,
    is_top_writer?: boolean,
    ratings_count: {
        successful: {
            helpful_count: number,
            not_helpful_count: number,
            total: number
        },
        unsuccessful: {
            helpful_count: number,
            not_helpful_count: number,
            total: number
        },
        last_updated_at: number,
        rated_after_decision: number,
        awaiting_more_ratings: number
    },
    notes_count: {
        last_updated_at: number,
        currently_rated_helpful: number,
        currently_rated_not_helpful: number,
        awaiting_more_ratings: number
    }
}

export interface _BirdwatchAuthUser {
    alias: string,
    is_top_writer: boolean,
    notification_settings: {
        needs_your_help_frequency: 'Never'
    },
    user_enrollment: {
        enrollment_state: 'EarnedOutAcknowledged',
        successful_rating_needed_to_earn_in: number,
        top_not_helpful_tags: Birdwatch.BirdwatchNotHelpfulTag[],
        survey_url: string,
        timestamp_of_last_change_state: number
    },
    can_write_notes: boolean
}

export interface _BirdwatchNote {
    rest_id: string,
    data_v1: {
        classification: Birdwatch.BirdwatchNotePositiveClassification | Birdwatch.BirdwatchNoteNegativeClassification,
        summary: {
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
        misleading_tags?: Birdwatch.BirdwatchMisleadingTweetTag[],
        not_misleading_tags?: Birdwatch.BirdwatchNotMisleadingTweetTag[],
        trustworthy_sources: boolean
    },
    fully_visible_model: boolean,
    rating_status: Birdwatch.BirdwatchRatingStatus,
    rating_survey: {
        url: string
    },
    helpful_tags?: Birdwatch.BirdwatchHelpfulTag[],
    not_helpful_tags?: Birdwatch.BirdwatchNotHelpfulTag[],
    tweet_results: {
        result: {
            rest_id: string
        }
    },
    appeal_status: 'NotAppealed',
    birdwatch_profile: _BirdwatchContributor,
    created_at: number,
    can_appeal: boolean,
    decided_by?: string,
    is_media_note: boolean,
    is_url_note: boolean,
    impression_count: number,
    media_note_matches: string,
    media_note_matches_v2: {
        match_count: number,
        shoud_show_matches: boolean
    },
    show_matched_parent_note: boolean,
    is_in_account_language: boolean,
    max_match_post_id_from_crh: string
}

export interface _BirdwatchTweet {
    not_misleading_birdwatch_notes: {
        notes: _BirdwatchNote[]
    },
    misleading_birdwatch_notes: {
        notes: _BirdwatchNote[]
    }
}
