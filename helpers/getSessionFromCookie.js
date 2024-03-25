import * as jwt from 'next-auth/jwt'

/**
 * Reads the JWT token from the next-auth session cookie, and returns the
 * session object by decoding the token. Returns null if the JWT token is absent
 * or invalid
 */
export async function getSessionFromCookie({ req }) {
  try {
    const isSecure = process.env.NEXTAUTH_URL?.startsWith('https://')
    const cookiePrefix = isSecure ? '__Secure-' : ''
    const sessionToken = req.cookies?.[`${cookiePrefix}next-auth.session-token`]

    // decode will throw when the token is invalid
    const decoded = await jwt.decode({
      token: sessionToken,
      secret: String(process.env.NEXTAUTH_SECRET),
    })

    if (!decoded) return null

    return {
      user: { id: String(decoded.sub) },
      expires: new Date(Number(decoded.exp) * 1000).toISOString(),
    }
  } catch {
    return null
  }
}
