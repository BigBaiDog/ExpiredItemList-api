import { Env, ExecutionContext, Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return app.fetch(request, env, ctx)
  },

  async scheduled() {
    console.log("cron processed");
  },
}
