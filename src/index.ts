import { Hono } from "hono"
import { ScheduledController } from "@cloudflare/workers-types"
import { Env } from "./types"
import items from "./items"
const app = new Hono()

app.route("/items", items)

export default {
  fetch: app.fetch,
  async scheduled(_controller: ScheduledController, env: Env) {
    const {sendMailMessage} = await import("./cronTriggers")
    await sendMailMessage(env)
    console.log("cron processed")
  }
}
