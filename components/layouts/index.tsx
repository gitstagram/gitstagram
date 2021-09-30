import React, { PropsWithChildren, ReactNode } from 'react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { HOME } from 'routes'
import styled from 'styled-components'
import { theme } from 'styles/themes'

import { Overlay } from 'components/overlay'
import { Header } from 'components/header'
import { Footer } from 'components/footer'

import { EnsureLoad } from 'components/data/ensureLoad'
import { useLoadingContext } from 'components/contexts/loading'

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
    padding-top: calc(${theme('sz64')});
  }
`

export const DefaultLayout = ({
  children,
}: PropsWithChildren<ReactNode>): JSX.Element => {
  const router = useRouter()
  const [session, loading] = useSession()
  const { loadingState } = useLoadingContext()

  /**
   * Show header if:
   *   - Logged in
   *   - Not logged in, but viewing page besides Home
   */
  const isHome = router.pathname === HOME
  const showHeader = session || (!session && !isHome)

  /**
   * Show overlay if:
   *   - Next-auth is loading
   *   - Next-auth loaded, logged in, but loadingState not `libFound` or `libCreateSuccess`
   */
  const hasLib =
    loadingState === 'libFound' || loadingState === 'libCreateSuccess'
  const loadingLibs = !loading && !!session && !hasLib
  const showOverlay = loading || loadingLibs

  /**
   * Ensure load if:
   *   - Next-auth loaded, logged in, and loadingState is `initiating`
   */
  const ensureLoad = !loading && !!session && loadingState === 'initiating'

  return (
    <LayoutStyles>
      {showHeader && <Header />}
      {ensureLoad && <EnsureLoad />}
      <main>{!showOverlay && children}</main>
      <Footer />
      <Overlay show={showOverlay} />
    </LayoutStyles>
  )
}
