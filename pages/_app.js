import '@/styles/globals.css'
import Layout from '@/components/layout'
import {SessionProvider} from "next-auth/react"

// export const metadata = {
//   title: "صرافی ارز دیجیتال تبدیل | بهترین صرافی آنلاین ایرانی",
//   description:
//     "تبدیل، بهترین صرافی ارز دیجیتال ایرانی، تمام نیازهای شما از یک صرافی رمز ارز را تأمین می‌کند. نهایت امنیت را در سایت صرافی تبدیل تجربه کنید.",
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

export default function App({Component, pageProps: {session, ...pageProps}}) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <main>
          <Component {...pageProps} />
        </main>
      </Layout>
    </SessionProvider>
  )
}
