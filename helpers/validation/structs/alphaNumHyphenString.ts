import { string, refine } from 'superstruct'
import { nonAlphaNumHyphen } from 'helpers/validation/regex'

export const alphaNumHyphenString = refine(
  string(),
  'alphaNumHyphenString',
  (value) => {
    return (
      typeof value === 'string' &&
      value === value.replace(nonAlphaNumHyphen, '')
    )
  }
)
