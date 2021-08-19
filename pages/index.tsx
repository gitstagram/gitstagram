import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'

const Title = styled.h1`
  color: blue;
`

const Home = (): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Gitstagram</title>
        <meta name='description' content='Gitstagram' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Title
          css={`
            text-decoration: underline;
          `}
        >
          Gitstagram
        </Title>
      </main>
    </div>
  )
}

export default Home
