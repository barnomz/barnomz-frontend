import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signOut } from 'next-auth/react'
import api from '@/services/api'

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        return await api.auth
          .login({
            data: credentials,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => res.data.data)
          .catch(() => null)
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    },
  },
})

export async function handleSignOut() {
  await api.auth.logout({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return signOut({ callbackUrl: '/auth/login' })
}
