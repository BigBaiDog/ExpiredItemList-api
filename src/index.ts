import {Env, Hono} from 'hono'
import nodemailer from 'nodemailer'
// import { ScheduledController } from '@cloudflare/workers-types'
import authors from './authors'
import books from './books'
import {sendMailMessage} from './cronTriggers'

const app = new Hono()
// const send = new sendMailMessage()
app.route('/authors', authors)
app.route('/books', books)

interface Env {
  EMAIL_ROBOT: string;
  EMAIL_AUTH_CODE: string;
}

export default {
  fetch: app.fetch,
  scheduled: (event: any, env: Env) => {
    sendMailMessage(env)
  }
}
