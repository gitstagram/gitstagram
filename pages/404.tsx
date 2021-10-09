import React from 'react'
import Head from 'next/head'
import { Mistake } from 'components/mistake'
import { TextLink } from 'components/ui'
import { HOME } from 'routes'

const NotFoundPage = (): JSX.Element => {
  const mistakeDescription =
    'This page does not exist (404). Otherwise it might have been changed or removed.'
  return (
    <>
      <Head>
        <title>Not Found · Gitstagram</title>
      </Head>
      <Mistake mistake='PAGE NOT FOUND' mistakeDescription={mistakeDescription}>
        <TextLink href={HOME} deemph>
          Return to Home Page
        </TextLink>
      </Mistake>
    </>
  )
}

export default NotFoundPage
