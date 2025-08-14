import type { Tweet, TweetTombstone } from './tweet.js';
import type { User } from './user.js';

type NotificationType =
    'tweets_from_following' | 'tweets_from_recommended' |
    'users_liked_your_tweet' | 'users_liked_your_retweet' | 'users_followed_you' | 'user_mentioned_you' | 'users_subscribed_to_your_list' |
    'poll_finished' |
    'birdwatch_note_needs_help' | 'birdwatch_note_rated_as_helpful' | 'birdwatch_note_rated_as_not_helpful' | 'birdwatch_note_rated_post_deleted' |
    'report_received' | 'login_notification' |
    'advertisement';

export interface Notification {
    __type: 'Notification',
    id: string,
    createdAt: string,
    objectId?: string,
    text?: string,
    type: NotificationType,
    tweet?: Tweet | TweetTombstone,
    users?: User[]
}

export interface UnreadNotifications {
    notifications: number,
    inbox: number
}
