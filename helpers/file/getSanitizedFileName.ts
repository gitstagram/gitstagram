import { nonAlphaNum, unsafeFileName } from 'helpers/validation/regex'

export const getSanitizedFileName = (fileName: string): string => {
  const unsafeFileNameVal = RegExp(unsafeFileName).exec(fileName)
  if (unsafeFileNameVal && unsafeFileNameVal[0]) {
    const safeFileName = unsafeFileNameVal[0].replace(nonAlphaNum, '')
    return safeFileName ? safeFileName : ''
  } else {
    const safeFileName = fileName.replace(nonAlphaNum, '')
    return safeFileName ? safeFileName : ''
  }
}
