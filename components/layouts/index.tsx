import React, { PropsWithChildren, ReactNode, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/client'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { HOME } from 'routes'
import styled from 'styled-components'
import { theme } from 'styles/themes'
import { toast } from 'react-toastify'

import { Overlay } from 'components/overlay'
import { Header } from 'components/header'
import { Footer } from 'components/footer'

import { EnsureLoad } from 'components/data/ensureLoad'
import { useLoadingContext } from 'components/contexts/loading'

import { zIndicies } from 'styles/zIndicies'

const LayoutStyles = styled.div`
  display: flex;
  flex-direction: column;
  min-block-size: var(--app-height);

  main {
    z-index: ${zIndicies.main};
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
    max-width: ${theme('maxWidth')};
    margin-right: auto;
    margin-left: auto;
    padding: ${theme('sz32')};

    &.header-shown {
      padding-top: calc(${theme('sz80')});
    }
  }
`

export const DefaultLayout = ({
  children,
}: PropsWithChildren<ReactNode>): JSX.Element => {
  const router = useRouter()
  const [session, loading] = useSession()
  const { loadingState, setLoadingState } = useLoadingContext()

  /**
   * Reload fatal error if:
   *   - Error finding library
   *   - No found library, error creating library
   */
  const errored =
    loadingState === 'libGetFailure' || loadingState === 'libCreateFailure'

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (errored) {
      toast.warn('Issue starting Gitstagram')

      timer = setTimeout(() => {
        void signOut()
      }, 2000)
    }

    return () => timer && clearTimeout(timer)
  }, [errored, setLoadingState])

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
  const ensureLoadCompleted =
    loadingState === 'libFound' || loadingState === 'libCreateSuccess'
  const stillLoading = !loading && !!session && !ensureLoadCompleted
  const showOverlay = loading || stillLoading

  /**
   * Ensure load if:
   *   - Next-auth loaded, logged in, and loadingState is `initiating`
   */
  const ensureLoad = !loading && !!session && loadingState === 'initiating'

  return (
    <LayoutStyles>
      {showHeader && <Header />}
      {ensureLoad && <EnsureLoad />}
      <main className={cn({ ['header-shown']: showHeader })}>
        {!showOverlay && children}
      </main>
      <Footer />
      <Overlay show={showOverlay} />
    </LayoutStyles>
  )
}
