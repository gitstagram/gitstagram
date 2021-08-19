import React from 'react'
import Head from 'next/head'

const Home = (): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Gitstagram</title>
        <meta name='description' content='Gitstagram' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <h1>Gitstagram</h1>
      </main>
    </div>
  )
}

export default Home
