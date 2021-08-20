import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  color: blue;
`

const Home = (): JSX.Element => {
  return (
    <div>
      <main>
        <Title
          css={`
            text-decoration: underline;
          `}
        >
          Gitstagram
        </Title>
      </main>
    </div>
  )
}

export default Home
