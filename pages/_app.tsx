import React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'

import { GlobalStyles } from 'styles/global'
import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/typography.css'

import { DefaultLayout } from 'components/layouts'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <GlobalStyles />
      <Head>
        <title>Gitstagram</title>
        <meta name='description' content='Gitstagram' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </>
  )
}

export default App
