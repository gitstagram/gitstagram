import { object, coerce, unknown, array, Infer, Struct } from 'superstruct'
import { coerceArray } from 'helpers/validation/coerceArray'
import { alphaNumString } from 'helpers/validation/structs/alphaNumString'
import { alphaNumHyphenString } from 'helpers/validation/structs/alphaNumHyphenString'

export const defaultFollowings = ['gitstagram-official']

export const LibFollowingStruct = coerce(
  array(alphaNumHyphenString),
  unknown(),
  coerceArray(
    alphaNumHyphenString as Struct<unknown, unknown>,
    defaultFollowings
  )
)

export const LibFollowingTagsStruct = coerce(
  array(alphaNumString),
  unknown(),
  coerceArray(alphaNumString as Struct<unknown, unknown>)
)

export const LibSavedStruct = coerce(
  array(alphaNumString),
  unknown(),
  coerceArray(alphaNumString as Struct<unknown, unknown>)
)

export const LibraryDataStruct = object({
  following: LibFollowingStruct,
  followingTags: LibFollowingTagsStruct,
  saved: LibSavedStruct,
})

export type LibFollowing = Infer<typeof LibFollowingStruct>
export type LibFollowingTags = Infer<typeof LibFollowingTagsStruct>
export type LibSaved = Infer<typeof LibSavedStruct>
export type LibraryData = Infer<typeof LibraryDataStruct>
