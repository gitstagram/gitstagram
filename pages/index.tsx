import React from 'react'

import { Feed } from 'components/feed'
import * as sty from 'styles/pages/index'

const Home = (): JSX.Element => {
  const isAuthenticated = false

  return (
    <div>
      <main>
        <h1 css={sty.pageTitle}>Gitstagram</h1>
        {isAuthenticated ? <Feed /> : <>Home page</>}
      </main>
    </div>
  )
}

export default Home
