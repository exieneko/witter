# twitter-api

a basic twitter api client for javascript & typescript because i love reinventing the wheel ♡

## setup

1. log into twitter.com and get your session tokens from the devtools
2. install the package with `npm i twitter-api-unofficial`
3. initialize the twitter client

    ```typescript
    const twitter = new TwitterClient('en', {
        authToken: 'auth_token cookie value',
        authMulti: 'auth_multi cookie value (optional)',
        csrf: 'ct0 cookie value'
    });
    ```

## usage

> [!NOTE]
> currently only one account can be logged in at a time  
> making too many requests in a short time period might cause your account to get rate limited or suspended

this package is intended to be used in frameworks like nextjs or sveltekit. to do so, set up a `twitter.ts` file in your project. it should look something like this:

### ▲ nextjs

```typescript
// src/lib/twitter.ts
import { TwitterClient } from 'twitter-api-unofficial';

const global = globalThis as unknown as { twitterClient: TwitterClient };

const twitter = global.twitterClient || new TwitterClient('en', {
    authToken: process.env.AUTH_TOKEN!,
    csrf: process.env.CSRF!
});

if (process.env.NODE_ENV !== 'production') {
    global.twitterClient = twitter;
}

export { twitter };
```

### sveltekit

```typescript
// src/app.d.ts
import { TwitterClient } from 'twitter-api-unofficial';

declare global {
    namespace App { /* ... */ }

    var twitterClient: TwitterClient
}

export {};
```

```typescript
// src/lib/server/twitter.ts
import { TwitterClient } from 'twitter-api-unofficial';
import { AUTH_TOKEN, CSRF } from '$env/static/private';

const twitter = global.twitterClient || new TwitterClient('en', {
    authToken: AUTH_TOKEN,
    csrf: CSRF
});

if (process.env.NODE_ENV !== 'production') {
    global.twitterClient = twitter;
}

export { twitter };
```
