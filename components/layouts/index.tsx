import React, { PropsWithChildren, ReactNode } from 'react'
import { useSession } from 'next-auth/client'
import styled from 'styled-components'
import { Header } from 'components/header'
import { Footer } from 'components/footer'

const LayoutStyles = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
`

export const DefaultLayout = ({
  children,
}: PropsWithChildren<ReactNode>): JSX.Element => {
  const [session] = useSession()

  return (
    <LayoutStyles>
      {session && <Header />}
      <main>{children}</main>
      <Footer />
    </LayoutStyles>
  )
}
