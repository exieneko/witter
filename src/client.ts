import { ENDPOINTS } from './endpoints.js';
import type { ByUsername, CursorOnly, Entry, SuspendedUser, TimelineTweet, TimelineUser, Tweet, TweetArgs, TweetTombstone, UnavailableUser, User } from './types/index.js';
import { TweetSort, TweetReplyPermission } from './types/index.js';
import { request, type Tokens } from './utils.js';

export interface BookmarkMethods {
    get(args?: CursorOnly): Promise<Array<Entry<TimelineTweet>>>,
    search(query: string, args?: CursorOnly): Promise<Array<Entry<TimelineTweet>>>,
    clear(): Promise<boolean>
}

export interface TweetMethods {
    get(id: string, args?: TweetArgs): Promise<Array<Entry<TimelineTweet>>>,
    getById(id: string, args?: TweetArgs): Promise<Tweet | TweetTombstone>,
    getByIds(id: Array<string>, args?: TweetArgs): Promise<Array<Tweet | TweetTombstone>>,
    hiddenReplies(id: string, args?: CursorOnly): Promise<Array<Entry<TimelineTweet>>>,
    likes(id: string, args?: CursorOnly): Promise<Array<Entry<TimelineUser>>>,
    retweets(id: string, args?: CursorOnly): Promise<Array<Entry<TimelineUser>>>,
    bookmark(id: string): Promise<boolean>,
    unbookmark(id: string): Promise<boolean>,
    like(id: string): Promise<boolean>,
    unlike(id: string): Promise<boolean>,
    retweet(id: string): Promise<boolean>,
    unretweet(id: string): Promise<boolean>,
    hide(id: string): Promise<boolean>,
    unhide(id: string): Promise<boolean>,
    pin(id: string): Promise<boolean>,
    unpin(id: string): Promise<boolean>,
    changeReplyPermission(id: string, permission?: TweetReplyPermission): Promise<boolean>,
    unmention(id: string): Promise<boolean>,
    mute(id: string): Promise<boolean>,
    unmute(id: string): Promise<boolean>
}

export interface UserMethods {
    get(id: string, args?: ByUsername): Promise<User | SuspendedUser | UnavailableUser>,
    getMany(ids: Array<string>, args?: ByUsername): Promise<Array<User | SuspendedUser | UnavailableUser>>,
    tweets(id: string, args?: CursorOnly): Promise<Array<Entry<TimelineTweet>>>,
    replies(id: string, args?: CursorOnly): Promise<Array<Entry<TimelineTweet>>>,
    media(id: string, args?: CursorOnly): Promise<Array<Entry<TimelineTweet>>>,
    likes(id: string, args?: CursorOnly): Promise<Array<Entry<TimelineTweet>>>,
    highlightedTweets(id: string, args?: CursorOnly): Promise<Array<Entry<TimelineTweet>>>,
    following(id: string, args?: CursorOnly): Promise<Array<Entry<TimelineUser>>>,
    followers(id: string, args?: CursorOnly): Promise<Array<Entry<TimelineUser>>>,
    followersYouKnow(id: string, args?: CursorOnly): Promise<Array<Entry<TimelineUser>>>,
    verifiedFollowers(id: string, args?: CursorOnly): Promise<Array<Entry<TimelineUser>>>,
    superFollowing(id: string, args?: CursorOnly): Promise<Array<Entry<TimelineUser>>>,
    affiliates(id: string, args?: CursorOnly): Promise<Array<Entry<TimelineUser>>>,
    follow(id: string, args?: ByUsername): Promise<boolean>,
    unfollow(id: string, args?: ByUsername): Promise<boolean>,
    retweets: EnableDisable,
    notifications: EnableDisable,
    cancelFollowRequest(id: string, args?: ByUsername): Promise<boolean>,
    acceptFollowRequest(id: string, args?: ByUsername): Promise<boolean>,
    declineFollowRequest(id: string, args?: ByUsername): Promise<boolean>,
    block(id: string, args?: ByUsername): Promise<boolean>,
    unblock(id: string, args?: ByUsername): Promise<boolean>,
    mute(id: string, args?: ByUsername): Promise<boolean>,
    unmute(id: string, args?: ByUsername): Promise<boolean>
}

