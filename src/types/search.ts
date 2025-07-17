import type { User } from './user';

export interface Typeahead {
    resultsCount: number,
    topics: string[],
    users: User[],
    query: string
}
