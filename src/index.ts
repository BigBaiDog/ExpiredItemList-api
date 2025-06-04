import { Hono } from "hono"
import { ScheduledController } from "@cloudflare/workers-types"
import { Env } from "./types"
import authors from "./authors"
import books from "./books"

const app = new Hono()

app.route("/authors", authors)
app.route("/books", books)

export default {
  fetch: app.fetch,
  async scheduled(_controller: ScheduledController, env: Env) {
    const {sendMailMessage} = await import("./cronTriggers")
    await sendMailMessage(env)
    console.log("cron processed")
  },
}
