import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import api from '@/services/api'

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await api.auth
          .login({
            data: credentials,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => Promise.resolve(res.data))
          .catch((err) => Promise.reject(err))
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
  },
  callbacks: {
    jwt: async (token, user) => {
      if (user) {
        token.accessToken = user.access_token
        token.accessTokenExpiresAt = user.expires_at
      }

      if (Date.now() < new Date(token.accessTokenExpiresAt).getTime()) {
        return token
      }

      return null
    },
    session: (session, token) => {
      session.accessToken = token.accessToken
      session.error = token.error

      return session
    },
  },
})
