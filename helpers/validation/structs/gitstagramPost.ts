import {
  object,
  string,
  array,
  Infer,
  size,
  integer,
  pattern,
} from 'superstruct'
import { githubMedia, taggedUser } from 'helpers/validation/regex'

export const TaggedUserStruct = object({
  xPercent: size(integer(), 0, 100),
  yPercent: size(integer(), 0, 100),
  userLogin: pattern(string(), taggedUser),
})

export const MediaObjStruct = object({
  src: pattern(string(), githubMedia),
  altText: string(),
  taggedUsers: array(TaggedUserStruct),
})

export const GitstagramPostStruct = object({
  media: size(array(MediaObjStruct), 1),
  location: size(string(), 0, 255),
  caption: string(),
})

export type TaggedUser = Infer<typeof TaggedUserStruct>
export type MediaObj = Infer<typeof MediaObjStruct>
export type GitstagramPost = Infer<typeof GitstagramPostStruct>
