#Example
```js

// (url: string, ns: string, db: string, auth?: string)
const surr = new Surreal(
  "http://localhost:8000/sql",
  "ns",
  "db",
  "Basic ___" // optional
);

const accounts = await surr.select(`SELECT * FROM accounts`)

await surr.create(`CREATE accounts:mpoapostolis`)
await surr.update(`UPDATE accounts:mpoapostolis SET name=mpoapostolis`)
await surr.delete(`DELETE accounts:mpoapostolis`)

````

WITHOUT WARRANTY OR CONDITION OF ANY KIND, either express or implied. See the MIT License for more details.