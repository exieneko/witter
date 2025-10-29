# witter

a basic twitter api client for javascript & typescript because i love reinventing the wheel ♡

## setup

1. install the package: `npm i witter`
2. get your account tokens
3. initialize the twitter client

    ```ts
    import { TwitterClient } from 'witter';

    const twitter = new TwitterClient({
        authToken: 'auth_token cookie value',
        csrf: 'ct0 cookie value'
    });

    const me = await twitter.user.get('exieneko', { byUsername: true });
    ```

## example

example implementation in sveltekit

```ts
// src/app.d.ts
import type { TwitterClient } from 'witter';

declare global {
    namespace App {
        interface Locals {
            twitter: TwitterClient
        }
    }
}

export {};
```

```ts
// src/hooks.server.ts
import { TwitterClient } from 'witter';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const authToken = event.cookies.get('auth_token')!;
    const csrf = event.cookies.get('ct0')!;

    event.locals.twitter = new TwitterClient({ authToken, csrf });

    return await resolve(event);
};
```

```ts
// src/routes/something/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
    const data = await locals.twitter.user.get('exieneko', { byUsername: true });
    return json(data);
};
```

## types

twitter's response json data is hard to parse and deeply nested, making it hard to navigate

for easier use, a formatter will parse the data and return a custom object that is easier to work with.
you can import both the types and the formatter functions

```ts
import type { User } from 'witter/types';

const customUser: User = {
    __type: 'User',
    // ...
    username: 'random_twitter_user'
};
```
