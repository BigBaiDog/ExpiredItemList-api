import { Env } from "./types"
import nodemailer from "nodemailer"
import { drizzle } from "drizzle-orm/mysql2"
import { createConnection } from "mysql2"
import { pendingNotification } from "./schema"
import { eq } from "drizzle-orm"

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

  const result = await db.select().from(pendingNotification).where(eq(pendingNotification.id, 1))
  console.log(result [0].expirationDate.toDateString())
  // console.log(new Date().toLocaleDateString("en-US"))

  const transporter = nodemailer.createTransport({
                                                   host: "smtp.qq.com",
                                                   port: 465,
                                                   auth: {
                                                     user: env.EMAIL_ROBOT,
                                                     pass: env.EMAIL_AUTH_CODE,
                                                   },
                                                 })
  try {
    const info = await transporter.sendMail({
                                              from: "robot<" + env.EMAIL_ROBOT + ">",
                                              to: "1194423126@qq.com",
                                              subject: "Hello",
                                              text: "Hello world?text",
                                              html: "<b>Hello world?html</b>",
                                            })
    console.log("Message sent: %s", info.messageId)
  } catch (err) {
    console.error("Error while sending mail", err)
  } finally {
    transporter.removeAllListeners() // 显式关闭
  }
}