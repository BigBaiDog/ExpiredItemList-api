import { ExecutionContext, Hono } from 'hono'
import nodemailer from 'nodemailer'

const app = new Hono()

app.get('/', async (c) => {
      return c.text('Hello Hono!')
})

interface Env {
  EMAIL_ROBOT: string;
  EMAIL_AUTH_CODE: string;
}

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return app.fetch(request, env, ctx)
  },

  async scheduled(env: Env) {
    const transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    auth: {
      user: env.EMAIL_ROBOT,
      pass: env.EMAIL_AUTH_CODE
    }
  });
  console.log("邮箱配置成功");
  try {
    const info = await transporter.sendMail({
      from: "robot<" + env.EMAIL_ROBOT + ">",
      to: "770720805@qq.com, 1194423126@qq.com",
      subject: "Hello",
      text: "Hello world?text",
      html: "<b>Hello world?html</b>",
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail", err);
  }
  },
}
