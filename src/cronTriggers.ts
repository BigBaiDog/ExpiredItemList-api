import { Env } from "./types"
import nodemailer from "nodemailer"
import { drizzle } from "drizzle-orm/mysql2"
import { createConnection } from "mysql2"
import { pendingNotification } from "./schema"
import { and,eq,lte } from "drizzle-orm"

export async function sendMailMessage(env: Env): Promise<void> {
  const hyperdriveEnv = env.HYPERDRIVE
  const connection = createConnection({
                                                   host: hyperdriveEnv.host,
                                                   user: hyperdriveEnv.user,
                                                   password: hyperdriveEnv.password,
                                                   database: hyperdriveEnv.database,
                                                   port: hyperdriveEnv.port,
                                                   disableEval: true,
                                                 })
  const db = drizzle(connection)
  const result = await db.select()
                                                           .from(pendingNotification)
                                                           .where(
                                                               and(
                                                                   eq(pendingNotification.userId, 7),
                                                                   eq(pendingNotification.send, false),
                                                                   lte(pendingNotification.expirationDate, new Date())
                                                               )
                                                           )
  console.log(result)
  if (result){
    const message = result[0];
    const transporter = nodemailer.createTransport({
                                                     host: "smtp.qq.com",
                                                     port: 465,
                                                     auth: {
                                                       user: env.EMAIL_ROBOT,
                                                       pass: env.EMAIL_AUTH_CODE,
                                                     }
                                                   })
    try {
      const info = await transporter.sendMail({
                                                from: "robot<" + env.EMAIL_ROBOT + ">",
                                                to: message.emailAddress,
                                                subject: "你的"+ message.itemName + "即将过期",
                                                html: message.itemName+"将于" + message.expirationDate.toLocaleDateString() + "过期，请尽快处理。",
                                              })
      await db.update(pendingNotification)
                         .set({
                                send: true,
                              })
                         .where(eq(pendingNotification.id, message.id))
      console.log("Message sent: %s", info.messageId)
    } catch (err) {
      console.error("Error while sending mail", err)
    } finally {
      transporter.removeAllListeners() // 显式关闭
    }
  } else {
    console.log('没有物品将要过期')
  }
}