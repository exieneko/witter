import * as flags from './flags.js';
import * as format from './formatter/index.js';
import { Endpoint } from './utils.js';

const GET = 'get';
const POST = 'post';

export const ENDPOINTS = {
    UserByScreenName: {
        url: '6ND0OKRCgPajU_yJbcWSVw/UserByScreenName',
        method: GET,
        params: {} as { screen_name: string },
        features: flags.user,
        parser: data => format.user(data.data.user.result)
    }
} satisfies Record<string, Endpoint>;
