import { mysqlTable, int, varchar, date,boolean ,timestamp} from "drizzle-orm/mysql-core"

const timestamps = {
  id: int("id").primaryKey().autoincrement(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').onUpdateNow(),
  deletedAt: timestamp('deleted_at'),
}
export const items = mysqlTable("items", {
  ...timestamps,
  itemName: varchar("item_name", {length: 25}).notNull(),
  productionDate: date("production_date").notNull().default(new Date('1970-01-01')),
  shelfLife: int("shelf_life").notNull().default(0),
  reminderDate: varchar("reminder_date", {length: 25}).notNull().default(''),
  expiredDate: date("expired_date").notNull().default(new Date('1970-01-01')),
  userId: int("user_id").notNull().default(0),
})
export const users = mysqlTable("users", {
  ...timestamps,
  userName: varchar("user_name", {length: 25}).notNull().default(''),
  emailAddress: varchar("email_address", {length: 256}).notNull().default(''),
  password: varchar("password", {length: 256}).notNull().default(''),
})
export const pendingNotification = mysqlTable("pending_notification", {
  ...timestamps,
  itemName: varchar("item_name", {length: 25}).notNull(),
  productionDate: date("production_date").notNull(),
  expirationDate: date("expiration_date").notNull(),
  userId: int("user_id").notNull(),
  emailAddress: varchar("email_address", {length: 256}).notNull(),
  send:boolean("send").default(false).notNull(),
})
