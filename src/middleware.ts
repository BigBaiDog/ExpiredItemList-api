import { createMiddleware } from 'hono/factory'
import { env } from "hono/adapter"
import { HYPERDRIVE } from "./types"
import { createConnection } from "mysql2"
import { drizzle } from "drizzle-orm/mysql2"

export const connectDatabaseMiddleware = createMiddleware(async (c, next) => {
  const hyperdriveEnv = env<{ HYPERDRIVE: HYPERDRIVE }>(c).HYPERDRIVE
  console.log('获取hyperdrive')
  console.log(hyperdriveEnv)
  const connection = createConnection({
                                        host: hyperdriveEnv.host,
                                        user: hyperdriveEnv.user,
                                        password: hyperdriveEnv.password,
                                        database: hyperdriveEnv.database,
                                        port: hyperdriveEnv.port,
                                        disableEval: true
  })
  const databaseInstance = drizzle(connection)
  c.set('databaseInstance', databaseInstance)
  await next()
})