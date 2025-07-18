export interface Settings {
    country: {
        code: string,
        euMember: boolean
    },
    inbox: {
        allowIncomingMessages: boolean,
        allowIncomingMessagesFromVerifiedOnly?: boolean,
        readReceipts: boolean,
        qualityFilter: boolean
    },
    mentionFilter: boolean,
    lang: string,
    username: string,
    warnings: {
        personalizedAdsEnabled: boolean,
        dataSellingEnabled: boolean,
        discoverableByEmail: boolean,
        discoverableByPhoneNumber: boolean
    }
}

export interface MutedWord {
    id: string,
    createdAt: string,
    expires?: string,
    includes: {
        following: boolean,
        timeline: boolean,
        replies: boolean,
        notifications: boolean
    },
    value: string
}
