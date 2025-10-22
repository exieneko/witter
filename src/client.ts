import { ENDPOINTS } from './endpoints.js';
import type * as T from './types/index.js';
import { TweetSort, TweetReplyPermission } from './types/index.js';
import { request, type Tokens } from './utils.js';

interface BookmarkMethods {
    get(args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineTweet>>>,
    search(query: string, args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineTweet>>>,
    clear(): Promise<boolean>
}

interface CommunityMethods {
    get(id: string): Promise<T.Community | T.UnavailableCommunity>,
    tweets(id: string, args?: T.TweetGetArgs): Promise<Array<T.Entry<T.TimelineTweet>>>,
    media(id: string, args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineTweet>>>,
    join(id: string): Promise<boolean>,
    leave(id: string): Promise<boolean>
}

interface ListMethods {
    get(id: string, args?: T.ListBySlug): Promise<T.List | T.UnavailableList>,
    tweets(id: string, args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineTweet>>>,
    discovery(): Promise<Array<T.Entry<T.TimelineList>>>,
    listedOn(args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineList>>>,
    owned(id: string, otherUserId: string, args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineList>>>,
    members(id: string, args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineUser>>>,
    subscribers(id: string, args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineUser>>>,
    create(args: T.ListCreateArgs): Promise<T.List>,
    edit(id: string, args: Required<T.ListCreateArgs>): Promise<boolean>,
    delete(id: string): Promise<boolean>,
    setBanner(listId: string, mediaId?: string): Promise<boolean>,
    addUser(listId: string, userId: string): Promise<boolean>,
    removeUser(listId: string, userId: string): Promise<boolean>,
    subscribe(id: string): Promise<boolean>,
    unsubscribe(id: string): Promise<boolean>,
    pin(id: string): Promise<boolean>,
    unpin(id: string): Promise<boolean>,
    mute(id: string): Promise<boolean>,
    unmute(id: string): Promise<boolean>
}

interface TimelineMethods {
    algorithmical(args?: T.TimelineGetArgs): Promise<Array<T.Entry<T.TimelineTweet>>>,
    chronological(args?: T.TimelineGetArgs): Promise<Array<T.Entry<T.TimelineTweet>>>
}

interface TweetMethods {
    create(args: T.TweetCreateArgs): Promise<T.Tweet>,
    delete(id: string): Promise<boolean>,
    get(id: string, args?: T.TweetGetArgs): Promise<Array<T.Entry<T.TimelineTweet>>>,
    getById(id: string, args?: T.TweetGetArgs): Promise<T.Tweet | T.TweetTombstone>,
    getByIds(id: Array<string>, args?: T.TweetGetArgs): Promise<Array<T.Tweet | T.TweetTombstone>>,
    hiddenReplies(id: string, args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineTweet>>>,
    likes(id: string, args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineUser>>>,
    retweets(id: string, args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineUser>>>,
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

interface UserMethods {
    get(id: string, args?: T.ByUsername): Promise<T.User | T.SuspendedUser | T.UnavailableUser>,
    getMany(ids: Array<string>, args?: T.ByUsername): Promise<Array<T.User | T.SuspendedUser | T.UnavailableUser>>,
    tweets(id: string, args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineTweet>>>,
    replies(id: string, args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineTweet>>>,
    media(id: string, args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineTweet>>>,
    likes(id: string, args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineTweet>>>,
    highlightedTweets(id: string, args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineTweet>>>,
    following(id: string, args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineUser>>>,
    followers(id: string, args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineUser>>>,
    followersYouKnow(id: string, args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineUser>>>,
    verifiedFollowers(id: string, args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineUser>>>,
    superFollowing(id: string, args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineUser>>>,
    affiliates(id: string, args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineUser>>>,
    lists(id: string, args?: T.CursorOnly): Promise<Array<T.Entry<T.TimelineList>>>,
    follow(id: string, args?: T.ByUsername): Promise<boolean>,
    unfollow(id: string, args?: T.ByUsername): Promise<boolean>,
    retweets: EnableDisable,
    notifications: EnableDisable,
    cancelFollowRequest(id: string, args?: T.ByUsername): Promise<boolean>,
    acceptFollowRequest(id: string, args?: T.ByUsername): Promise<boolean>,
    declineFollowRequest(id: string, args?: T.ByUsername): Promise<boolean>,
    block(id: string, args?: T.ByUsername): Promise<boolean>,
    unblock(id: string, args?: T.ByUsername): Promise<boolean>,
    mute(id: string, args?: T.ByUsername): Promise<boolean>,
    unmute(id: string, args?: T.ByUsername): Promise<boolean>
}

interface EnableDisable {
    enable(id: string): Promise<boolean>,
    disable(id: string): Promise<boolean>
}



export class TwitterClient {
    public bookmarks: BookmarkMethods;
    public community: CommunityMethods;
    public lists: ListMethods;
    public timeline: TimelineMethods;
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

        this.community = {
            async get(id) {
                return await request(ENDPOINTS.CommunityByRestId, tokens, { communityId: id });
            },
            async tweets(id, args) {
                const rankingMode = args?.sort === TweetSort.Recent
                    ? 'Recency'
                    : 'Relevance';

                return await request(ENDPOINTS.CommunityTweetsTimeline, tokens, { communityId: id, rankingMode, ...args });
            },
            async media(id, args) {
                return await request(ENDPOINTS.CommunityMediaTimeline, tokens, { communityId: id, ...args });
            },
            async join(id) {
                return await request(ENDPOINTS.JoinCommunity, tokens, { communityId: id });
            },
            async leave(id) {
                return await request(ENDPOINTS.LeaveCommunity, tokens, { communityId: id });
            }
        };

        this.lists = {
            async get(id, args) {
                if (args?.bySlug) {
                    return await request(ENDPOINTS.ListBySlug, tokens, { listId: id });
                }

                return await request(ENDPOINTS.ListByRestId, tokens, { listId: id });
            },
            async tweets(id, args) {
                return await request(ENDPOINTS.ListLatestTweetsTimeline, tokens, { listId: id, ...args });
            },
            async discovery() {
                return await request(ENDPOINTS.ListsDiscovery, tokens)
            },
            async listedOn(args) {
                return await request(ENDPOINTS.ListMemberships, tokens, args)
            },
            async owned(userId, otherUserId, args) {
                return await request(ENDPOINTS.ListOwnerships, tokens, { userId, isListMemberTargetUserId: otherUserId, ...args })
            },
            async members(id, args) {
                return await request(ENDPOINTS.ListMembers, tokens, { listId: id, ...args })
            },
            async subscribers(id, args) {
                return await request(ENDPOINTS.ListSubscribers, tokens, { listId: id, ...args })
            },
            async create(args) {
                return await request(ENDPOINTS.CreateList, tokens, { description: args.description || '', isPrivate: !!args.private, ...args })
            },
            async edit(id, args) {
                return await request(ENDPOINTS.UpdateList, tokens, { listId: id, isPrivate: args.private, ...args });
            },
            async delete(id) {
                return await request(ENDPOINTS.DeleteList, tokens, { listId: id });
            },
            async setBanner(listId, mediaId) {
                if (mediaId) {
                    return await request(ENDPOINTS.EditListBanner, tokens, { listId, mediaId });
                }

                return await request(ENDPOINTS.DeleteListBanner, tokens, { listId });
            },
            async addUser(listId, userId) {
                return await request(ENDPOINTS.ListAddMember, tokens, { listId, userId });
            },
            async removeUser(listId, userId) {
                return await request(ENDPOINTS.ListRemoveMember, tokens, { listId, userId });
            },
            async subscribe(id) {
                return await request(ENDPOINTS.ListSubscribe, tokens, { listId: id });
            },
            async unsubscribe(id) {
                return await request(ENDPOINTS.ListUnsubscribe, tokens, { listId: id });
            },
            async pin(id) {
                return await request(ENDPOINTS.PinTimeline, tokens, {
                    pinnedTimelineItem: { id, pinned_timeline_type: 'List' }
                });
            },
            async unpin(id) {
                return await request(ENDPOINTS.UnpinTimeline, tokens, {
                    pinnedTimelineItem: { id, pinned_timeline_type: 'List' }
                });
            },
            async mute(id) {
                return await request(ENDPOINTS.MuteList, tokens, { listId: id });
            },
            async unmute(id) {
                return await request(ENDPOINTS.UnmuteList, tokens, { listId: id });
            }
        };

        this.timeline = {
            async algorithmical(args) {
                const seenTweetIds = args?.seenTweetIds ?? [];
                const requestContext = args?.cursor ? undefined : 'launch';
                return await request(ENDPOINTS.HomeTimeline, tokens, { seenTweetIds, requestContext, ...args });
            },
            async chronological(args) {
                const seenTweetIds = args?.seenTweetIds ?? [];
                const requestContext = args?.cursor ? undefined : 'launch';
                return await request(ENDPOINTS.HomeLatestTimeline, tokens, { seenTweetIds, requestContext, ...args });
            }
        };

        this.tweet = {
            async create(args) {
                const mode = args.replyPermission === TweetReplyPermission.Following
                    ? 'Community'
                : args.replyPermission === TweetReplyPermission.Verified
                    ? 'Verified'
                : args.replyPermission === TweetReplyPermission.Mentioned
                    ? 'ByInvitation'
                    : undefined

                return await request(ENDPOINTS.CreateTweet, tokens, {
                    conversation_control: mode ? { mode } : undefined,
                    media: {
                        media_entities: args.mediaIds?.map(id => ({
                            media_id: id,
                            tagged_users: []
                        })) || [],
                        possibly_sensitive: args.sensitive
                    },
                    semantic_annotation_ids: [],
                    tweet_text: args.text
                });
            },
            async delete(id) {
                return await request(ENDPOINTS.DeleteTweet, tokens, { tweet_id: id })
            },
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
            async lists(id, args) {
                return await request(ENDPOINTS.CombinedLists, tokens, { userId: id, ...args });
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
