import { endpoints } from './consts.js';
import { type Params, request, Tokens } from './utils.js';

import { formatGenericTimeline } from './formatter/index.js';
import type { BirdwatchHelpfulTag, BirdwatchNotHelpfulTag, Trend } from './types/index.js';
import type { TimelineTweet } from './types/tweet.js';
import type { _ExploreTrendItem, _TweetConversationItem } from './types/raw/items.js';

interface CursorOnly {
    cursor?: string
}

interface ByUsername {
    byUsername?: boolean
}

export class TwitterClient {
    constructor(private tokens: Tokens) {}

    async getBlockedUsers(args?: CursorOnly) {
        return await request(endpoints.BlockedAccountsAll, this.tokens, args);
    }
    async getMutedUsers(args?: CursorOnly) {
        return await request(endpoints.MutedAccounts, this.tokens, args);
    }
    async verifyCredentials() {
        return await request(endpoints.account_verify_credentials, this.tokens);
    }
    async getAccounts() {
        return await request(endpoints.account_multi_list, this.tokens);
    }
    async switchAccount(id: string) {
        return await request(endpoints.account_multi_switch, this.tokens, { user_id: id });
    }
    async updateProfile(args: Params<typeof endpoints.account_update_profile>) {
        return await request(endpoints.account_update_profile, this.tokens, args);
    }
    async getSettings() {
        return await request(endpoints.account_settings, this.tokens);
    }
    async getMutedPhrases() {
        return await request(endpoints.mutes_keywords_list, this.tokens);
    }
    /**
     * `mute_surfaces: home_timeline,tweet_replies,notifications`  
     * `mute_options: exclude_following_accounts`
     */
    async mutePhrase(phrase: string, args: { mute_surfaces: string, mute_options: string, duration: string }) {
        return await request(endpoints.mutes_keywords_create, this.tokens, { keyword: phrase, ...args });
    }
    async unmutePhrase(id: string) {
        return await request(endpoints.mutes_keywords_destroy, this.tokens, { ids: id });
    }



    async getBirdwatchTimeline() {
        return await request(endpoints.BirdwatchFetchGlobalTimeline, this.tokens);
    }
    async getBirdwatchAlternateTimeline(timelineId: string) {
        const data = await request(endpoints.GenericTimelineById, this.tokens, { timelineId });
        return formatGenericTimeline<_TweetConversationItem, TimelineTweet>(data, 'birdwatch');
    }
    async getBirdwatchContributor(alias: string) {
        return await request(endpoints.BirdwatchFetchBirdwatchProfile, this.tokens, { alias });
    }
    async getBirdwatchUser() {
        return await request(endpoints.BirdwatchFetchAuthenticatedUserProfile, this.tokens);
    }
    async changeBirdwatchNotificationFrequency(frequency: 'All' | 'Week' | 'Month' | 'Never') {
        return await request(endpoints.BirdwatchEditNotificationSettings, this.tokens, { settings: frequency });
    }
    async getTweetBirdwatchNotes(id: string) {
        return await request(endpoints.BirdwatchFetchNotes, this.tokens, { tweet_id: id });
    }
    async rateBirdwatchNote(noteId: string, args: { helpfulTags?: BirdwatchHelpfulTag[], notHelpfulTags?: BirdwatchNotHelpfulTag[], tweetId: string, showOnSimilarTweets?: boolean }) {
        if (!args.helpfulTags && !args.notHelpfulTags) {
            return { result: false };
        }

        const helpfulTagsCount = args.helpfulTags?.length || 0;
        const notHelpfulTagsCount = args.notHelpfulTags?.length || 0;
        const helpfulness = helpfulTagsCount > 0 && notHelpfulTagsCount > 0 ? 'SomewhatHelpful' : helpfulTagsCount > 0 ? 'Helpful' : 'NotHelpful';

        return await request(endpoints.BirdwatchCreateRating, this.tokens, {
            data_v2: {
                helpfulness_level: helpfulness,
                helpful_tags: helpfulness !== 'NotHelpful' ? args.helpfulTags : undefined,
                not_helpful_tags: helpfulness !== 'Helpful' ? args.notHelpfulTags : undefined,
                note_match: args.showOnSimilarTweets !== undefined ? { all_media_note_match: args.showOnSimilarTweets } : undefined
            },
            note_id: noteId,
            tweet_id: args.tweetId
        });
    }
    async unrateBirdwatchNote(noteId: string) {
        return await request(endpoints.BirdwatchDeleteRating, this.tokens, { note_id: noteId });
    }



