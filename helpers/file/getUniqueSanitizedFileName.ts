import { getSanitizedFileExtension } from 'helpers/file/getSanitizedFileExtension'
import { getSanitizedFileName } from 'helpers/file/getSanitizedFileName'
import { nanoid } from 'helpers/string/nanoid'

export const getUniqueSanitizedFileName = (fileName: string): string => {
  const sanitizedFileExtension = getSanitizedFileExtension(fileName)
  const fileExtension = sanitizedFileExtension ? sanitizedFileExtension : 'png'
  const sanitizedFileName = getSanitizedFileName(fileName)
  const fileId = nanoid()
  const hyphen = sanitizedFileName ? '-' : ''
  const finalFileName = `${sanitizedFileName}${hyphen}${fileId}.${fileExtension}`
  return finalFileName
}
