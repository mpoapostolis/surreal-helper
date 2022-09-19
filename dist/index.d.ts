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
    rawQuery<T>(q: string): Promise<SurrealType<T>>;
    select<T>(selections: string[] | "*"): {
        from: (table: string) => {
            where: (obj?: Record<string, any>) => Promise<SurrealType<T>>;
        };
    };
    create<T = unknown>(table: string): Record<string, any>;
    update<T = unknown>(table: string): Record<string, any>;
    delete<T = unknown>(table: string): Record<string, any>;
}
export declare const ops: {
    gt: (key: string, b: number) => {
        key: string;
    };
    lt: (key: string, b: number) => {
        key: string;
    };
    eq: (key: string, b: number) => {
        key: string;
    };
};
export declare const surreal: Surreal;
//# sourceMappingURL=index.d.ts.map