    async getBookmarks(args?: CursorOnly) {
        return await request(endpoints.Bookmarks, this.tokens, args);
    }
    async clearBookmarks() {
        return await request(endpoints.BookmarksAllDelete, this.tokens);
    }



    async getCommunity(id: string) {
        return await request(endpoints.CommunityByRestId, this.tokens, { communityId: id });
    }
    async getCommunityTweets(id: string, args?: { rankingMode: 'Relevance' | 'Recency' } & CursorOnly) {
        return await request(endpoints.CommunityTweetsTimeline, this.tokens, { communityId: id, rankingMode: args?.rankingMode || 'Relevance', cursor: args?.cursor });
    }
    async getCommunityMedia(id: string, args?: CursorOnly) {
        return await request(endpoints.CommunityMediaTimeline, this.tokens, { communityId: id, cursor: args?.cursor });
    }
    async searchCommunity(id: string, query: string, args?: { rankingMode: 'Recency' | 'Likes' } & CursorOnly) {
        return await request(endpoints.CommunityTweetSearchModuleQuery, this.tokens, { communityId: id, query, timelineRankingMode: args?.rankingMode || 'Likes', timelineId: `communityTweetSearch-${id}-a-${args?.rankingMode || 'Likes'}`, cursor: args?.cursor });
    }
    async getCommunityMembers(id: string, args?: CursorOnly) {
        return await request(endpoints.membersSliceTimeline_Query, this.tokens, { communityId: id, cursor: args?.cursor });
    }
    async getCommunityModerators(id: string, args?: CursorOnly) {
        return await request(endpoints.moderatorsSliceTimeline_Query, this.tokens, { communityId: id, cursor: args?.cursor });
    }
    async getCommunitiesTimeline(args?: CursorOnly) {
        return await request(endpoints.CommunitiesExploreTimeline, this.tokens, { cursor: args?.cursor });
    }
    async joinCommunity(id: string) {
        return await request(endpoints.JoinCommunity, this.tokens, { communityId: id });
    }
    async leaveCommunity(id: string) {
        return await request(endpoints.LeaveCommunity, this.tokens, { communityId: id });
    }
    async pinCommunity(id: string) {
        return await request(endpoints.PinTimeline, this.tokens, { pinnedTimelineItem: { id, pinned_timeline_type: 'Community' } });
    }
    async unpinCommunity(id: string) {
        return await request(endpoints.UnpinTimeline, this.tokens, { pinnedTimelineItem: { id, pinned_timeline_type: 'Community' } });
    }
    async canCreateCommunity() {
        return (await request(endpoints.CommunitiesCreateButtonQuery, this.tokens)).result
    }



    async getExplorePage(args?: CursorOnly) {
        return await request(endpoints.ExplorePage, this.tokens, args);
    }
    async getExploreAlternateTimeline(timelineId: string) {
        const data = await request(endpoints.GenericTimelineById, this.tokens, { timelineId: timelineId });
        return formatGenericTimeline<_ExploreTrendItem<'Item'>, Trend>(data, 'trends');
    }
    async getTrends() {
        return await request(endpoints.ExploreSidebar, this.tokens);
    }
    async getRecommendedUsers(userId: string) {
        return await request(endpoints.SidebarUserRecommendations, this.tokens, { profileUserId: userId });
    }
    async getHashflags() {
        return await request(endpoints.hashflags, this.tokens);
    }



