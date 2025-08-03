import { endpoints, PUBLIC_TOKEN } from './consts.js';
import { type Params, request } from './utils.js';

interface CursorOnly {
    cursor?: string
}

export class TwitterClient {
    private headers;

    constructor(lang: string, login: { authToken: string, authMulti?: string, csrf: string }) {
        this.headers = {
            authorization: PUBLIC_TOKEN,
            'content-type': 'application/json',
            'x-csrf-token': login.csrf,
            'x-twitter-active-user': 'yes',
            'x-twitter-auth-type': 'OAuth2Session',
            'x-twitter-client-language': lang || 'en',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
            cookie: login.authMulti ? `auth_token=${login.authToken}; ct0=${login.csrf}` : `auth_token=${login.authToken}; auth_multi="${login.authMulti}"; ct0=${login.csrf}`
        };
    }

    async getBlockedUsers(args?: CursorOnly) {
        return await request(endpoints.BlockedAccountsAll, this.headers, args);
    }
    async getMutedUsers(args?: CursorOnly) {
        return await request(endpoints.MutedAccounts, this.headers, args);
    }
    async verifyCredentials() {
        return await request(endpoints.account_verify_credentials, this.headers);
    }
    async getAccounts() {
        return await request(endpoints.account_multi_list, this.headers);
    }
    async switchAccount(id: string) {
        return await request(endpoints.account_multi_switch, this.headers, { user_id: id });
    }
    async updateProfile(args: Params<typeof endpoints.account_update_profile>) {
        return await request(endpoints.account_update_profile, this.headers, args);
    }
    async getSettings() {
        return await request(endpoints.account_settings, this.headers);
    }
    async getMutedPhrases() {
        return await request(endpoints.mutes_keywords_list, this.headers);
    }
    /**
     * `mute_surfaces: home_timeline,tweet_replies,notifications`  
     * `mute_options: exclude_following_accounts`
     */
    async mutePhrase(phrase: string, args: { mute_surfaces: string, mute_options: string, duration: string }) {
        return await request(endpoints.mutes_keywords_create, this.headers, { keyword: phrase, ...args });
    }
    async unmutePhrase(id: string) {
        return await request(endpoints.mutes_keywords_destroy, this.headers, { ids: id });
    }



    async getBookmarks(args?: CursorOnly) {
        return await request(endpoints.Bookmarks, this.headers, args);
    }
    async clearBookmarks() {
        return await request(endpoints.BookmarksAllDelete, this.headers);
    }



    async getCommunity(id: string) {
        return await request(endpoints.CommunityByRestId, this.headers, { communityId: id });
    }
    async getCommunityTweets(id: string, args?: { rankingMode: 'Relevance' | 'Recency' } & CursorOnly) {
        return await request(endpoints.CommunityTweetsTimeline, this.headers, { communityId: id, rankingMode: args?.rankingMode || 'Relevance', cursor: args?.cursor });
    }
    async getCommunityMedia(id: string, args?: CursorOnly) {
        return await request(endpoints.CommunityMediaTimeline, this.headers, { communityId: id, cursor: args?.cursor });
    }
    async searchCommunity(id: string, query: string, args?: { rankingMode: 'Recency' | 'Likes' } & CursorOnly) {
        return await request(endpoints.CommunityTweetSearchModuleQuery, this.headers, { communityId: id, query, timelineRankingMode: args?.rankingMode || 'Likes', timelineId: `communityTweetSearch-${id}-a-${args?.rankingMode || 'Likes'}`, cursor: args?.cursor });
    }
    async getCommunityMembers(id: string, args?: CursorOnly) {
        return await request(endpoints.membersSliceTimeline_Query, this.headers, { communityId: id, cursor: args?.cursor });
    }
    async getCommunityModerators(id: string, args?: CursorOnly) {
        return await request(endpoints.moderatorsSliceTimeline_Query, this.headers, { communityId: id, cursor: args?.cursor });
    }
    async getCommunitiesTimeline(args?: CursorOnly) {
        return await request(endpoints.CommunitiesExploreTimeline, this.headers, { cursor: args?.cursor });
    }
    async joinCommunity(id: string) {
        return await request(endpoints.JoinCommunity, this.headers, { communityId: id });
    }
    async leaveCommunity(id: string) {
        return await request(endpoints.LeaveCommunity, this.headers, { communityId: id });
    }
    async pinCommunity(id: string) {
        return await request(endpoints.PinTimeline, this.headers, { pinnedTimelineItem: { id, pinned_timeline_type: 'Community' } });
    }
    async unpinCommunity(id: string) {
        return await request(endpoints.UnpinTimeline, this.headers, { pinnedTimelineItem: { id, pinned_timeline_type: 'Community' } });
    }
    async canCreateCommunity() {
        return (await request(endpoints.CommunitiesCreateButtonQuery, this.headers)).result
    }



