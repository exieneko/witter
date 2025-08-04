import type { Tweet } from './index.js';

export type BirdwatchRatingStatus = 'NeedsMoreRatings' | 'CurrentlyRatedHelpful' | 'CurrentlyRatedNotHelpful';

export type BirdwatchNoteNegativeClassification = 'MisinformedOrPotentiallyMisleading';
export type BirdwatchNotePositiveClassification = 'NotMisleading';

export type BirdwatchHelpfulTag = 'GoodSources' | 'Clear' | 'AddressesClaim' | 'ImportantContext' | 'UnbiasedLanguage' | 'Other';
export type BirdwatchNotHelpfulTag = 'NoSources' | 'IrrelevantSources' | 'Incorrect' | 'OpinionSpeculation' | 'Unclear' | 'MissingKeyPoints' | 'Rude' | 'TwitterViolationAny' | 'Other';

export type BirdwatchMisleadingTweetTag = 'FactualError' | 'MisinterpretedSatire' | 'MissingImportantContext' | 'ManipulatedMedia' | 'OutdatedInformation' | 'DisputedClaimAsFact' | 'Other';
export type BirdwatchNotMisleadingTweetTag = 'FactuallyCorrect' | 'PersonalOpinion' | 'Other';

export type BirdwatchHelpfulness = 'Helpful' | 'SomewhatHelpful' | 'NotHelpful';

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

export interface BirdwatchAuthenticatedUser {
    __type: 'BirdwatchUser',
    alias: string,
    canWriteNotes: boolean,
    enrollment: {
        hasEarnedIn: boolean,
        lastUpdatedAt: string,
        requiredRating: number
    },
    notificationFrequency: 'daily' | 'weekly' | 'monthly' | 'never'
}

export interface BirdwatchNote {
    __type: 'BirdwatchNote',
    id: string,
    author: BirdwatchContributor,
    createdAt: string,
    hasTrustworthySources: boolean,
    lang: string,
    rating?: {
        __type: BirdwatchHelpfulness
        helpful_tags: BirdwatchHelpfulTag[]
        not_helpful_tags: BirdwatchNotHelpfulTag[]
    },
    similarTweetsCount: number,
    showOnSimilarTweets: boolean,
    status: BirdwatchRatingStatus,
    tags: {
        helpful?: BirdwatchHelpfulTag[],
        notHelpful?: BirdwatchNotHelpfulTag[],
    },
    text: string,
    tweet?: Tweet,
    tweetId?: string,
    viewsCount?: number
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
    })[],
    canWriteNotes: boolean
}
