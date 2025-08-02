import type { User } from './user.js';

export interface Typeahead {
    resultsCount: number,
    topics: string[],
    users: User[],
    query: string
}