    async getExplorePage(args?: CursorOnly) {
        return await request(endpoints.ExplorePage, this.headers, args);
    }
    async getGenericTimeline(id: string) {
        return await request(endpoints.GenericTimelineById, this.headers, { timelineId: id });
    }
    async getTrends() {
        return await request(endpoints.ExploreSidebar, this.headers);
    }
    async getRecommendedUsers(userId: string) {
        return await request(endpoints.SidebarUserRecommendations, this.headers, { profileUserId: userId });
    }
    async getHashflags() {
        return await request(endpoints.hashflags, this.headers);
    }



    async createList(args: { name: string, description?: string, isPrivate?: boolean }) {
        return await request(endpoints.CreateList, this.headers, { name: args.name, description: args.description || '', isPrivate: args.isPrivate || false });
    }
    async updateList(id: string, args: { name: string, description: string, isPrivate: boolean }) {
        return await request(endpoints.UpdateList, this.headers, { listId: id, ...args });
    }
    async deleteList(id: string) {
        return await request(endpoints.DeleteList, this.headers, { listId: id });
    }
    async getListsTimeline() {
        return await request(endpoints.ListsManagementPageTimeline, this.headers);
    }
    async getList(id: string) {
        return await request(endpoints.ListByRestId, this.headers, { listId: id });
    }
    async getListTweets(id: string, args?: CursorOnly) {
        return await request(endpoints.ListLatestTweetsTimeline, this.headers, { listId: id, cursor: args?.cursor });
    }
    async getListMembers(id: string, args?: CursorOnly) {
        return await request(endpoints.ListMembers, this.headers, { listId: id, cursor: args?.cursor });
    }
    async getListSubscribers(id: string, args?: CursorOnly) {
        return await request(endpoints.ListSubscribers, this.headers, { listId: id, cursor: args?.cursor });
    }
    async subscribeToList(id: string) {
        return await request(endpoints.ListSubscribe, this.headers, { listId: id });
    }
    async unsubscribeFromList(id: string) {
        return await request(endpoints.ListUnsubscribe, this.headers, { listId: id });
    }
    async addMemberToList(listId: string, userId: string) {
        return await request(endpoints.ListAddMember, this.headers, { listId, userId });
    }
    async removeMemberFromList(listId: string, userId: string) {
        return await request(endpoints.ListRemoveMember, this.headers, { listId, userId });
    }



    async getNotifications(args?: { type: 'All' | 'Verified' | 'Mentions' } & CursorOnly) {
        return await request(endpoints.NotificationsTimeline, this.headers, { timeline_type: args?.type || 'All', cursor: args?.cursor });
    }
    async getNotificationsCount() {
        return await request(endpoints.badge_count, this.headers);
    }
    async getNotificationTweets(args?: CursorOnly) {
        return await request(endpoints.notifications_device_follow, this.headers, args);
    }



    async search(query: string, args?: { source?: 'typed_query' | 'recent_search_click' | 'tdqt', type?: 'Top' | 'Latest' | 'People' | 'Media' | 'Lists' } & CursorOnly) {
        return await request(endpoints.SearchTimeline, this.headers, { rawQuery: query, querySource: args?.source || 'typed_query', product: args?.type || 'Top', cursor: args?.cursor });
    }
    async searchTypeahead(query: string) {
        return await request(endpoints.search_typeahead, this.headers, { q: query });
    }



    async getChronologicalTimeline(args?: CursorOnly) {
        return await request(endpoints.HomeLatestTimeline, this.headers, args);
    }
    async getAlgorithmicalTimeline(args?: { seenTweetIds?: string[] } & CursorOnly) {
        return await request(endpoints.HomeTimeline, this.headers, args);
    }



