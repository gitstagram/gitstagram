import React from 'react'
import { useRouter } from 'next/router'
import { Profile } from 'components/profile'

const ProfilePage = (): JSX.Element => {
  const router = useRouter()
  const { name } = router.query
  return <Profile name={name as string} />
}

export default ProfilePage
