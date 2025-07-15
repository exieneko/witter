export interface Settings {
    country: {
        code: string,
        eu_member: boolean
    },
    inbox: {
        allow_incoming_messages: boolean,
        allow_incoming_messages_from_verified_only?: boolean,
        read_receipts: boolean,
        quality_filter: boolean
    },
    mention_filter: boolean,
    lang: string,
    username: string,
    warnings: {
        personalized_ads_enabled: boolean,
        data_selling_enabled: boolean,
        discoverable_by_email: boolean,
        discoverable_by_phone_number: boolean
    }
}
