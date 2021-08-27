import React from 'react'
import { useSession } from 'next-auth/client'

import { Feed } from 'components/feed'
import { Landing } from 'components/landing'

const Home = (): JSX.Element => {
  const [session] = useSession()
  return session ? <Feed /> : <Landing />
}

export default Home
