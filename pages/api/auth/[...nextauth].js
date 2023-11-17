import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import api from '@/services/api'

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        await api.auth.login({ data: credentials }).then((response) => {
          return Promise.resolve(response.data)
        }).catch((error) => {
          console.error(error)
          return Promise.resolve(null)
        })
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout'
  }
})
