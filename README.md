# twitter-api

a basic twitter api client for javascript & typescript because i love reinventing the wheel ♡

## setup

1. log into twitter.com and get your session tokens from the devtools
2. install the package: `npm i twitter-api-unofficial`
3. initialize the twitter client

    ```typescript
    const twitterClient = new TwitterClient({
        authToken: 'auth_token cookie value',
        authMulti: 'auth_multi cookie value (optional)',
        csrf: 'ct0 cookie value'
    });
    ```

## example

example implementation in sveltekit

```typescript
// src/app.d.ts
import type { TwitterClient } from 'twitter-api-unofficial';

declare global {
    namespace App {
        interface Locals {
            twitter: TwitterClient
        }
    }
}

export {};
```

```typescript
// src/hooks.server.ts
import { TwitterClient } from 'twitter-api-unofficial';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const authToken = event.cookies.get('auth_token')!;
    const csrf = event.cookies.get('ct0')!;

    event.locals.twitter = new TwitterClient({ authToken, csrf });

    return await resolve(event);
};
```

```typescript
// src/routes/something/+server.ts
import { twitter } from 'twitter-api-unofficial';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, params }) => {
    const data = await locals.twitter.getUser('exieneko', { byUsername: true });
    return json(data);
};
```
