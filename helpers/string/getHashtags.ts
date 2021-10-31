import { hashtags } from 'helpers/validation/regex'

export const getHashtags = (str: string): string[] => {
  const matches = str.match(hashtags)
  return matches ? matches : []
}
