import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { New } from 'components/new'
import { HOME } from 'routes'

const NewPage = (): JSX.Element => {
  const [session] = useSession()
  const router = useRouter()

  if (session) {
    return (
      <>
        <Head>
          <title>New Post · Gitstagram</title>
        </Head>
        <New />
      </>
    )
  } else {
    void router.push(HOME)
    return <></>
  }
}

export default NewPage
