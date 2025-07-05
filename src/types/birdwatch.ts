export type BirdwatchRatingStatus = 'NeedsMoreRatings' | 'CurrentlyRatedHelpful' | 'CurrentlyRatedNotHelpful';

export type BirdwatchNoteNegativeClassification = 'MisinformedOrPotentiallyMisleading';
export type BirdwatchNotePositiveClassification = 'NotMisleading';

export type BirdwatchHelpfulTag = 'AddressesClaim' | 'GoodSources' | 'ImportantContext' | 'Clear' /* easy to understand */;
export type BirdwatchNotHelpfulTag = 'MissingKeyPoints' | 'OpinionSpeculation';

export type BirdwatchMisleadingTweetTag = 'FactualError' | 'MisinterpretedSatire' | 'MissingImportantContext' | 'ManipulatedMedia' | 'OutdatedInformation' | 'DisputedClaimAsFact' | 'Other';
export type BirdwatchNotMisleadingTweetTag = 'FactuallyCorrect' | 'PersonalOpinion';

export interface BirdwatchContributor {
    __type: 'BirdwatchContributor',
    alias: string,
    deleted_notes_count?: number,
    has_notes?: boolean,
    ratings: {
        total_count: number,
        last_updated_at: string,
        awaiting_more_ratings_count: number,
        successful: {
            helpful_count: number,
            not_helpful_count: number,
            total_count: number
        },
        unsuccessful: {
            helpful_count: number,
            not_helpful_count: number,
            total_count: number
        }
    },
    notes: {
        last_updated_at: string,
        awaiting_count: number,
        helpful_count: number,
        not_helpful_count: number
    }
}

export interface BirdwatchNote {
    __type: 'BirdwatchNote',
    id: string,
    author: BirdwatchContributor,
    created_at: string,
    has_trustworthy_sources: boolean,
    status: BirdwatchRatingStatus,
    tags: {
        helpful?: BirdwatchHelpfulTag[],
        not_helpful?: BirdwatchNotHelpfulTag[],
    },
    text: string,
    tweet_id: string,
    views_count: number
}

export interface BirdwatchTweet {
    note_needed: (BirdwatchNote & {
        tweet_tags: {
            classification: BirdwatchNoteNegativeClassification,
            misleading: BirdwatchMisleadingTweetTag[]
        }
    })[],
    note_not_needed: (BirdwatchNote & {
        tweet_tags: {
            classification: BirdwatchNotePositiveClassification,
            not_misleading: BirdwatchNotMisleadingTweetTag[]
        }
    })[]
}
