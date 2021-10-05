import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { Settings } from 'components/settings'
import { HOME } from 'routes'

const SettingsPage = (): JSX.Element => {
  const [session] = useSession()
  const router = useRouter()

  if (!session) void router.push(HOME)
  return <Settings />
}

export default SettingsPage
