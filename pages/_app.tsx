import React from 'react'
import type { AppProps } from 'next/app'
import { GlobalStyles } from 'styles/global'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

export default App
