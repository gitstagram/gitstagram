import React from 'react'
import { useSession } from 'next-auth/client'

import { Feed } from 'components/feed'
import * as sty from 'styles/pages/index'

const Home = (): JSX.Element => {
  const [session] = useSession()

  return (
    <div>
      <main>
        <h1 css={sty.pageTitle}>Gitstagram</h1>
        {session ? <Feed /> : <>Home page</>}
      </main>
    </div>
  )
}

export default Home
