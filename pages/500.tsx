import React from 'react'
import Head from 'next/head'
import { Mistake } from 'components/mistake'
import { TextLink } from 'components/ui'

const ServerErrorPage = (): JSX.Element => {
  const mistakeDescription =
    'Something went wrong processing this request (500). Please try again, or wait for the issue report to be investigated.'
  return (
    <>
      <Head>
        <title>Error · Gitstagram</title>
      </Head>
      <Mistake mistake='ERROR OCCURRED' mistakeDescription={mistakeDescription}>
        <TextLink
          href='https://github.com/mongkuen/gitstagram/issues'
          deemph
          external
        >
          Report problem in a Github issue
        </TextLink>
      </Mistake>
    </>
  )
}

export default ServerErrorPage
