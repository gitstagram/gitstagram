import React from 'react'
import { TextLink } from 'components/ui'
import { Mistake } from 'components/mistake'
import { captureException } from 'helpers'

type ErrorBoundaryState = {
  errored: boolean
}

export class ErrorBoundary extends React.Component {
  state = {
    errored: false,
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { errored: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    captureException({ error, info })
  }

  render(): React.ReactNode {
    return this.state.errored ? (
      <Mistake
        mistake='SOMETHING WENT WRONG'
        mistakeDescription='Something unexpected happened. Please try again, or wait for the issue report to be investigated.'
        expand
      >
        <TextLink
          href='https://github.com/mongkuen/gitstagram/issues'
          deemph
          external
        >
          Report problem in a Github issue
        </TextLink>
      </Mistake>
    ) : (
      this.props.children
    )
  }
}
