import { BirdwatchContributor, BirdwatchNote, BirdwatchTweet } from '../types/birdwatch';
import { _BirdwatchContributor, _BirdwatchNote, _BirdwatchTweet } from '../types/raw/birdwatch';

export const formatBirdwatchContributor = (input: _BirdwatchContributor): BirdwatchContributor => {
    return {
        __type: 'BirdwatchContributor',
        alias: input.alias,
        deleted_notes_count: input.deleted_notes_count,
        has_notes: input.has_notes,
        ratings: {
            total_count: input.ratings_count.awaiting_more_ratings + input.ratings_count.successful.total + input.ratings_count.unsuccessful.total,
            last_updated_at: new Date(input.ratings_count.last_updated_at).toISOString(),
            awaiting_more_ratings_count: input.ratings_count.awaiting_more_ratings,
            successful: {
                helpful_count: input.ratings_count.successful.helpful_count,
                not_helpful_count: input.ratings_count.successful.not_helpful_count,
                total_count: input.ratings_count.successful.total
            },
            unsuccessful: {
                helpful_count: input.ratings_count.unsuccessful.helpful_count,
                not_helpful_count: input.ratings_count.unsuccessful.not_helpful_count,
                total_count: input.ratings_count.unsuccessful.total
            }
        },
        notes: {
            last_updated_at: new Date(input.notes_count.last_updated_at).toISOString(),
            awaiting_count: input.notes_count.awaiting_more_ratings,
            helpful_count: input.notes_count.currently_rated_helpful,
            not_helpful_count: input.notes_count.currently_rated_not_helpful
        }
    };
};

export const formatBirdwatchNote = (input: _BirdwatchNote): BirdwatchNote => {
    return {
        __type: 'BirdwatchNote',
        id: input.rest_id,
        author: formatBirdwatchContributor(input.birdwatch_profile),
        created_at: new Date(input.created_at).toISOString(),
        has_trustworthy_sources: !!input.data_v1.trustworthy_sources,
        status: input.rating_status,
        tags: {
            helpful: input.helpful_tags,
            not_helpful: input.not_helpful_tags,
        },
        text: input.data_v1.summary.text,
        tweet_id: input.tweet_results.result.rest_id,
        views_count: input.impression_count
    };
};

export const formatBirdwatchTweet = (input: _BirdwatchTweet): BirdwatchTweet => {
    return {
        // @ts-ignore
        note_needed: input.not_misleading_birdwatch_notes.notes.map(note => ({
            ...formatBirdwatchNote(note),
            ...{
                tweet_tags: {
                    classification: note.data_v1.classification,
                    misleading: note.data_v1.misleading_tags || []
                }
            }
        })),
        // @ts-ignore
        note_not_needed: input.not_misleading_birdwatch_notes.notes.map(note => ({
            ...formatBirdwatchNote(note),
            ...{
                tweet_tags: {
                    classification: note.data_v1.classification,
                    misleading: note.data_v1.not_misleading_tags || []
                }
            }
        }))
    };
};
