export interface Endpoint<Params extends object = {}, Variables extends object = {}, Features extends object = {}, Headers extends object = {}, RawData extends object = any, Data extends object = any> {
    url: string,
    method: 'get' | 'post',
    params?: Params,
    static?: {
        variables?: Variables,
        features?: Features,
        form?: string
    },
    headers?: Headers,
    parser: (raw: RawData) => Data
}

type OptionalUndefined<T extends object | undefined> = {
    [K in keyof T as undefined extends T[K] ? K : never]?: T[K];
} & {
    [K in keyof T as undefined extends T[K] ? never : K]: T[K];
};



export const gql = (route: string) => {
    return `https://twitter.com/i/api/graphql/${route}`;
};

export const v11 = (route: string) => {
    return `https://api.twitter.com/1.1/${route}`;
};



export const request = async <T extends Endpoint>(endpoint: T, params: OptionalUndefined<T['params']>) => {
    const toSearchParams = (obj: object) => {
        if (!obj || Object.entries(obj).every(([, value]) => value === undefined)) {
            return '';
        }

        return '?' + Object.entries(obj)
            .filter(([, value]) => value !== undefined)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(typeof value === 'string' ? value : JSON.stringify(value))}`)
            .join('&');
    };

    const urlencodedForm = (data: string) => {
        return Object.entries(params).reduce((acc, [key, value]) => acc.replace(new RegExp(`${key}=\\{\\}`), `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`), data);
    };

    const response = await (endpoint.static?.form
        ? fetch(endpoint.method === 'get' ? `${endpoint.url}?${urlencodedForm(endpoint.static.form)}` : endpoint.url, {
            method: endpoint.method,
            headers: { ...{ /* TODO */ }, ...endpoint.headers },
            body: endpoint.method === 'post' ? urlencodedForm(endpoint.static.form) : undefined
        })
        : fetch(endpoint.method === 'get' ? endpoint.url + (endpoint.static ? toSearchParams({ variables: { ...endpoint.static.variables, ...params }, features: endpoint.static.features }) : '') : endpoint.url, {
            method: endpoint.method,
            headers: { ...{ /* TODO */ }, ...endpoint.headers },
            body: endpoint.method === 'post' ? JSON.stringify({
                variables: { ...endpoint.static?.variables, ...params },
                features: endpoint.static?.features,
                queryId: endpoint.url.includes('graphql') ? endpoint.url.match(/\/graphql\/(.+)\/.+$/)?.at(0) : undefined
            }) : undefined
        }));

    const data = <Parameters<Endpoint['parser']>[0]>await response.json();

    return endpoint.parser(data);
};
