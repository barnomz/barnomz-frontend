import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import NavBar from '@/components/NavBar'
import { AnimatePresence, motion } from 'framer-motion'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false

export default function App({ Component, pageProps: { session, ...pageProps }, router }) {
  return (
    <SessionProvider session={session}>
      <div className='bg-primary-dark min-h-screen'>
        <NavBar />
        <AnimatePresence initial={false} mode='wait'>
          <motion.div
            key={router.asPath}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='h-[calc(100vh-3.75rem)]'
          >
            <Component key={router.asPath} {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </div>
    </SessionProvider>
  )
}
