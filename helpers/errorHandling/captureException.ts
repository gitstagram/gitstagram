import { captureException as sentryCaptureException } from '@sentry/nextjs'
import { CaptureContext } from '@sentry/types'

type StringIfTrue = [unknown, string] | string

export const handleErrMsg = (arr: StringIfTrue[], inside: string): string[] => {
  return arr.reduce((acc, contextItem) => {
    if (typeof contextItem === 'string') {
      const message = `\`${inside}\`: ${contextItem}`
      acc.push(message)
    } else {
      const [condition, description] = contextItem
      const message = `\`${inside}\`: ${description}`
      if (condition) acc.push(message)
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
  exception: { [key: string]: any; msgs?: StringIfTrue[]; inside: string },
  captureContext?: CaptureContext
): void | never => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment
    throw { exception, captureContext }
  } else {
    const { msgs, inside, ...rest } = exception
    const messages = msgs ? handleErrMsg(msgs, inside) : []

    sentryCaptureException({ ...rest, messages }, captureContext)
  }
}
