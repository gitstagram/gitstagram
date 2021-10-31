import { nonAlphaNum } from 'helpers/validation/regex'

export const getSanitizedFileExtension = (fileName: string): string => {
  const parts = fileName.split('.')
  if (parts.length < 2) {
    return ''
  } else {
    const lastPart = parts[parts.length - 1]
    // File names can have #hash endings or ?query endings
    // Replace all non alpha-num with period, and select the first portion
    const replaceNonAlphaNum = lastPart.replace(nonAlphaNum, '.')
    const extension = replaceNonAlphaNum.split('.')[0]
    return extension ? extension : ''
  }
}
