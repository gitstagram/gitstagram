import { isJson } from 'helpers/validation/isJson'

export const coerceB64ToJson = <T>(b64: string): T | false => {
  try {
    const lastTwoChars = b64[(b64.length - 2, b64.length - 1)]
    const correctedB64 =
      lastTwoChars === '\n' ? b64.slice(0, b64.length - 1) : b64
    const decoded = atob(correctedB64)
    const json = isJson<T>(decoded)

    return json
  } catch (e) {
    // noop
  }

  return false
}
