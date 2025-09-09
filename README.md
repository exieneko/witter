# twitter-api

a basic twitter api client for javascript & typescript because i love reinventing the wheel ♡

## setup

1. log into twitter.com and get your session tokens from the devtools
2. install the package with `npm i twitter-api-unofficial`
3. initialize the twitter client

    ```typescript
    const twitterClient = twitter({
        authToken: 'auth_token cookie value',
        authMulti: 'auth_multi cookie value (optional)',
        csrf: 'ct0 cookie value'
    })
    ```

```typescript
// src/routes/api/user-by-id/[id]/+server.ts
import { twitter } from 'twitter-api-unofficial';

export const GET: RequestHandler = async ({ cookies, params }) => {
    twitter({
        authToken: cookies.get('authToken'),
        csrf: cookies.get('csrf')
    }).getUser('exieneko', { byUsername: true })
};
```
