import fetch, { Headers } from "node-fetch";

const toBase64 = (text: string): string => {
  return Buffer.from(text, "binary").toString("base64");
};

export type Conf = {
  url: string;
  ns: string;
  db: string;
  auth: string;
};

export type SurrealType<T = any> = {
  time: string;
  status: string;
  result?: T[];
};

export type SurrealError = {
  status: string;
  msg: string;
};

function objToQuery(obj: any) {
  return Object.keys(obj)
    .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
    .join(", ");
}

export class Surreal {
  conf: Conf;

  constructor(obj: Conf) {
    this.conf = obj;
  }

  private async f<T>(q: string) {
    const headers = new Headers({
      "Content-Type": "application/json",
      ns: this.conf.ns,
      db: this.conf.db,
      Authorization: "Basic " + toBase64(this.conf.auth),
    });

    const res = await fetch(this.conf.url, {
      body: q,
      method: "POST",
      headers,
    });
    const data = (await res.json()) as SurrealType<T>;
    return data;
  }

  async query<T>(q: string) {
    return await this.f<T>(q);
  }

  select<T>(selections: string[] | "*") {
    return {
      from: (table: string) => {
        return {
          where: async (obj: Record<string, any> = {}) => {
            const selected = selections === "*" ? "*" : selections.join(", ");
            return await this.f<T>(
              `SELECT ${selected}  FROM ${table} WHERE ${objToQuery(obj)}`
            );
          },
        };
      },
    };
  }

  create<T = unknown>(table: string): Record<string, any> {
    return {
      set: async (obj: Record<string, any> = {}) => {
        const set = Object.keys(obj)
          .map((k) => `${k} = ${obj[k]}`)
          .join(", ");
        return await this.f<T>(`CREATE ${table} SET ${set}`);
      },
    };
  }

  update<T = unknown>(table: string): Record<string, any> {
    return {
      where: (whereObj: Record<string, any> = {}) => {
        return {
          set: async (obj: Record<string, any> = {}) => {
            const set = Object.keys(obj)
              .map((k) => `${k} = ${obj[k]}`)
              .join(", ");
            return await this.f<T>(
              `UPDATE ${table} WHERE ${objToQuery(whereObj)} SET ${set}`
            );
          },
        };
      },
    };
  }

  delete<T = unknown>(table: string): Record<string, any> {
    return {
      where: async (whereObj: Record<string, any> = {}) => {
        return await this.f<T>(
          `DELETE ${table} WHERE ${objToQuery(whereObj)} `
        );
      },
    };
  }
}

export const ops = {
  gt: (key: string, b: number) => ({
    key: `${key} > ${b}`,
  }),
  lt: (key: string, b: number) => ({
    key: `${key} < ${b}`,
  }),
  eq: (key: string, b: number) => ({
    key: `${key} = ${b}`,
  }),
};

const surreal = new Surreal({
  url: "http://localhost:8080/query",
  ns: "default",
  db: "default",
  auth: "root:root",
});

surreal
  .create("users:mpoapostolis")
  .set({ name: "mpoapostolis", age: 30 })
  .then(console.log);
