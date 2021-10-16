import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { Profile } from 'components/profile'
import { HOME } from 'routes'

const ProfilePage = (): JSX.Element => {
  const [session] = useSession()
  const router = useRouter()
  const { userLogin } = router.query

  if (session) {
    return (
      <>
        <Head>
          <title>{userLogin} · Gitstagram</title>
        </Head>
        <Profile userLogin={userLogin as string} />
      </>
    )
  } else {
    void router.push(HOME)
    return <></>
  }
}

export default ProfilePage
