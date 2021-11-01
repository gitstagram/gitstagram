import { is } from 'superstruct'
import {
  GitstagramPost,
  GitstagramPostStruct,
} from 'helpers/validation/structs/gitstagramPost'
import { parseIfJson } from 'helpers/validation/parseIfJson'

export const isGitstagramPost = (
  issueBodyText: unknown
): issueBodyText is GitstagramPost => {
  const json = parseIfJson(issueBodyText as string)
  return json ? is(json, GitstagramPostStruct) : false
}
