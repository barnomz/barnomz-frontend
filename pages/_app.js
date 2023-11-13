import '@/styles/globals.css'
import Layout from '../components/layout'
import {SessionProvider} from "next-auth/react"

export default function App({Component, pageProps: {session, ...pageProps}}) {
  return (
    <Layout>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Layout>
  )
}
