import { formatTweet } from './index.js';

import type { BirdwatchAuthenticatedUser, BirdwatchContributor, BirdwatchNote, BirdwatchTweet, Entry, Segment, TimelineTweet, Tweet } from '../types/index.js';
import type { _Entry, SegmentedTimelines } from '../types/raw/index.js';
import type { _BirdwatchAuthenticatedUser, _BirdwatchContributor, _BirdwatchNote, _BirdwatchTweet } from '../types/raw/birdwatch.js';
import type { _TweetConversationItem } from '../types/raw/items.js';
import type { _Tweet } from '../types/raw/tweet.js';

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

export const formatBirdwatchAuthenticatedUser = (input: _BirdwatchAuthenticatedUser): BirdwatchAuthenticatedUser => {
    return {
        __type: 'BirdwatchUser',
        alias: input.alias,
        canWriteNotes: input.can_write_notes,
        enrollment: {
            hasEarnedIn: input.user_enrollment.enrollment_state === 'EarnedIn',
            lastUpdatedAt: new Date(input.user_enrollment.timestamp_of_last_state_change).toISOString(),
            requiredRating: input.user_enrollment.successful_rating_needed_to_earn_in || 0
        },
        notificationFrequency: input.notification_settings.needs_your_help_frequency === 'All' ? 'daily' : input.notification_settings.needs_your_help_frequency === 'Week' ? 'weekly' : input.notification_settings.needs_your_help_frequency === 'Month' ? 'monthly' : 'never'
    }
};

export const formatBirdwatchNote = (input: _BirdwatchNote): BirdwatchNote => {
    return {
        __type: 'BirdwatchNote',
        id: input.rest_id,
        author: formatBirdwatchContributor(input.birdwatch_profile),
        createdAt: new Date(input.created_at).toISOString(),
        hasTrustworthySources: !!input.data_v1.trustworthy_sources,
        lang: input.language ?? 'zxx',
        rating: input.rating ? {
            __type: input.rating.data_v2.helpfulness_level,
            helpful_tags: input.rating.data_v2.helpful_tags || [],
            not_helpful_tags: input.rating.data_v2.not_helpful_tags || []
        } : undefined,
        similarTweetsCount: input.media_note_matches_v2?.match_count || 0,
        showOnSimilarTweets: !!input.media_note_matches_v2?.shoud_show_matches,
        status: input.rating_status,
        tags: {
            helpful: input.helpful_tags,
            notHelpful: input.not_helpful_tags,
        },
        text: input.data_v1.summary.text,
        tweet: !!input.tweet_results.result?.__typename ? formatTweet(input.tweet_results.result) as Tweet : undefined,
        tweetId: input.tweet_results.result?.rest_id,
        viewsCount: input.impression_count
    };
};

export const formatBirdwatchTweet = (input: _BirdwatchTweet): BirdwatchTweet => {
    return {
        // @ts-ignore
        noteNeeded: input.misleading_birdwatch_notes.notes.map(note => ({
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
        })),
        canWriteNotes: !!input.can_user_write_notes_on_post_author
    };
};

export const formatBirdwatchTimeline = (input: _Entry<_TweetConversationItem>[], segments: SegmentedTimelines['timelines']): Entry<TimelineTweet | Segment>[] => {
    return [
        ...segments.map((segment, index) => ({
            id: `segment-${index}`,
            content: {
                __type: 'Segment',
                id: segment.timeline.id,
                name: segment.id
            } satisfies Segment
        })),
        ...input.map(entry => entry.content.__typename === 'TimelineTimelineModule' && (entry.content.items || []).at(0)?.item.itemContent.__typename === 'TimelineTweet' ? {
            id: entry.entryId,
            // @ts-ignore
            content: formatTweet(entry.content.items.at(0)?.item.itemContent.tweet_results.result as _Tweet)
        } : null).filter(x => !!x)
    ];
};
