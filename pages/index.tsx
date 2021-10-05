import React from 'react'
import { useSession } from 'next-auth/client'

import { Feed } from 'components/feed'
import { Landing } from 'components/landing'

const HomePage = (): JSX.Element => {
  const [session, loading] = useSession()
  return loading ? <></> : session ? <Feed /> : <Landing />
}

export default HomePage
