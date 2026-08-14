import type { Endpoint } from './endpoint.js';
import type { TwitterClient } from '../../client.js';
import type { TwitterFormatter } from '../../fmt/index.js';

export * from './endpoint.js';
export * from './model.js';
export * from './range.js';

export type AsyncConstructor<This extends Type, T = Record<string, any>, Opts extends Record<string, any> | null = null> = [Opts] extends [null]
    ? (fmt: TwitterFormatter, value: T) => Promise<This>
    : (fmt: TwitterFormatter, value: T, opts: Opts) => Promise<This>;

export interface Type<K extends string = string> {
    readonly __typename: K
}

export type RequiredBy<T extends object, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export type PartialBy<T extends object, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type PartialUndefined<T extends object | undefined> = {
    [K in keyof T as undefined extends T[K] ? K : never]?: T[K];
} & {
    [K in keyof T as undefined extends T[K] ? never : K]: T[K];
};

export type EndpointParams<E extends Endpoint> = PartialUndefined<E['_params']>;
export type MaybeType<T extends string = string> = (Type<T> & Record<string, any>) | undefined;

export interface Account {
    id: number,
    client: TwitterClient,
    rateLimitMax: number,
    rateLimitRemaining: number,
    rateLimitResetAt: Date
}
