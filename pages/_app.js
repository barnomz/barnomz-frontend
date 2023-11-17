import '@/styles/globals.css'
import Layout from '@/components/layout'
import {SessionProvider} from "next-auth/react"
import localFont from "next/font/local"

// export const metadata = {
//   title: "صرافی ارز دیجیتال تبدیل | بهترین صرافی آنلاین ایرانی",
//   description:
//     "تبدیل، بهترین صرافی ارز دیجیتال ایرانی، تمام نیازهای شما از یک صرافی رمز ارز را تأمین می‌کند. نهایت امنیت را در سایت صرافی تبدیل تجربه کنید.",
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

const vazirmatn = localFont({
  src: [
    {
      path: "../public/fonts/Vazirmatn/woff2/Vazirmatn-Regular.woff2",
      weight: "400",
      style: "normal",
      display: "swap",
    },
    {
      path: "../public/fonts/Vazirmatn/ttf/Vazirmatn-Regular.ttf",
      weight: "400",
      style: "normal",
      display: "swap",
    },
    {
      path: "../public/fonts/Vazirmatn/woff2/Vazirmatn-Medium.woff2",
      weight: "500",
      style: "normal",
      display: "swap",
    },
    {
      path: "../public/fonts/Vazirmatn/ttf/Vazirmatn-Medium.ttf",
      weight: "500",
      style: "normal",
      display: "swap",
    },

    {
      path: "../public/fonts/Vazirmatn/woff2/Vazirmatn-Bold.woff2",
      weight: "500",
      style: "normal",
      display: "swap",
    },
    {
      path: "../public/fonts/Vazirmatn/ttf/Vazirmatn-Bold.ttf",
      weight: "500",
      style: "normal",
      display: "swap",
    },
  ],
  variable: "--font-sans",
});

export default function App({Component, pageProps: {session, ...pageProps}}) {
  return (
    <Layout>
      <SessionProvider session={session}>
        <main className={vazirmatn.className}>
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </Layout>
  )
}
