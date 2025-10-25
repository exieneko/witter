import type { Cursor, Tweet, User } from './index.js';

export interface Notification {
    __type: 'Notification',
    id: string,
    created_at: string,
    text?: string,
    type: NotificationKind,
    tweets: Tweet[],
    users: User[]
}

export enum NotificationKind {
    NewTweets = 'NewTweets',
    RecommendedTweets = 'RecommendedTweets',

    Mentioned = 'Mentioned',
    NewFollowers = 'NewFollowers',
    TweetLiked = 'TweetLiked',
    TweetRetweeted = 'TweetRetweeted',
    RetweetLiked = 'RetweetLiked',
    RetweetRetweeted = 'RetweetRetweeted',
    AddedToList = 'AddedToList',
    ListSubscribedTo = 'ListSubscribedTo',
    PollFinished = 'PollFinished',

    BirdwatchNoteNeedsHelp = 'BirdwatchNoteNeedsHelp',
    BirdwatchNoteRatedHelpful = 'BirdwatchNoteRatedHelpful',
    BirdwatchNoteRatedNotHelpful = 'BirdwatchNoteRatedNotHelpful',
    BirdwatchNoteRatedDeleted = 'BirdwatchNoteRatedDeleted',

    LoggedIn = 'LoggedIn',
    ReportReceived = 'ReportReceived',
    Advertisement = 'Advertisement',
    Unknown = 'Unknown'
}

export type TimelineNotification = Notification | Cursor;

export interface UnreadCount {
    notifications: number,
    inbox: number
}
