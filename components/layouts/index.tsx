import React, { PropsWithChildren, ReactNode } from 'react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { HOME } from 'routes'
import styled from 'styled-components'
import { theme } from 'styles/themes'

import { Overlay } from 'components/overlay'
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
    width: 100%;
    max-width: ${theme('maxWidth')};
    margin-right: auto;
    margin-left: auto;
    padding: ${theme('sz24')};
  }
`

export const DefaultLayout = ({
  children,
}: PropsWithChildren<ReactNode>): JSX.Element => {
  const router = useRouter()
  const [session, loading] = useSession()

  const isHome = router.pathname === HOME
  const showHeader = session || (!session && !isHome)

  return (
    <LayoutStyles>
      {showHeader && <Header />}
      <main>{children}</main>
      <Footer />
      <Overlay loading={loading} />
    </LayoutStyles>
  )
}
