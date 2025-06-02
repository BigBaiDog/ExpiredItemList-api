// books.ts
import { Hono } from "hono"
import { env } from "hono/adapter"
import { drizzle } from "drizzle-orm/mysql2"
import { createConnection } from "mysql2"
import { pendingNotification } from "./schema"

interface HYPERDRIVE {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}

const app = new Hono()

app.get("/", async (c) => {
  const hyperdriveEnv = env<{ HYPERDRIVE: HYPERDRIVE }>(c).HYPERDRIVE
  console.log(hyperdriveEnv)
  const connection = createConnection({
                                        host: hyperdriveEnv.host,
                                        user: hyperdriveEnv.user,
                                        password: hyperdriveEnv.password,
                                        database: hyperdriveEnv.database,
                                        port: hyperdriveEnv.port,
                                        disableEval: true
                                      })
  const db = drizzle(connection)
  console.log(db)
  const aa: any[] = await db.select().from(pendingNotification)

  return c.json(aa)
})
app.post("/", (c) => c.json("create a book", 201))
app.get("/:id", (c) => c.json(`get ${c.req.param("id")}`))

export default app