import { captureException } from 'helpers'

import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  jwt: {
    // key created with: `yarn jose newkey -s 512 -t oct -a HS512 -b`
    signingKey: JSON.stringify({
      kty: 'oct',
      kid: process.env.JWT_SIGNING_KEY_ID,
      alg: 'HS512',
      k: process.env.JWT_SIGNING_KEY,
    }),
  },
  callbacks: {
    jwt(token, _, account) {
      if (account?.accessToken) token.accessToken = account.accessToken
      return token
    },
    session(session, token) {
      session.accessToken = token.accessToken
      return session
    },
  },
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'user public_repo delete_repo',
    }),
  ],
  logger: {
    error: (code, metadata) =>
      captureException({ code, metadata, msgs: ['NextAuth error'] }),
    warn: () => undefined,
    debug: () => undefined,
  },
})
