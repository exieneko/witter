import type { User } from './user.js';

type NotificationType =
    'tweets_from_following' |
    'users_liked_your_tweet' | 'users_liked_your_retweet' | 'users_followed_you' | 'user_mentioned_you' | 'users_subscribed_to_your_list' |
    'report_received' | 'login_notification' | 'birdwatch_note_rated_as_helpful' | 'birdwatch_note_rated_as_not_helpful';

export interface Notification {
    __type: 'Notification',
    id: string,
    createdAt: string,
    text: string,
    type: NotificationType,
    users?: User[]
}

export interface UnreadNotifications {
    notifications: number,
    inbox: number
}
