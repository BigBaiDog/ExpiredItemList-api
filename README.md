```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

本地开发使用 Wrangler 测试 Cron 触发器

npx wrangler dev --test-scheduled

curl "http://localhost:8787/__scheduled?cron=0+*+*+*+*"