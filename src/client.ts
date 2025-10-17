import { ENDPOINTS } from './endpoints.js';
import { request, Tokens } from './utils.js';

interface CursorOnly {
    cursor?: string
}

export class TwitterClient {
    constructor(private tokens: Tokens) {}

    async getUser(username: string) {
        return await request(ENDPOINTS.UserByScreenName, this.tokens, { screen_name: username });
    }
}
