import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { Settings } from 'components/settings'
import { HOME } from 'routes'

const SettingsPage = (): JSX.Element => {
  const [session] = useSession()
  const router = useRouter()

  if (session) {
    return (
      <>
        <Head>
          <title>Settings · Gitstagram</title>
        </Head>
        <Settings />
      </>
    )
  } else {
    void router.push(HOME)
    return <></>
  }
}

export default SettingsPage