    async createList(args: { name: string, description?: string, isPrivate?: boolean }) {
        return await request(endpoints.CreateList, this.tokens, { name: args.name, description: args.description || '', isPrivate: args.isPrivate || false });
    }
    async updateList(id: string, args: { name: string, description: string, isPrivate: boolean }) {
        return await request(endpoints.UpdateList, this.tokens, { listId: id, ...args });
    }
    async deleteList(id: string) {
        return await request(endpoints.DeleteList, this.tokens, { listId: id });
    }
    async getListsTimeline() {
        return await request(endpoints.ListsManagementPageTimeline, this.tokens);
    }
    async getList(id: string) {
        return await request(endpoints.ListByRestId, this.tokens, { listId: id });
    }
    async getListTweets(id: string, args?: CursorOnly) {
        return await request(endpoints.ListLatestTweetsTimeline, this.tokens, { listId: id, cursor: args?.cursor });
    }
    async getListMembers(id: string, args?: CursorOnly) {
        return await request(endpoints.ListMembers, this.tokens, { listId: id, cursor: args?.cursor });
    }
    async getListSubscribers(id: string, args?: CursorOnly) {
        return await request(endpoints.ListSubscribers, this.tokens, { listId: id, cursor: args?.cursor });
    }
    async subscribeToList(id: string) {
        return await request(endpoints.ListSubscribe, this.tokens, { listId: id });
    }
    async unsubscribeFromList(id: string) {
        return await request(endpoints.ListUnsubscribe, this.tokens, { listId: id });
    }
    async addMemberToList(listId: string, userId: string) {
        return await request(endpoints.ListAddMember, this.tokens, { listId, userId });
    }
    async removeMemberFromList(listId: string, userId: string) {
        return await request(endpoints.ListRemoveMember, this.tokens, { listId, userId });
    }



    async getNotifications(args?: { type: 'All' | 'Verified' | 'Mentions' } & CursorOnly) {
        return await request(endpoints.NotificationsTimeline, this.tokens, { timeline_type: args?.type || 'All', cursor: args?.cursor });
    }
    async getNotificationsCount() {
        return await request(endpoints.badge_count, this.tokens);
    }
    async getNotificationTweets(args?: CursorOnly) {
        return await request(endpoints.notifications_device_follow, this.tokens, args);
    }



    async search(query: string, args?: { source?: 'typed_query' | 'recent_search_click' | 'tdqt', type?: 'Top' | 'Latest' | 'People' | 'Media' | 'Lists' } & CursorOnly) {
        return await request(endpoints.SearchTimeline, this.tokens, { rawQuery: query, querySource: args?.source || 'typed_query', product: args?.type || 'Top', cursor: args?.cursor });
    }
    async searchTypeahead(query: string) {
        return await request(endpoints.search_typeahead, this.tokens, { q: query });
    }



    async getChronologicalTimeline(args?: CursorOnly) {
        return await request(endpoints.HomeLatestTimeline, this.tokens, args);
    }
    async getAlgorithmicalTimeline(args?: { seenTweetIds?: string[] } & CursorOnly) {
        return await request(endpoints.HomeTimeline, this.tokens, args);
    }



    async followTopic(id: string) {
        return await request(endpoints.TopicFollow, this.tokens, { topicId: id });
    }
    async unfollowTopic(id: string) {
        return await request(endpoints.TopicUnfollow, this.tokens, { topicId: id });
    }
    async notInterestedInTopic(id: string) {
        return await request(endpoints.TopicNotInterested, this.tokens, { topicId: id });
    }
    async undoNotInterestedInTopic(id: string) {
        return await request(endpoints.TopicUndoNotInterested, this.tokens, { topicId: id });
    }



