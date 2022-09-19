# Connection
```ts
import { Surreal } from "surreal-db-helper/dist";

// (url: string, ns: string, db: string, auth?: string)
const surreal = new Surreal({
  url: "http://localhost:8000/sql",
  ns: "mpoapostolis",
  db: "account",
  auth: "root:root",
});

type Res = {
  id: number;
  name: string;
};

const accounts = await surr.rawQuery<Res>(`SELECT * FROM accounts`)
```

## API

### Select

```ts
// select with  id
const users = await surr.select<Res>("*")
    .from("users:mpoapostolis")
    .where({ name: "mpoapostolis" }) // where is required leave it empty if you want to select all

// select all
const account = await surr.select<Res>(["name","age"])
    .from("users")
    .where() // where is required leave it empty if you want to select all


// select with condition
const account = await surr.select<Res>(["table.*","name","age"])
    .from("users")
    .where({
        name: "mpoapostolis",
        age: 31,
        rel: table.id
    }) // where is required leave it empty if you want to select all
```

### Create

```ts
// with id
const user = await surr.create<Res>("users:mpoapostolis")
    .set({ name: "mpoapostolis", age:31  });

const user = await surr.create<Res>("users")
    .set({ name: "mpoapostolis", age:31  });

```

### UPDATE

```ts

import { ops } from "surreal-db-helper/dist";

// update id
const user = await surr.create<Res>("users:mpoapostolis")
    .set({ name: "apostolis", age:32  });
// update many
const user = await surr.create<Res>("users")
    .where(ops.gt("age", 30))
    .set({ name: "mpoapostolis", age:31  });

```


### DELETE

```ts

import { ops } from "surreal-db-helper/dist";

// delete id
const user = await surr.delete<Res>("users:mpoapostolis")
// delete many
const user = await surr.delete<Res>("users")
    .where(ops.gt("age", 30))

```


### RELATIONS

```ts
  const user  = surr.create("users:mpoapostolis")
    .set({ name: "mpoapostolis", age:31  });

  const item  = surr.create("item:sword")
    .set({ owner: "users.mpoapostolis", str:69, hp:420  });

  const mpoapostolisItems = surr.select(["*","owner.name"])
    .from("item")
    .where({ owner: "users.mpoapostolis" })

```


WITHOUT WARRANTY OR CONDITION OF ANY KIND, either express or implied. See the MIT License for more details.