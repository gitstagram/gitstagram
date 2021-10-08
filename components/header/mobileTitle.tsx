import React from 'react'
import { useRouter } from 'next/router'
import { TextLogo, H3 } from 'components/ui'
import { HOME, SETTINGS, PROFILE } from 'routes'

export const MobileTitle = (): JSX.Element => {
  const router = useRouter()
  const path = router.pathname

  const { name } = router.query

  return path === SETTINGS ? (
    <H3>Settings</H3>
  ) : path === PROFILE ? (
    <H3>{name}</H3>
  ) : (
    <TextLogo href={HOME} />
  )
}
