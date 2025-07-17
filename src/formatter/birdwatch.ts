import type { BirdwatchContributor, BirdwatchNote, BirdwatchTweet } from '../types';
import type { _BirdwatchContributor, _BirdwatchNote, _BirdwatchTweet } from '../types/raw/birdwatch';

export const formatBirdwatchContributor = (input: _BirdwatchContributor): BirdwatchContributor => {
    return {
        __type: 'BirdwatchContributor',
        alias: input.alias,
        deletedNotesCount: input.deleted_notes_count,
        hasNotes: input.has_notes,
        ratings: {
            totalCount: input.ratings_count.awaiting_more_ratings + input.ratings_count.successful.total + input.ratings_count.unsuccessful.total,
            lastUpdatedAt: new Date(input.ratings_count.last_updated_at).toISOString(),
            awaitingMoreRatingsCount: input.ratings_count.awaiting_more_ratings,
            successful: {
                helpfulCount: input.ratings_count.successful.helpful_count,
                notHelpfulCount: input.ratings_count.successful.not_helpful_count,
                totalCount: input.ratings_count.successful.total
            },
            unsuccessful: {
                helpfulCount: input.ratings_count.unsuccessful.helpful_count,
                notHelpfulCount: input.ratings_count.unsuccessful.not_helpful_count,
                totalCount: input.ratings_count.unsuccessful.total
            }
        },
        notes: {
            lastUpdatedAt: new Date(input.notes_count.last_updated_at).toISOString(),
            awaitingCount: input.notes_count.awaiting_more_ratings,
            helpfulCount: input.notes_count.currently_rated_helpful,
            notHelpfulCount: input.notes_count.currently_rated_not_helpful
        }
    };
};

export const formatBirdwatchNote = (input: _BirdwatchNote): BirdwatchNote => {
    return {
        __type: 'BirdwatchNote',
        id: input.rest_id,
        author: formatBirdwatchContributor(input.birdwatch_profile),
        createdAt: new Date(input.created_at).toISOString(),
        hasTrustworthySources: !!input.data_v1.trustworthy_sources,
        status: input.rating_status,
        tags: {
            helpful: input.helpful_tags,
            notHelpful: input.not_helpful_tags,
        },
        text: input.data_v1.summary.text,
        tweetId: input.tweet_results.result.rest_id,
        viewsCount: input.impression_count
    };
};

export const formatBirdwatchTweet = (input: _BirdwatchTweet): BirdwatchTweet => {
    return {
        // @ts-ignore
        noteNeeded: input.not_misleading_birdwatch_notes.notes.map(note => ({
            ...formatBirdwatchNote(note),
            ...{
                tweetTags: {
                    classification: note.data_v1.classification,
                    misleading: note.data_v1.misleading_tags || []
                }
            }
        })),
        // @ts-ignore
        noteNotNeeded: input.not_misleading_birdwatch_notes.notes.map(note => ({
            ...formatBirdwatchNote(note),
            ...{
                tweetTags: {
                    classification: note.data_v1.classification,
                    misleading: note.data_v1.not_misleading_tags || []
                }
            }
        }))
    };
};
