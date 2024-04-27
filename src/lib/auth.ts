import { Auth, type AuthConfig } from "@auth/core"
import type { Session } from "@auth/core/types"
import type { FullAuthConfig } from "auth-astro/src/config"

/**
 * An array of path prefixes to require authentication for.
 */
export const paths = [
  '/guides',
  '/reference',
  '/pagefind'
]

/**
 * Check if the request is authorized.
 * @param req The request
 * @param options Your auth config
 * @returns `true` if the request is authorized, `false` otherwise
 */
export async function isAuthed(req: Request, options: FullAuthConfig) {
  // @ts-ignore Logic to deal with runtime differences
  const url = new URL(req.url.pathname ?? req.url, `${process.env.DEV ? 'http' : 'https'}://${req.headers.host}`)
  if (!paths.find(p => url.pathname.startsWith(p))) return true

  const session = await getSession(req, options)

  if (!session) return false

  ////////////////////////////////////
  // Add custom authorization steps //
  ////////////////////////////////////

  return true
}

/**
 * Fetches the current session. This is a modified implementation for use outside of Astro's runtime. Prefer `import { getSession } from "auth-astro/server"` over this if using in Astro.
 * @param req The request object.
 * @param options Optional Auth.js options
 * @returns The current session, or `null` if there is no session.
 */
export async function getSession(req: Request, options: AuthConfig): Promise<Session | null> {
  options.secret = process.env.AUTH_SECRET
  options.trustHost = true
  options.basePath = '/auth'

  // `req.url` can exclude the domain, so
  // @ts-ignore
	const url = new URL(`${options.basePath}/session`, `${process.env.DEV ? 'http' : 'https'}://${req.headers.host}`)
  // @ts-ignore
	const response = await Auth(new globalThis.Request(url, { headers: req.headers }), options)
	const { status = 200 } = response

  // @ts-ignore
	const data = await response.json()

	if (!data || !Object.keys(data).length) return null
	if (status === 200) return data
	throw new Error(data.message)
}
