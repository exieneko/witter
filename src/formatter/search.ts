import { formatUserLegacy } from './user';

import { Typeahead } from '../types/search';
import { _Typeahead } from '../types/raw/search';

export const formatTypeahead = (input: _Typeahead): Typeahead => {
    return {
        results_count: input.num_results,
        topics: input.topics.map(({ topic }) => topic),
        users: (input.users || []).map(formatUserLegacy),
        query: input.query
    };
};
