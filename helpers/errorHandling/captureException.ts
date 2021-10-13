import { captureException as sentryCaptureException } from '@sentry/nextjs'
import { CaptureContext } from '@sentry/types'

type StringIfTrue = [unknown, string] | string

export const handleErrMsg = (arr: StringIfTrue[]): string[] => {
  return arr.reduce((acc, contextItem) => {
    if (typeof contextItem === 'string') {
      acc.push(contextItem)
    } else {
      const [condition, msg] = contextItem
      if (condition) acc.push(msg)
    }
    return acc
  }, [] as string[])
}

/*
 * Takes anything as into exception object
 *   - Passes on messages if string
 *   - If tuple [unknown, string], passes on string only if unknown condition is true
 *   - ['Error 1', [isUndefined, 'Undefined Error]] => ['Error 1', 'Undefined Error']
 */
export const captureException = (
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  exception: { [key: string]: any; msgs?: StringIfTrue[] },
  captureContext?: CaptureContext
): void | never => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment
    throw { exception, captureContext }
  } else {
    const { msgs, ...rest } = exception
    const messages = msgs ? handleErrMsg(msgs) : []

    sentryCaptureException({ ...rest, messages }, captureContext)
  }
}