    async followTopic(id: string) {
        return await request(endpoints.TopicFollow, this.headers, { topicId: id });
    }
    async unfollowTopic(id: string) {
        return await request(endpoints.TopicUnfollow, this.headers, { topicId: id });
    }
    async notInterestedInTopic(id: string) {
        return await request(endpoints.TopicNotInterested, this.headers, { topicId: id });
    }
    async undoNotInterestedInTopic(id: string) {
        return await request(endpoints.TopicUndoNotInterested, this.headers, { topicId: id });
    }



    async createTweet(text: string, args?: { conversationControl?: 'Community' | 'Verified' | 'ByInvitation', media?: { id: string, taggedUsers: string[] }[] }) {
        return await request(endpoints.CreateTweet, this.headers, {
            tweet_text: text,
            conversation_control: args?.conversationControl ? { mode: args.conversationControl } : undefined,
            media: {
                media_entities: args?.media?.map(media => ({
                    media_id: media.id,
                    tagged_users: media.taggedUsers
                })) || [],
                possibly_sensitive: false
            }
        });
    }
    async deleteTweet(id: string) {
        return await request(endpoints.DeleteTweet, this.headers, { tweet_id: id });
    }
    async getTweet(id: string, args?: { rankingMode?: 'Relevance' | 'Recency' | 'Likes' } & CursorOnly) {
        return await request(endpoints.TweetDetail, this.headers, { focalTweetId: id, rankingMode: args?.rankingMode || 'Relevance', cursor: args?.cursor });
    }
    async getHiddenReplies(id: string, args?: CursorOnly) {
        return await request(endpoints.ModeratedTimeline, this.headers, { rootTweetId: id, cursor: args?.cursor });
    }
    async getTweetLikers(id: string, args?: CursorOnly) {
        return await request(endpoints.Favoriters, this.headers, { tweetId: id, cursor: args?.cursor });
    }
    async getTweetRetweeters(id: string, args?: CursorOnly) {
        return await request(endpoints.Retweeters, this.headers, { tweetId: id, cursor: args?.cursor });
    }
    async getTweetQuoteTweets(id: string, args?: CursorOnly) {
        return await request(endpoints.SearchTimeline, this.headers, { rawQuery: `quoted_tweet_id:${id}`, querySource: 'tdqt', product: 'Top', cursor: args?.cursor });
    }

    async likeTweet(id: string) {
        return await request(endpoints.FavoriteTweet, this.headers, { tweet_id: id });
    }
    async unlikeTweet(id: string) {
        return await request(endpoints.UnfavoriteTweet, this.headers, { tweet_id: id });
    }
    async retweetTweet(id: string) {
        return await request(endpoints.CreateRetweet, this.headers, { tweet_id: id });
    }
    async unretweetTweet(id: string) {
        return await request(endpoints.DeleteRetweet, this.headers, { source_tweet_id: id });
    }
    async bookmarkTweet(id: string) {
        return await request(endpoints.CreateBookmark, this.headers, { tweet_id: id });
    }
    async unbookmarkTweet(id: string) {
        return await request(endpoints.DeleteBookmark, this.headers, { tweet_id: id });
    }
    async hideReply(id: string) {
        return await request(endpoints.ModerateTweet, this.headers, { tweetId: id });
    }
    async unhideReply(id: string) {
        return await request(endpoints.UnmoderateTweet, this.headers, { tweetId: id });
    }
    async pinTweet(id: string) {
        return await request(endpoints.PinTweet, this.headers, { tweet_id: id });
    }
    async unpinTweet(id: string) {
        return await request(endpoints.UnpinTweet, this.headers, { tweet_id: id });
    }
    async changeTweetReplyPermissions(id: string, args: { permission: 'Community' | 'Verified' | 'ByInvitation' | null }) {
        if (!args.permission) {
            return await request(endpoints.ConversationControlDelete, this.headers, { tweet_id: id });
        }

        return await request(endpoints.ConversationControlChange, this.headers, { tweet_id: id, mode: args.permission });
    }
    async leaveConversation(id: string) {
        return await request(endpoints.UnmentionUserFromConversation, this.headers, { tweet_id: id });
    }
    /** unimplemented */
    async createCard() {
        return await request(endpoints.cards_create, this.headers, {});
    }
    /** `choice` should be a number from 0 to 3 */
    async vote(choice: number, args: { cardUri: string, tweetId: string, cardName: string }) {
        return await request(endpoints.passthrough, this.headers, { card_uri: args.cardUri, original_tweet_id: args.tweetId, response_card_name: args.cardName, selected_choice: choice - 1 });
    }
    async muteConversation(id: string) {
        return await request(endpoints.mutes_conversations_create, this.headers, { tweet_id: id });
    }
    async unmuteConversation(id: string) {
        return await request(endpoints.mutes_conversations_destroy, this.headers, { tweet_id: id });
    }



