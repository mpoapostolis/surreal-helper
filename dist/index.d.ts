export declare type Conf = {
    url: string;
    ns: string;
    db: string;
    auth: string;
};
export declare type SurrealType<T = any> = {
    time: string;
    status: string;
    result?: T[];
};
export declare type SurrealError = {
    status: string;
    msg: string;
};
export declare class Surreal {
    conf: Conf;
    constructor(obj: Conf);
    select<T>(q: string): Promise<SurrealType<T>>;
    create(q: string): Promise<SurrealType<unknown>>;
    update(q: string): Promise<SurrealType<unknown>>;
    delete(q: string): Promise<SurrealType<unknown>>;
}
//# sourceMappingURL=index.d.ts.map