import { OAUTH_KEY } from './consts.js';

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

const requestGql = async <T extends GqlEndpoint>(endpoint: T, headers?: Record<string, any>, params?: Params<T>): Promise<ReturnType<T['parser']>> => {
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

    const headers_ = endpoint.useOauthKey ? { ...headers, authorization: OAUTH_KEY } : headers;

    const response = await (endpoint.method === 'get'
        ? fetch(url + toSearchParams({ variables: { ...endpoint.variables, ...params }, features: endpoint.features }), {
            method: endpoint.method,
            headers: headers_
        })
        : fetch(url, {
            method: endpoint.method,
            headers: headers_,
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

const requestV11 = async <T extends V11Endpoint>(endpoint: T, headers?: Record<string, any>, params?: Params<T>): Promise<ReturnType<T['parser']>> => {
    const encode = (data: string | undefined, params?: Params<T>) => {
        return data
            ? Object.entries(params || {}).reduce((acc, [key, value]) => acc.replace(new RegExp(`${key}=\\{\\}`), `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`), data)
            : '';
    };

    const urlencoded = encode(endpoint.body, params);

    const headers_ = { ...(endpoint.useOauthKey ? { ...headers, authorization: OAUTH_KEY } : headers), 'content-type': 'application/x-www-form-urlencoded' };

    const response = await fetch(endpoint.method === 'get' ? `${endpoint.url}?${urlencoded}` : endpoint.url, {
        method: endpoint.method,
        headers: headers_,
        body: endpoint.method === 'post' && endpoint.body ? urlencoded : undefined
    });

    const data = <Parameters<Endpoint['parser']>[0]>await response.json();

    return endpoint.parser(data);
};

export const request = <T extends Endpoint>(endpoint: T, headers?: Record<string, any>, params?: Params<T>): Promise<ReturnType<T['parser']>> => {
    if (typeof endpoint.url === 'string') {
        return requestV11(endpoint as V11Endpoint, headers, params);
    }

    return requestGql(endpoint as GqlEndpoint, headers, params);
};
