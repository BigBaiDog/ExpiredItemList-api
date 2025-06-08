import { Hono } from "hono"
import { items } from "./schema"
import { CustomVariables } from "./types"
import {connectDatabaseMiddleware} from './middleware'
import { and, eq, isNull } from "drizzle-orm"

const app = new Hono<CustomVariables>()

app.get("/",connectDatabaseMiddleware, async (c) => {
  const db = c.get('databaseInstance')
  const result = await db.select().from(items).where(and(
      isNull(items.deletedAt),
      eq(items.userId,7)
  ))

  return c.json({'code':  200, 'data': result})
})

app.post("/",connectDatabaseMiddleware,  async (c) => {
  const body = await c.req.json()
  const db = c.get('databaseInstance')
  const result =await db.insert(items).values({
                                  itemName:body.itemName,
                                  productionDate: new Date(body.productionDate),
                                  shelfLife: parseInt(body.shelfLife),
                                  reminderDate: body.reminderDate,
                                  expiredDate: new Date(body.expiredDate),
                                });

  c.json(result)
})
app.get("/:id", (c) => c.json(`get ${c.req.param("id")}`))

export default app