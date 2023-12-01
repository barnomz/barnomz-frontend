import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='fa'>
      <Head>
        <link
          rel='preload'
          href='/fonts/IRANYekan/woff2/IRANYekanWebRegular.woff2'
          as='font'
          crossOrigin=''
          type='font/woff2'
        />
        <link
          rel='preload'
          href='/fonts/IRANYekan/woff2/IRANYekanWebMedium.woff'
          as='font'
          crossOrigin=''
          type='font/woff2'
        />
        <link
          rel='preload'
          href='/fonts/IRANYekan/woff2/IRANYekanWebBold.woff'
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
