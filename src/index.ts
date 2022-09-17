import fetch, { Headers } from "node-fetch";
const f = async <T>(
  q: string,
  url: string,
  ns: string,
  db: string,
  auth?: string
) => {
  const headers = new Headers({
    "Content-Type": "application/json",
    ns,
    db,
  });
  if (auth) headers.set("Authorization", auth);

  const res = await fetch(url, {
    body: q,
    method: "POST",
    headers,
  });
  const data = (await res.json()) as SurrealType<T>;
  return data;
};

class Surreal {
  url: string;
  ns: string;
  db: string;
  auth?: string = undefined;

  constructor(url: string, ns: string, db: string, auth?: string) {
    this.url = url;
    this.ns = ns;
    this.db = db;
    if (auth) this.auth = auth;
  }

  async select<T>(q: string) {
    return await f<T>(q, this.url, this.ns, this.db, this.auth);
  }
  async create(q: string) {
    return await f(q, this.url, this.ns, this.db, this.auth);
  }
  async update(q: string) {
    return await f(q, this.url, this.ns, this.db, this.auth);
  }
  async delete(q: string) {
    return await f(q, this.url, this.ns, this.db, this.auth);
  }
}

async function main() {
  const s = new Surreal(
    "http://localhost:8000/sql",
    "mpoapostolis",
    "account",
    ""
  );
  s.select(`select * from account`).then((d) => console.log(d));
}
main();
