import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='fa'>
      <Head>
        <link
          rel='preload'
          href='/fonts/Vazirmatn/woff2/Vazirmatn-Regular.woff2'
          as='font'
          crossOrigin=''
          type='font/woff2'
        />
        <link
          rel='preload'
          href='/fonts/Vazirmatn/woff2/Vazirmatn-Medium.woff2'
          as='font'
          crossOrigin=''
          type='font/woff2'
        />
        <link
          rel='preload'
          href='/fonts/Vazirmatn/woff2/Vazirmatn-Bold.woff2'
          as='font'
          crossOrigin=''
          type='font/woff2'
        />
      </Head>
      <body dir={'rtl'}>
      <Main />
      <NextScript />
      </body>
    </Html>
  )
}
