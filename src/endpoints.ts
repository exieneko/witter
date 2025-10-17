import * as flags from './flags.js';
import { Endpoint } from './utils.js';

const GET = 'get';
const POST = 'post';

export const ENDPOINTS = {
    UserByScreenName: {
        url: '6ND0OKRCgPajU_yJbcWSVw/UserByScreenName',
        method: GET,
        params: {} as { screen_name: string },
        features: flags.user,
        parser: _ => _
    }
} satisfies Record<string, Endpoint>;
