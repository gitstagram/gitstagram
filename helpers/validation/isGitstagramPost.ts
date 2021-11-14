import { is } from 'superstruct'
import {
  GitstagramPost,
  GitstagramPostStruct,
} from 'helpers/validation/structs/gitstagramPost'
import { parseIfJson } from 'helpers/validation/parseIfJson'

export const isGitstagramPost = (
  issueBody: unknown
): issueBody is GitstagramPost => {
  const json = parseIfJson(issueBody as string)
  return json ? is(json, GitstagramPostStruct) : false
}
