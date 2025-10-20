import type { Entry, List, TimelineList, TimelineTweet, UnavailableList, User } from '../types/index.js';
import { cursor, getEntries, user } from './index.js';

export function list(value: any): List | UnavailableList {
    if (!value || !value.created_at) {
        return { __type: 'UnavailableList' }
    }

    return {
        __type: 'List',
        id: value.id_str,
        banner_url: value.custom_banner_media.media_info.original_img_id,
        created_at: new Date(value.created_at).toISOString(),
        creator: user(value.user_results?.result) as User,
        description: value.description || '',
        listed: !!value.is_member,
        listed_count: value.member_count || 0,
        muted: !!value.muting,
        name: value.name,
        pinned: !!value.pinning,
        public: value.mode === 'Public',
        subscribed: !!value.following,
        subscribers_count: value.subscriber_count || 0
    };
}



export function listEntries(instructions: any): Array<Entry<TimelineList>> {
    const value: Array<any> = getEntries(instructions);

    return value.map(entry => ({
        id: entry.entryId,
        content: entry.entryId.includes('cursor')
            ? cursor(entry.content)
            : list(entry.content.itemContent.list)
    }))
}

export function listDiscoveryEntries(instructions: any): Array<Entry<List>> {
    // @ts-ignore
    const value: Array<any> = getEntries(instructions).find((entry: any) => entry.entryId.includes('discovery'))?.content?.items || [];

    return value.map(entry => ({
        id: entry.entryId,
        content: list(entry.item.itemContent.list) as List
    }));
}
