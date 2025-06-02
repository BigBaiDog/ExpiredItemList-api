import { Hono } from "hono"
import nodemailer from "nodemailer"
import { ScheduledController } from "@cloudflare/workers-types"
import authors from "./authors"
import books from "./books"

const app = new Hono()

app.route("/authors", authors)
app.route("/books", books)

interface Env {
  EMAIL_ROBOT: string;
  EMAIL_AUTH_CODE: string;
}

export default {
  fetch: app.fetch,
  scheduled: async (controller: ScheduledController, env: Env) => {
    const transporter = nodemailer.createTransport({
                                                     host: "smtp.qq.com",
                                                     port: 465,
                                                     auth: {
                                                       user: env.EMAIL_ROBOT,
                                                       pass: env.EMAIL_AUTH_CODE
                                                     }
                                                   })
    console.log(env.EMAIL_ROBOT)
    console.log(env.EMAIL_AUTH_CODE)
    console.log("邮箱配置成功")
    try {
      const info = await transporter.sendMail({
                                                from: "robot<" + env.EMAIL_ROBOT + ">",
                                                to: "770720805@qq.com, 1194423126@qq.com",
                                                subject: "Hello",
                                                text: "Hello world?text",
                                                html: "<b>Hello world?html</b>"
                                              })
      console.log("Message sent: %s", info.messageId)
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
    } catch (err) {
      console.error("Error while sending mail", err)
    } finally {
      transporter.removeAllListeners() // 显式关闭
    }
  }
}
