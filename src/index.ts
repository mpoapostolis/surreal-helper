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

const f = async <T>(q: string, conf: Conf) => {
  const headers = new Headers({
    "Content-Type": "application/json",
    ns: conf.ns,
    db: conf.db,
    Authorization: "Basic " + toBase64(conf.auth),
  });

  const res = await fetch(conf.url, {
    body: q,
    method: "POST",
    headers,
  });
  const data = (await res.json()) as SurrealType<T>;
  return data;
};

export class Surreal {
  conf: Conf;

  constructor(obj: Conf) {
    this.conf = obj;
  }

  async select<T>(q: string) {
    return await f<T>(q, this.conf);
  }
  async create(q: string) {
    return await f(q, this.conf);
  }
  async update(q: string) {
    return await f(q, this.conf);
  }
  async delete(q: string) {
    return await f(q, this.conf);
  }
}
