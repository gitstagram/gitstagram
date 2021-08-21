import React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Auth0Provider } from '@auth0/auth0-react'

import { GlobalStyles } from 'styles/global'
import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/typography.css'

import { DefaultLayout } from 'components/layouts'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Auth0Provider
      domain='dev-igi1dzxy.auth0.com'
      clientId='yhS6TIgUzw1KVo8QKY53omGC4UBzUd2y'
      redirectUri='http://localhost:3000'
    >
      <GlobalStyles />
      <Head>
        <title>Gitstagram</title>
        <meta name='description' content='Gitstagram' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </Auth0Provider>
  )
}

export default App