    async createTweet(text: string, args?: { conversationControl?: 'Community' | 'Verified' | 'ByInvitation', media?: { id: string, taggedUsers: string[] }[] }) {
        return await request(endpoints.CreateTweet, this.tokens, {
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
        return await request(endpoints.DeleteTweet, this.tokens, { tweet_id: id });
    }
    async getTweet(id: string, args?: { rankingMode?: 'Relevance' | 'Recency' | 'Likes' } & CursorOnly) {
        return await request(endpoints.TweetDetail, this.tokens, { focalTweetId: id, rankingMode: args?.rankingMode || 'Relevance', cursor: args?.cursor });
    }
    async getHiddenReplies(id: string, args?: CursorOnly) {
        return await request(endpoints.ModeratedTimeline, this.tokens, { rootTweetId: id, cursor: args?.cursor });
    }
    async getTweetLikers(id: string, args?: CursorOnly) {
        return await request(endpoints.Favoriters, this.tokens, { tweetId: id, cursor: args?.cursor });
    }
    async getTweetRetweeters(id: string, args?: CursorOnly) {
        return await request(endpoints.Retweeters, this.tokens, { tweetId: id, cursor: args?.cursor });
    }
    async getTweetQuoteTweets(id: string, args?: CursorOnly) {
        return await request(endpoints.SearchTimeline, this.tokens, { rawQuery: `quoted_tweet_id:${id}`, querySource: 'tdqt', product: 'Top', cursor: args?.cursor });
    }

    async likeTweet(id: string) {
        return await request(endpoints.FavoriteTweet, this.tokens, { tweet_id: id });
    }
    async unlikeTweet(id: string) {
        return await request(endpoints.UnfavoriteTweet, this.tokens, { tweet_id: id });
    }
    async retweetTweet(id: string) {
        return await request(endpoints.CreateRetweet, this.tokens, { tweet_id: id });
    }
    async unretweetTweet(id: string) {
        return await request(endpoints.DeleteRetweet, this.tokens, { source_tweet_id: id });
    }
    async bookmarkTweet(id: string) {
        return await request(endpoints.CreateBookmark, this.tokens, { tweet_id: id });
    }
    async unbookmarkTweet(id: string) {
        return await request(endpoints.DeleteBookmark, this.tokens, { tweet_id: id });
    }
    async hideReply(id: string) {
        return await request(endpoints.ModerateTweet, this.tokens, { tweetId: id });
    }
    async unhideReply(id: string) {
        return await request(endpoints.UnmoderateTweet, this.tokens, { tweetId: id });
    }
    async pinTweet(id: string) {
        return await request(endpoints.PinTweet, this.tokens, { tweet_id: id });
    }
    async unpinTweet(id: string) {
        return await request(endpoints.UnpinTweet, this.tokens, { tweet_id: id });
    }
    async changeTweetReplyPermissions(id: string, args: { permission: 'Community' | 'Verified' | 'ByInvitation' | null }) {
        if (!args.permission) {
            return await request(endpoints.ConversationControlDelete, this.tokens, { tweet_id: id });
        }

        return await request(endpoints.ConversationControlChange, this.tokens, { tweet_id: id, mode: args.permission });
    }
    async leaveConversation(id: string) {
        return await request(endpoints.UnmentionUserFromConversation, this.tokens, { tweet_id: id });
    }
    /** unimplemented */
    async createCard() {
        return await request(endpoints.cards_create, this.tokens, {});
    }
    /** `choice` should be a number from 0 to 3 */
    async vote(choice: number, args: { cardUri: string, tweetId: string, cardName: string }) {
        return await request(endpoints.passthrough, this.tokens, { card_uri: args.cardUri, original_tweet_id: args.tweetId, response_card_name: args.cardName, selected_choice: choice + 1 });
    }
    async muteConversation(id: string) {
        return await request(endpoints.mutes_conversations_create, this.tokens, { tweet_id: id });
    }
    async unmuteConversation(id: string) {
        return await request(endpoints.mutes_conversations_destroy, this.tokens, { tweet_id: id });
    }



    async getUser(id: string, args?: ByUsername) {
        return await (args?.byUsername
            ? request(endpoints.UserByScreenName, this.tokens, { screen_name: id })
            : request(endpoints.UserByRestId, this.tokens, { userId: id }));
    }
    async getUsers(ids: string[]) {
        return await request(endpoints.UsersByRestIds, this.tokens, { userIds: ids });
    }
    async getUserTweets(id: string, args?: CursorOnly) {
        return await request(endpoints.UserTweets, this.tokens, { userId: id, cursor: args?.cursor });
    }
    async getUserTweetsAndReplies(id: string, args?: CursorOnly) {
        return await request(endpoints.UserTweetsAndReplies, this.tokens, { userId: id, cursor: args?.cursor });
    }
    async getUserMedia(id: string, args?: CursorOnly) {
        return await request(endpoints.UserMedia, this.tokens, { userId: id, cursor: args?.cursor });
    }
    async getUserLikes(id: string, args?: CursorOnly) {
        return await request(endpoints.Likes, this.tokens, { userId: id, cursor: args?.cursor });
    }
    async getUserFollowing(id: string, args?: CursorOnly) {
        return await request(endpoints.Following, this.tokens, { userId: id, cursor: args?.cursor });
    }
    async getUserFollowers(id: string, args?: CursorOnly) {
        return await request(endpoints.Followers, this.tokens, { userId: id, cursor: args?.cursor });
    }
    async getUserFollowersYouKnow(id: string, args?: CursorOnly) {
        return await request(endpoints.FollowersYouKnow, this.tokens, { userId: id, cursor: args?.cursor });
    }
    async getUserLists(id: string, args?: CursorOnly) {
        return await request(endpoints.CombinedLists, this.tokens, { userId: id, cursor: args?.cursor });
    }
    async getFollowRequestIds(args?: { cursor?: number }) {
        return await request(endpoints.friendships_incoming, this.tokens, { cursor: args?.cursor || -1 });
    }
    async getFriendsFollowing(id: string, args?: ByUsername) {
        return await request(endpoints.friends_following_list, this.tokens, args?.byUsername ? { screen_name: id } : { user_id: id });
    }

    async followUser(id: string, args?: ByUsername) {
        return await request(endpoints.friendships_create, this.tokens, args?.byUsername ? { screen_name: id } : { user_id: id });
    }
    async unfollowUser(id: string, args?: ByUsername) {
        return await request(endpoints.friendships_destroy, this.tokens, args?.byUsername ? { screen_name: id } : { user_id: id });
    }
    async toggleUserNotifications(id: string, args: { enable: boolean }) {
        return await request(endpoints.friendships_update_device, this.tokens, { id, device: args.enable });
    }
    async toggleUserRetweets(id: string, args: { enable: boolean }) {
        return await request(endpoints.friendships_update_retweets, this.tokens, { id, retweets: args.enable });
    }
    async removeFollower(id: string) {
        return await request(endpoints.RemoveFollower, this.tokens, { target_user_id: id });
    }
    async cancelFollowRequest(id: string, args?: ByUsername) {
        return await request(endpoints.friendships_cancel, this.tokens, args?.byUsername ? { screen_name: id } : { user_id: id });
    }
    async acceptFollowRequest(id: string, args?: ByUsername) {
        return await request(endpoints.friendships_accept, this.tokens, args?.byUsername ? { screen_name: id } : { user_id: id });
    }
    async declineFollowRequest(id: string, args?: ByUsername) {
        return await request(endpoints.friendships_deny, this.tokens, args?.byUsername ? { screen_name: id } : { user_id: id });
    }
    async blockUser(id: string, args?: ByUsername) {
        return await request(endpoints.blocks_create, this.tokens, args?.byUsername ? { screen_name: id } : { user_id: id });
    }
    async unblockUser(id: string, args?: ByUsername) {
        return await request(endpoints.blocks_destroy, this.tokens, args?.byUsername ? { screen_name: id } : { user_id: id });
    }
    async muteUser(id: string, args?: ByUsername) {
        return await request(endpoints.mutes_users_create, this.tokens, args?.byUsername ? { screen_name: id } : { user_id: id });
    }
    async unmuteUser(id: string, args?: ByUsername) {
        return await request(endpoints.mutes_users_destroy, this.tokens, args?.byUsername ? { screen_name: id } : { user_id: id });
    }
}
