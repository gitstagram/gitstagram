import React from 'react'
import { useRouter } from 'next/router'
import { TextLogo, H3 } from 'components/ui'
import { HOME, SETTINGS, PROFILE, NEW, COMMENTS } from 'routes'

export const MobileTitle = (): JSX.Element => {
  const router = useRouter()
  const path = router.pathname

  const { userLogin } = router.query

  return path === SETTINGS ? (
    <H3>Settings</H3>
  ) : path === PROFILE ? (
    <H3>{userLogin}</H3>
  ) : path === NEW ? (
    <H3>New Post</H3>
  ) : path === COMMENTS ? (
    <H3>Comments</H3>
  ) : (
    <TextLogo href={HOME} />
  )
}
