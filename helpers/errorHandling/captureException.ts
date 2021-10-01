import { captureException as sentryCaptureException } from '@sentry/nextjs'
import { CaptureContext } from '@sentry/types'

export const captureException = (
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  exception: any,
  captureContext?: CaptureContext
): void | never => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment
    throw { exception, captureContext }
  } else {
    sentryCaptureException(exception, captureContext)
  }
}
