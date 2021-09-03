import React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'
import { Provider } from 'next-auth/client'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'

import { GlobalStyles } from 'styles/global'
import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/typography.css'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { DefaultLayout } from 'components/layouts'

// Calculates proper 100vh size without iOS Safari navigation and document bars
// https://dev.to/maciejtrzcinski/100vh-problem-with-ios-safari-3ge9
const initializeAppHeight = `
  (function () {
    const setAppHeight = () => {
      const docElem = document.documentElement
      const height = docElem.clientHeight + 'px'
      docElem.style.setProperty('--app-height', height)
    }
    window.addEventListener('resize', setAppHeight)
    setAppHeight()
  })()
`

interface PageProps {
  session: Session
}

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Provider session={(pageProps as PageProps).session}>
      <GlobalStyles />
      <Head>
        <title>Gitstagram</title>
        <meta name='description' content='Gitstagram' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, viewport-fit=cover'
        />
        <script dangerouslySetInnerHTML={{ __html: initializeAppHeight }} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <DefaultLayout>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </DefaultLayout>
      <ToastContainer />
    </Provider>
  )
}

export default App
