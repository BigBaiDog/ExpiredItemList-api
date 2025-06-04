import { mysqlTable, int, varchar, date } from "drizzle-orm/mysql-core"

export const pendingNotification = mysqlTable("pending_notification", {
  id: int("id").primaryKey().autoincrement(),
  itemName: varchar("item_name", {length: 25}).notNull(),
  productionDate: date("production_date").notNull(),
  expirationDate: date("expiration_date").notNull(),
  userId: int("user_id").notNull(),
  emailAddress: varchar("email_address", {length: 256}).notNull()
})
