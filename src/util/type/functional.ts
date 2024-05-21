export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Mutable<T extends object> = {
    -readonly [key in keyof T]: T[key];
};

export type Extract<T, U extends T> = T extends U ? T : never;
export type Exclude<T, U extends T> = T extends U ? never : T;
