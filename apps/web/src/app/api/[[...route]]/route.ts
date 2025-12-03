import { Hono } from 'hono'
import { handle } from 'hono/vercel'

const app = new Hono()
  .basePath('/api')

const getApp = app
  .get('/health', async (c) => c.json({ message: 'OK' }, 200))

// const postApp = app
//   .post('/access-token/exchange', (c) => {
//
//   })

export const GET = handle(getApp)
// export const POST = handle(postApp)
