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
