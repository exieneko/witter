import { PUBLIC_TOKEN } from '../../consts.js';
import type { Flags } from '../../flags.js';
import type { TwitterFormatter } from '../../fmt/index.js';

type Method = 'GET' | 'POST';

export type EndpointOptions = {
    url: string,
    method: Method,
    variables?: Record<string, any>,
    features?: Flags,
    token?: string
}

export class Endpoint<T = any, P extends object = {}> implements EndpointOptions {
    url: string;
    method: Method;
    variables?: Record<string, any>;
    features?: Flags;
    token: string;
    _params: P = {} as P;

    constructor(options: EndpointOptions, public format: (fmt: TwitterFormatter, value: Record<string, any>) => T | Promise<T>) {
        this.url = options.url;
        this.method = options.method;
        this.variables = options.variables;
        this.features = options.features;
        this.token = options.token || PUBLIC_TOKEN;
    }

    get(url: string, body?: string) {
        if (this.method === 'GET' && body && body.length > 0) {
            return url + '?' + body;
        }

        return url;
    }

    post(body?: any): string | undefined {
        if (this.method === 'POST' && body) {
            if (this.kind() === EndpointType.GraphQL) {
                return JSON.stringify(body);
            }
            return String(body);
        }
    }

    kind(): EndpointType {
        if (this.url.includes('upload.twitter.com')) {
            return EndpointType.Media;
        } else if (this.url.includes('/i/api/graphql')) {
            return EndpointType.GraphQL;
        } else if (this.url.includes('/i/api/2')) {
            return EndpointType.v2;
        } else if (this.url.includes('api.twitter.com/2/')) {
            return EndpointType.v2Alt;
        }

        return EndpointType.v11;
    }

    toJSON(): EndpointOptions {
        return {
            url: this.url,
            method: this.method,
            variables: this.variables,
            features: this.features,
            token: this.token
        };
    }
}

export enum EndpointType {
    GraphQL = 'GraphQL',
    v11 = 'v11',
    v2 = 'v2',
    v2Alt = 'v2Alt',
    Media = 'Media'
}

export interface EndpointGroup {
    [key: string]: Endpoint
}
