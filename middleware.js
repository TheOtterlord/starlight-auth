import { next, rewrite } from '@vercel/edge'
import { generateConfig } from './auth.config.js'
import { isAuthed } from './src/lib/auth'

export default async function middleware(request) {
  const authConfig = generateConfig({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  })

  if (!await isAuthed(request, authConfig)) return rewrite('/404')

  return next()
}
