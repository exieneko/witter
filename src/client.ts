import { ENDPOINTS } from './endpoints.js';
import { type CursorOnly, TweetSort, type ByUsername, type TweetArgs, TweetReplyPermission } from './types/index.js';
import { type Endpoint, request, type Tokens } from './utils.js';

export class TwitterClient {
    constructor(private tokens: Tokens) {}

    async fetch<T extends Endpoint>(endpoint: T, args: T['params']) {
        return await request(endpoint, this.tokens, { ...args });
    }



    async getTweet(id: string, args?: TweetArgs) {
        const rankingMode = args?.sort === TweetSort.Recent
            ? 'Recency'
        : args?.sort === TweetSort.Likes
            ? 'Likes'
            : 'Relevance';

        return await this.fetch(ENDPOINTS.TweetDetail, { focalTweetId: id, rankingMode, ...args });
    }

    async getTweetById(id: string) {
        return await this.fetch(ENDPOINTS.TweetResultByRestId, { tweetId: id });
    }

    async getTweetsByIds(ids: Array<string>) {
        return await this.fetch(ENDPOINTS.TweetResultsByRestIds, { tweetIds: ids });
    }

    async getHiddenReplies(id: string) {
        return await this.fetch(ENDPOINTS.ModeratedTimeline, { rootTweetId: id })
    }

    async getTweetLikes(id: string) {
        return await this.fetch(ENDPOINTS.Favoriters, { tweetId: id });
    }

    async getTweetRetweets(id: string) {
        return await this.fetch(ENDPOINTS.Retweeters, { tweetId: id });
    }

    async likeTweet(id: string) {
        return await this.fetch(ENDPOINTS.FavoriteTweet, { tweet_id: id });
    }

    async unlikeTweet(id: string) {
        return await this.fetch(ENDPOINTS.UnfavoriteTweet, { tweet_id: id });
    }

    async retweetTweet(id: string) {
        return await this.fetch(ENDPOINTS.CreateRetweet, { tweet_id: id });
    }

    async unretweetTweet(id: string) {
        return await this.fetch(ENDPOINTS.DeleteRetweet, { source_tweet_id: id });
    }

    async hideReply(id: string) {
        return await this.fetch(ENDPOINTS.ModerateTweet, { tweetId: id });
    }

    async unhideReply(id: string) {
        return await this.fetch(ENDPOINTS.UnmoderateTweet, { tweetId: id });
    }

    async pinTweet(id: string) {
        return await this.fetch(ENDPOINTS.ModerateTweet, { tweetId: id });
    }

    async unpinTweet(id: string) {
        return await this.fetch(ENDPOINTS.UnmoderateTweet, { tweetId: id });
    }

    async lockTweetReplies(id: string, permission: TweetReplyPermission = TweetReplyPermission.None) {
        if (permission === TweetReplyPermission.None) {
            return await this.fetch(ENDPOINTS.ConversationControlDelete, { tweet_id: id });
        }

        const mode = permission === TweetReplyPermission.Following
            ? 'Community'
        : permission === TweetReplyPermission.Verified
            ? 'Verified'
            : 'ByInvitation'

        return await this.fetch(ENDPOINTS.ConversationControlChange, { tweet_id: id, mode });
    }

    async unmention(tweetId: string) {
        return await this.fetch(ENDPOINTS.UnmentionUserFromConversation, { tweet_id: tweetId });
    }

    async muteTweet(id: string) {
        return await this.fetch(ENDPOINTS.mutes_conversations_create, { tweet_id: id });
    }

    async unmuteTweet(id: string) {
        return await this.fetch(ENDPOINTS.mutes_conversations_destroy, { tweet_id: id });
    }



    async getUser(id: string, args?: ByUsername) {
        if (args?.byUsername) {
            return await this.fetch(ENDPOINTS.UserByScreenName, { screen_name: id });
        }

        return await this.fetch(ENDPOINTS.UserByRestId, { userId: id });
    }

    async getUsers(ids: Array<string>, args?: ByUsername) {
        if (args?.byUsername) {
            return await this.fetch(ENDPOINTS.UsersByScreenNames, { screen_names: ids });
        }

        return await this.fetch(ENDPOINTS.UsersByRestIds, { userIds: ids });
    }

