import { string, refine } from 'superstruct'
import { nonAlphaNum } from 'helpers/validation/regex'

export const alphaNumString = refine(string(), 'alphaNumString', (value) => {
  return typeof value === 'string' && value === value.replace(nonAlphaNum, '')
})