export interface EnableDisable {
    enable(id: string): Promise<boolean>,
    disable(id: string): Promise<boolean>
}



export class TwitterClient {
    public bookmarks: BookmarkMethods;
    public tweet: TweetMethods;
    public user: UserMethods;

    constructor(tokens: Tokens) {
        this.bookmarks = {
            async get(args) {
                return await request(ENDPOINTS.Bookmarks, tokens, args);
            },
            async search(query, args) {
                return await request(ENDPOINTS.BookmarkSearchTimeline, tokens, { rawQuery: query, ...args });
            },
            async clear() {
                return await request(ENDPOINTS.BookmarksAllDelete, tokens);
            }
        };

        this.tweet = {
            async get(id, args) {
                const rankingMode = args?.sort === TweetSort.Recent
                    ? 'Recency'
                : args?.sort === TweetSort.Likes
                    ? 'Likes'
                    : 'Relevance';

                return await request(ENDPOINTS.TweetDetail, tokens, { focalTweetId: id, rankingMode, ...args });
            },
            async getById(id) {
                return await request(ENDPOINTS.TweetResultByRestId, tokens, { tweetId: id });
            },
            async getByIds(ids) {
                return await request(ENDPOINTS.TweetResultsByRestIds, tokens, { tweetIds: ids });
            },
            async hiddenReplies(id) {
                return await request(ENDPOINTS.ModeratedTimeline, tokens, { rootTweetId: id })
            },
            async likes(id) {
                return await request(ENDPOINTS.Favoriters, tokens, { tweetId: id });
            },
            async retweets(id) {
                return await request(ENDPOINTS.Retweeters, tokens, { tweetId: id });
            },
            async bookmark(id) {
                return await request(ENDPOINTS.CreateBookmark, tokens, { tweet_id: id });
            },
            async unbookmark(id) {
                return await request(ENDPOINTS.DeleteBookmark, tokens, { tweet_id: id });
            },
            async like(id) {
                return await request(ENDPOINTS.FavoriteTweet, tokens, { tweet_id: id });
            },
            async unlike(id) {
                return await request(ENDPOINTS.UnfavoriteTweet, tokens, { tweet_id: id });
            },
            async retweet(id) {
                return await request(ENDPOINTS.CreateRetweet, tokens, { tweet_id: id });
            },
            async unretweet(id) {
                return await request(ENDPOINTS.DeleteRetweet, tokens, { source_tweet_id: id });
            },
            async hide(id) {
                return await request(ENDPOINTS.ModerateTweet, tokens, { tweetId: id });
            },
            async unhide(id) {
                return await request(ENDPOINTS.UnmoderateTweet, tokens, { tweetId: id });
            },
            async pin(id) {
                return await request(ENDPOINTS.ModerateTweet, tokens, { tweetId: id });
            },
            async unpin(id) {
                return await request(ENDPOINTS.UnmoderateTweet, tokens, { tweetId: id });
            },
            async changeReplyPermission(id, permission) {
                if (!permission || permission === TweetReplyPermission.None) {
                    return await request(ENDPOINTS.ConversationControlDelete, tokens, { tweet_id: id });
                }

                const mode = permission === TweetReplyPermission.Following
                    ? 'Community'
                : permission === TweetReplyPermission.Verified
                    ? 'Verified'
                    : 'ByInvitation'

                return await request(ENDPOINTS.ConversationControlChange, tokens, { tweet_id: id, mode });
            },
            async unmention(id) {
                return await request(ENDPOINTS.UnmentionUserFromConversation, tokens, { tweet_id: id });
            },
            async mute(id) {
                return await request(ENDPOINTS.mutes_conversations_create, tokens, { tweet_id: id });
            },
            async unmute(id) {
                return await request(ENDPOINTS.mutes_conversations_destroy, tokens, { tweet_id: id });
            }
        };

        this.user = {
            async get(id, args) {
                if (args?.byUsername) {
                    return await request(ENDPOINTS.UserByScreenName, tokens, { screen_name: id });
                }

                return await request(ENDPOINTS.UserByRestId, tokens, { userId: id });
            },
            async getMany(ids, args) {
                if (args?.byUsername) {
                    return await request(ENDPOINTS.UsersByScreenNames, tokens, { screen_names: ids });
                }

                return await request(ENDPOINTS.UsersByRestIds, tokens, { userIds: ids });
            },
            async tweets(id, args) {
                return await request(ENDPOINTS.UserTweets, tokens, { userId: id, ...args });
            },
            async replies(id, args) {
                return await request(ENDPOINTS.UserTweetsAndReplies, tokens, { userId: id, ...args });
            },
            async media(id, args) {
                return await request(ENDPOINTS.UserMedia, tokens, { userId: id, ...args });
            },
            async likes(id, args) {
                return await request(ENDPOINTS.Likes, tokens, { userId: id, ...args });
            },
            async highlightedTweets(id, args) {
                return await request(ENDPOINTS.UserHighlightsTweets, tokens, { userId: id, ...args });
            },
            async following(id, args) {
                return await request(ENDPOINTS.Following, tokens, { userId: id, ...args });
            },
            async followers(id, args) {
                return await request(ENDPOINTS.Followers, tokens, { userId: id, ...args });
            },
            async followersYouKnow(id, args) {
                return await request(ENDPOINTS.FollowersYouKnow, tokens, { userId: id, ...args });
            },
            async verifiedFollowers(id, args) {
                return await request(ENDPOINTS.BlueVerifiedFollowers, tokens, { userId: id, ...args });
            },
            async superFollowing(id, args) {
                return await request(ENDPOINTS.UserCreatorSubscriptions, tokens, { userId: id, ...args });
            },
            async affiliates(id, args) {
                return await request(ENDPOINTS.UserBusinessProfileTeamTimeline, tokens, { userId: id, teamName: 'NotAssigned', ...args });
            },
            async follow(id, args) {
                return await request(ENDPOINTS.friendships_create, tokens, args?.byUsername ? { screen_name: id } : { user_id: id });
            },
            async unfollow(id, args) {
                return await request(ENDPOINTS.friendships_destroy, tokens, args?.byUsername ? { screen_name: id } : { user_id: id });
            },
            retweets: {
                async enable(id) {
                    return await request(ENDPOINTS.friendships_update, tokens, { id: id, retweets: true });
                },
                async disable(id) {
                    return await request(ENDPOINTS.friendships_update, tokens, { id: id, retweets: false });
                }
            },
            notifications: {
                async enable(id) {
                    return await request(ENDPOINTS.friendships_update, tokens, { id: id, device: true });
                },
                async disable(id) {
                    return await request(ENDPOINTS.friendships_update, tokens, { id: id, device: false });
                }
            },
            async cancelFollowRequest(id, args) {
                return await request(ENDPOINTS.friendships_cancel, tokens, args?.byUsername ? { screen_name: id } : { user_id: id });
            },
            async acceptFollowRequest(id, args) {
                return await request(ENDPOINTS.friendships_accept, tokens, args?.byUsername ? { screen_name: id } : { user_id: id });
            },
            async declineFollowRequest(id, args) {
                return await request(ENDPOINTS.friendships_deny, tokens, args?.byUsername ? { screen_name: id } : { user_id: id });
            },
            async block(id, args) {
                return await request(ENDPOINTS.blocks_create, tokens, args?.byUsername ? { screen_name: id } : { user_id: id });
            },
            async unblock(id, args) {
                return await request(ENDPOINTS.blocks_destroy, tokens, args?.byUsername ? { screen_name: id } : { user_id: id });
            },
            async mute(id, args) {
                return await request(ENDPOINTS.mutes_users_create, tokens, args?.byUsername ? { screen_name: id } : { user_id: id });
            },
            async unmute(id, args) {
                return await request(ENDPOINTS.mutes_users_destroy, tokens, args?.byUsername ? { screen_name: id } : { user_id: id });
            }
        };
    }
}
