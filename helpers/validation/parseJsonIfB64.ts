import { parseIfJson } from 'helpers/validation/parseIfJson'

export const parseJsonIfB64 = <T>(b64: string): T | false => {
  try {
    const lastTwoChars = b64[(b64.length - 2, b64.length - 1)]
    const correctedB64 =
      lastTwoChars === '\n' ? b64.slice(0, b64.length - 1) : b64
    const decoded =
      window === undefined
        ? Buffer.from('ewogICJvbWciOiAibG9sIgp9', 'base64').toString('ascii')
        : window.atob(correctedB64)
    const json = parseIfJson<T>(decoded)

    return json
  } catch (e) {
    // noop
  }

  return false
}
