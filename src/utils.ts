import { HEADERS, OAUTH_KEY, PUBLIC_TOKEN } from './consts.js';

export interface Tokens {
    authToken: string,
    authMulti?: string,
    csrf: string
}

export type Endpoint = GqlEndpoint | V11Endpoint;

export interface GqlEndpoint<Params extends object = {}, Variables extends object = {}, Features extends object = {}, RawData extends object = any, Data extends object = any> {
    url: [string, string],
    method: 'get' | 'post',
    params?: Params,
    variables?: Variables,
    features?: Features,
    useOauthKey?: boolean,
    parser: (data: RawData) => Data
}

export interface V11Endpoint<Params extends object = {}, Body extends string = any, RawData extends object = any, Data extends object = any> {
    url: string,
    method: 'get' | 'post',
    params?: Params,
    body?: Body,
    useOauthKey?: boolean,
    parser: (data: RawData) => Data
}

type OptionalUndefined<T extends object | undefined> = {
    [K in keyof T as undefined extends T[K] ? K : never]?: T[K];
} & {
    [K in keyof T as undefined extends T[K] ? never : K]: T[K];
};

export type Params<T extends { params?: object }> = OptionalUndefined<T['params']>;



export const v11 = (route: string) => {
    return `https://api.twitter.com/1.1/${route}`;
};

const getHeadersFromTokens = (tokens: Tokens) => ({
    'x-csrf-token': tokens.csrf,
    cookie: tokens.authMulti ? `auth_token=${tokens.authToken}; auth_multi="${tokens.authMulti}"; ct0=${tokens.csrf}` : `auth_token=${tokens.authToken}; ct0=${tokens.csrf}`
});

const requestGql = async <T extends GqlEndpoint>(endpoint: T, tokens: Tokens, params?: Params<T>): Promise<ReturnType<T['parser']>> => {
    const toSearchParams = (obj: object) => {
        if (!obj || Object.entries(obj).every(([, value]) => value === undefined)) {
            return '';
        }

        return '?' + Object.entries(obj)
            .filter(([, value]) => value !== undefined)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(typeof value === 'string' ? value : JSON.stringify(value))}`)
            .join('&');
    };

    const url = `https://twitter.com/i/api/graphql/${endpoint.url.join('/')}`;

    const headers = { ...HEADERS, authorization: endpoint.useOauthKey ? OAUTH_KEY : PUBLIC_TOKEN, ...getHeadersFromTokens(tokens) };

    const response = await (endpoint.method === 'get'
        ? fetch(url + toSearchParams({ variables: { ...endpoint.variables, ...params }, features: endpoint.features }), {
            method: endpoint.method,
            headers: headers
        })
        : fetch(url, {
            method: endpoint.method,
            headers: headers,
            body: JSON.stringify({
                variables: { ...endpoint.variables, ...params },
                features: endpoint.features,
                queryId: endpoint.url[0]
            })
        })
    );

    const data = <Parameters<Endpoint['parser']>[0]>await response.json();

    return endpoint.parser(data);
};

const requestV11 = async <T extends V11Endpoint>(endpoint: T, tokens: Tokens, params?: Params<T>): Promise<ReturnType<T['parser']>> => {
    const encode = (data: string | undefined, params?: Params<T>) => {
        return Object
            .entries(params || {})
            .reduce((acc, [key, value]) => acc.replace(new RegExp(`${key}=\\{\\}`), `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`), data || '')
            .replace(/([a-z0-9_]+?)=\{\}/gi, '')
            .replace(/&{2,12}/g, '&')
            .replace(/^&+/, '')
            .replace(/&+$/, '');
    };

    const urlencoded = encode(endpoint.body, params);

    const headers = { ...HEADERS, authorization: endpoint.useOauthKey ? OAUTH_KEY : PUBLIC_TOKEN, 'content-type': 'application/x-www-form-urlencoded', ...getHeadersFromTokens(tokens) };

    const response = await fetch(endpoint.method === 'get' ? `${endpoint.url}?${urlencoded}` : endpoint.url, {
        method: endpoint.method,
        headers: headers,
        body: endpoint.method === 'post' && endpoint.body ? urlencoded : undefined
    });

    const data = <Parameters<Endpoint['parser']>[0]>await response.json();

    return endpoint.parser(data);
};

export const request = <T extends Endpoint>(endpoint: T, tokens: Tokens, params?: Params<T>): Promise<ReturnType<T['parser']>> => {
    if (typeof endpoint.url === 'string') {
        return requestV11(endpoint as V11Endpoint, tokens, params);
    }

    return requestGql(endpoint as GqlEndpoint, tokens, params);
};
