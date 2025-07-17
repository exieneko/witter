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
    deletedNotesCount?: number,
    hasNotes?: boolean,
    ratings: {
        totalCount: number,
        lastUpdatedAt: string,
        awaitingMoreRatingsCount: number,
        successful: {
            helpfulCount: number,
            notHelpfulCount: number,
            totalCount: number
        },
        unsuccessful: {
            helpfulCount: number,
            notHelpfulCount: number,
            totalCount: number
        }
    },
    notes: {
        lastUpdatedAt: string,
        awaitingCount: number,
        helpfulCount: number,
        notHelpfulCount: number
    }
}

export interface BirdwatchNote {
    __type: 'BirdwatchNote',
    id: string,
    author: BirdwatchContributor,
    createdAt: string,
    hasTrustworthySources: boolean,
    status: BirdwatchRatingStatus,
    tags: {
        helpful?: BirdwatchHelpfulTag[],
        notHelpful?: BirdwatchNotHelpfulTag[],
    },
    text: string,
    tweetId: string,
    viewsCount: number
}

export interface BirdwatchTweet {
    noteNeeded: (BirdwatchNote & {
        tweetTags: {
            classification: BirdwatchNoteNegativeClassification,
            misleading: BirdwatchMisleadingTweetTag[]
        }
    })[],
    noteNotNeeded: (BirdwatchNote & {
        tweetTags: {
            classification: BirdwatchNotePositiveClassification,
            notMisleading: BirdwatchNotMisleadingTweetTag[]
        }
    })[]
}
