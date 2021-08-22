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
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string}
      redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL as string}
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
