export interface Endpoint<Config extends object = {}, Variables extends object = {}, Features extends object = {}, Headers extends object = {}, RawData extends object = any, Data extends object = any> {
    url: string,
    method: 'get' | 'post',
    config?: Config,
    params?: {
        variables?: Variables,
        features?: Features
    },
    headers?: Headers,
    parser: (raw: RawData) => Data
}



export const gql = (route: `/${string}`) => {
    return `https://twitter.com/i/api/graphql${route}`;
};

export const v11 = (route: `/${string}`) => {
    return `https://api.twitter.com/1.1${route}`;
};



export const request = async <T extends Endpoint>({ url, method, params, headers, parser }: T, config: T['config']) => {
    const toSearchParams = (obj: object) => {
        if (!obj || Object.entries(obj).every(([, value]) => value === undefined)) {
            return '';
        }

        return '?' + Object.entries(obj)
            .filter(([, value]) => value !== undefined)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(typeof value === 'string' ? value : JSON.stringify(value))}`)
            .join('&');
    };

    const response = await fetch(method === 'get' ? url + toSearchParams({ variables: params?.variables, features: params?.features }) : url, {
        method: method,
        headers: { ...{ /* TODO */ }, ...headers },
        body: method === 'post' ? JSON.stringify({
            variables: { ...params?.variables, ...config },
            features: params?.features,
            queryId: url.includes('graphql') ? url.match(/\/graphql\/(.+)\/.+$/)?.at(0) : undefined
        }) : undefined
    });

    const data = await response.json();
    return parser(data);
};
