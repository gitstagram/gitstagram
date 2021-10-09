import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Profile } from 'components/profile'

const ProfilePage = (): JSX.Element => {
  const router = useRouter()
  const { userLogin } = router.query
  return (
    <>
      <Head>
        <title>{userLogin} · Gitstagram</title>
      </Head>
      <Profile userLogin={userLogin as string} />
    </>
  )
}

export default ProfilePage
