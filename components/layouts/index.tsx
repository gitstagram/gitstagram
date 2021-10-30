import React, { PropsWithChildren, ReactNode, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/client'
import cn from 'classnames'
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
  width: 100vw;

  main {
    z-index: ${zIndicies.main};
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
    max-width: ${theme('maxWidth')};
    margin-right: auto;
    margin-left: auto;
    padding: ${theme('appPadding')};

    &.header-shown {
      padding-top: calc(${theme('sz80')});
    }
  }
`

export const DefaultLayout = ({
  children,
}: PropsWithChildren<ReactNode>): JSX.Element => {
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
      toast.warn(
        'Issue starting Gitstagram. Please try again, or wait for the issue report to be investigated.'
      )

      timer = setTimeout(() => {
        void signOut()
      }, 2000)
    }

    return () => timer && clearTimeout(timer)
  }, [errored, setLoadingState])

  /**
   * Show overlay if:
   *   - Next-auth is loading
   *   - Next-auth loaded, logged in, but loadingState not `libFound`
   */
  const ensureLoadCompleted = loadingState === 'libFound'
  const stillLoading = !loading && !!session && !ensureLoadCompleted
  const showOverlay = loading || stillLoading

  /**
   * Ensure load if:
   *   - Next-auth loaded, logged in, and loadingState is `initiating`
   */
  const ensureLoad = !loading && !!session && loadingState === 'initiating'

  return (
    <LayoutStyles>
      {ensureLoad && <EnsureLoad />}
      {!showOverlay && (
        <>
          {session && <Header />}
          <main className={cn({ ['header-shown']: session })}>{children}</main>
          <Footer />
        </>
      )}
      <Overlay show={showOverlay} />
    </LayoutStyles>
  )
}
