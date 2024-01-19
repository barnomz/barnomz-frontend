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
          .login({ data: credentials })
          .then((response) => {
            return Promise.resolve(response.data)
          })
          .catch((error) => {
            console.error(error)
            return Promise.resolve(null)
          })
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
        const { token, user: u } = user

        return {
          token,
          user: u,
        }
      }

      // if (Date.now() < new Date(token.accessTokenExpiresAt).getTime()) {
      //   return token
      // }

      return null
    },
    session: (session, token) => {
      session.user = token.user
      session.accessToken = token.token
      session.error = token.error

      return session
    },
  },
})
