import express, { type NextFunction, type Request, type Response } from 'express'
import { handler as ssrHandler, options } from '../../dist/server/entry.mjs'
import fs from 'node:fs'
import { join } from 'node:path'
import { generateConfig } from '../../auth.config.js'
import { config } from 'dotenv'
import { isAuthed } from '../lib/auth.ts'

config()

const authConfig = generateConfig({
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!
})

const notFoundPage = fs.readFileSync(join(new URL(options.client).pathname, '404.html'), 'utf8')

const app = express();
const handleStatic = express.static('dist/client/')

function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404)
  res.send(notFoundPage);
}

app.use(async (req, res, next) => {
  // @ts-ignore
  if (!await isAuthed(req, authConfig)) return notFound(req, res, next)

  // handle static files first, then fallback on the SSR handler before hitting 404
  handleStatic(req, res, () => ssrHandler(req, res, () => notFound(req, res, next)));
});

app.listen(4321);
