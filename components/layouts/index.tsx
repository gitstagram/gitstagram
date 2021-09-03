import React, { PropsWithChildren, ReactNode } from 'react'
import { useSession } from 'next-auth/client'
import styled from 'styled-components'
import { theme } from 'styles/themes'

import { Header } from 'components/header'
import { Footer } from 'components/footer'

const LayoutStyles = styled.div`
  display: flex;
  flex-direction: column;
  min-block-size: var(--app-height);

  main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: ${theme('maxWidth')};
    margin-right: auto;
    margin-left: auto;
    padding: ${theme('sz24')};
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
