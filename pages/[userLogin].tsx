import React from 'react'
import { useRouter } from 'next/router'
import { Profile } from 'components/profile'

const ProfilePage = (): JSX.Element => {
  const router = useRouter()
  const { userLogin } = router.query
  return <Profile userLogin={userLogin as string} />
}

export default ProfilePage
