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
        try {
          const res = await api.auth.login({
            data: credentials,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          console.log(res.data)
          if (res.data) {
            res.data.token =
              'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiaWQiOiIyYWY5M2E5MTc5NzE1ZjMzMzNlZDRlZDRjMmI0YjJkMWYxMDQ0MjJjNTRjOTQ2OTUxMThhNGI4YTJjNjJlYjAwIiwidXNlcl9pZCI6MzA4NDQ5LCJ1c2VybmFtZSI6IjkxMDIzMzEzMTEiLCJvcmlnX2lhdCI6MTcwNDQ2NTIxOSwiZGV2aWNlX2lkIjoiNzUzZDAxOGE5YWE1YzlkNzY0Y2E1MGM3MWRhYTllNDgiLCJleHAiOjE3MDcwNTcyMTl9.lJw-isiJFRJNET8yFgfIrjFepvTwsy-kIpNclquk819-msNWRzzVsRQK46cjN0hHlAcZ9BUtJv4J3K6KFtomtw'
            return res.data
          } else {
            return null
          }
        } catch (error) {
          console.error(error)
          return null
        }
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