    async getUserTweets(id: string, args?: CursorOnly) {
        return await this.fetch(ENDPOINTS.UserTweets, { userId: id, ...args });
    }

    async getUserTweetsAndReplies(id: string, args?: CursorOnly) {
        return await this.fetch(ENDPOINTS.UserTweetsAndReplies, { userId: id, ...args });
    }

    async getUserMedia(id: string, args?: CursorOnly) {
        return await this.fetch(ENDPOINTS.UserMedia, { userId: id, ...args });
    }

    async getUserLikes(id: string, args?: CursorOnly) {
        return await this.fetch(ENDPOINTS.Likes, { userId: id, ...args });
    }

    async getUserHighlightedTweets(id: string, args?: CursorOnly) {
        return await this.fetch(ENDPOINTS.UserHighlightsTweets, { userId: id, ...args });
    }

    async getFollowing(id: string, args?: CursorOnly) {
        return await this.fetch(ENDPOINTS.Following, { userId: id, ...args });
    }

    async getFollowers(id: string, args?: CursorOnly) {
        return await this.fetch(ENDPOINTS.Followers, { userId: id, ...args });
    }

    async getFollowersYouKnow(id: string, args?: CursorOnly) {
        return await this.fetch(ENDPOINTS.FollowersYouKnow, { userId: id, ...args });
    }

    async getVerifiedFollowers(id: string, args?: CursorOnly) {
        return await this.fetch(ENDPOINTS.BlueVerifiedFollowers, { userId: id, ...args });
    }

    async getSuperFollowing(id: string, args?: CursorOnly) {
        return await this.fetch(ENDPOINTS.UserCreatorSubscriptions, { userId: id, ...args });
    }

    async getAffiliates(id: string, args?: CursorOnly) {
        return await this.fetch(ENDPOINTS.UserBusinessProfileTeamTimeline, { userId: id, teamName: 'NotAssigned', ...args });
    }

    async followUser(id: string, args?: ByUsername) {
        return await this.fetch(ENDPOINTS.friendships_create, args?.byUsername ? { screen_name: id } : { user_id: id });
    }

    async unfollowUser(id: string, args?: ByUsername) {
        return await this.fetch(ENDPOINTS.friendships_destroy, args?.byUsername ? { screen_name: id } : { user_id: id });
    }

    async enableRetweets(userId: string) {
        return await this.fetch(ENDPOINTS.friendships_update, { id: userId, retweets: true });
    }

    async disableRetweets(userId: string) {
        return await this.fetch(ENDPOINTS.friendships_update, { id: userId, retweets: false });
    }

    async enableNotifications(userId: string) {
        return await this.fetch(ENDPOINTS.friendships_update, { id: userId, device: true });
    }

    async disableNotifications(userId: string) {
        return await this.fetch(ENDPOINTS.friendships_update, { id: userId, device: false });
    }

    async cancelFollowRequest(id: string, args?: ByUsername) {
        return await this.fetch(ENDPOINTS.friendships_cancel, args?.byUsername ? { screen_name: id } : { user_id: id });
    }

    async acceptFollowRequest(id: string, args?: ByUsername) {
        return await this.fetch(ENDPOINTS.friendships_accept, args?.byUsername ? { screen_name: id } : { user_id: id });
    }

    async declineFollowRequest(id: string, args?: ByUsername) {
        return await this.fetch(ENDPOINTS.friendships_deny, args?.byUsername ? { screen_name: id } : { user_id: id });
    }

    async blockUser(id: string, args?: ByUsername) {
        return await this.fetch(ENDPOINTS.blocks_create, args?.byUsername ? { screen_name: id } : { user_id: id });
    }

    async unblockUser(id: string, args?: ByUsername) {
        return await this.fetch(ENDPOINTS.blocks_destroy, args?.byUsername ? { screen_name: id } : { user_id: id });
    }

    async muteUser(id: string, args?: ByUsername) {
        return await this.fetch(ENDPOINTS.mutes_users_create, args?.byUsername ? { screen_name: id } : { user_id: id });
    }

    async unmuteUser(id: string, args?: ByUsername) {
        return await this.fetch(ENDPOINTS.mutes_users_destroy, args?.byUsername ? { screen_name: id } : { user_id: id });
    }
}
