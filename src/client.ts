import { Tokens } from './utils.js';

interface CursorOnly {
    cursor?: string
}

export class TwitterClient {
    constructor(private tokens: Tokens) {}
}