    async getUser(id: string, args?: { byUsername?: boolean }) {
        return await (args?.byUsername || !/^\d+$/.test(id)
            ? request(endpoints.UserByScreenName, this.headers, { screen_name: id })
            : request(endpoints.UserByRestId, this.headers, { userId: id }));
    }
    async getUsers(ids: string[]) {
        return await request(endpoints.UsersByRestIds, this.headers, { userIds: ids });
    }
    async getUserTweets(id: string, args?: CursorOnly) {
        return await request(endpoints.UserTweets, this.headers, { userId: id, cursor: args?.cursor });
    }
    async getUserTweetsAndReplies(id: string, args?: CursorOnly) {
        return await request(endpoints.UserTweetsAndReplies, this.headers, { userId: id, cursor: args?.cursor });
    }
    async getUserMedia(id: string, args?: CursorOnly) {
        return await request(endpoints.UserMedia, this.headers, { userId: id, cursor: args?.cursor });
    }
    async getUserLikes(id: string, args?: CursorOnly) {
        return await request(endpoints.Likes, this.headers, { userId: id, cursor: args?.cursor });
    }
    async getUserFollowing(id: string, args?: CursorOnly) {
        return await request(endpoints.Following, this.headers, { userId: id, cursor: args?.cursor });
    }
    async getUserFollowers(id: string, args?: CursorOnly) {
        return await request(endpoints.Followers, this.headers, { userId: id, cursor: args?.cursor });
    }
    async getUserFollowersYouKnow(id: string, args?: CursorOnly) {
        return await request(endpoints.FollowersYouKnow, this.headers, { userId: id, cursor: args?.cursor });
    }
    async getUserLists(id: string, args?: CursorOnly) {
        return await request(endpoints.CombinedLists, this.headers, { userId: id, cursor: args?.cursor });
    }
    async getFollowRequests(id: string, args?: { cursor?: number }) {
        return await request(endpoints.friendships_incoming, this.headers, { user_id: id, cursor: args?.cursor || -1 });
    }
    async getFriendsFollowing(id: string) {
        return await request(endpoints.friends_following_list, this.headers, { user_id: id });
    }

    async followUser(id: string) {
        return await request(endpoints.friendships_create, this.headers, { user_id: id });
    }
    async unfollowUser(id: string) {
        return await request(endpoints.friendships_destroy, this.headers, { user_id: id });
    }
    async toggleUserNotifications(id: string, args: { enable: boolean }) {
        return await request(endpoints.friendships_update_device, this.headers, { id, device: args.enable });
    }
    async toggleUserRetweets(id: string, args: { enable: boolean }) {
        return await request(endpoints.friendships_update_retweets, this.headers, { id, retweets: args.enable });
    }
    async cancelFollowRequest(id: string) {
        return await request(endpoints.friendships_cancel, this.headers, { user_id: id });
    }
    async removeFollower(id: string) {
        return await request(endpoints.RemoveFollower, this.headers, { target_user_id: id });
    }
    async acceptFollowRequest(id: string) {
        return await request(endpoints.friendships_accept, this.headers, { user_id: id });
    }
    async declineFollowRequest(id: string) {
        return await request(endpoints.friendships_deny, this.headers, { user_id: id });
    }
    async blockUser(id: string) {
        return await request(endpoints.blocks_create, this.headers, { user_id: id });
    }
    async unblockUser(id: string) {
        return await request(endpoints.blocks_destroy, this.headers, { user_id: id });
    }
    async muteUser(id: string) {
        return await request(endpoints.mutes_users_create, this.headers, { user_id: id });
    }
    async unmuteUser(id: string) {
        return await request(endpoints.mutes_users_destroy, this.headers, { user_id: id });
    }
}
