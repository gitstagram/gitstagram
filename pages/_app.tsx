import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'
import { Provider } from 'next-auth/client'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'
import { Provider as ReakitProvider } from 'reakit'

import { GlobalStyles } from 'styles/global'
import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/typography.css'
import 'styles/bootstrapIconsSubset.css'

import 'focus-visible/dist/focus-visible.min.js'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { DefaultLayout } from 'components/layouts'
import { LoadingContextProvider } from 'components/contexts/loading'
import { ErrorBoundary } from 'components/errorBoundaries'

import TopBarProgress from 'react-topbar-progress-indicator'

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
  const router = useRouter()
  const [progress, setProgress] = useState(false)

  useEffect(() => {
    const handleRouteChange = () => setProgress(true)
    const handleRouteComplete = () => setProgress(false)

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteComplete)
    }
  }, [router.events])

  return (
    <Provider session={(pageProps as PageProps).session}>
      <GlobalStyles />
      <ErrorBoundary>
        <LoadingContextProvider>
          <ReakitProvider>
            <Head>
              <title>Gitstagram</title>
              <meta name='description' content='Gitstagram' />
              <meta
                name='viewport'
                content='width=device-width, initial-scale=1, viewport-fit=cover'
              />
              <script
                dangerouslySetInnerHTML={{ __html: initializeAppHeight }}
              />
              <link rel='icon' href='/favicon.ico' />
            </Head>{' '}
            <ApolloProvider client={apolloClient}>
              <DefaultLayout>
                {progress && <TopBarProgress />}
                <Component {...pageProps} />
              </DefaultLayout>
            </ApolloProvider>
            <ToastContainer />
          </ReakitProvider>
        </LoadingContextProvider>
      </ErrorBoundary>
    </Provider>
  )
}

export default App
