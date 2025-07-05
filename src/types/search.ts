import type { User } from './user';

export interface Typeahead {
    results_count: number,
    topics: string[],
    users: User[],
    query: string
}
