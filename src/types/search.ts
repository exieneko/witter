/**
 * Represents live search results
 */
export interface Typeahead {
    results_count: number,
    topics: Array<string>,
    user_ids: Array<string>,
    query: string
}
