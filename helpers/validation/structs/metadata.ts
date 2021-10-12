import { object, coerce, unknown, array, Struct, Infer } from 'superstruct'
import { coerceArray } from 'helpers/validation/coerceArray'
import { alphaNumHyphenString } from 'helpers/validation/structs/alphaNumHyphenString'

export const MetaLoginSearchPartsStruct = coerce(
  array(alphaNumHyphenString),
  unknown(),
  coerceArray(alphaNumHyphenString as Struct<unknown, unknown>)
)

export const MetadataStruct = object({
  loginSearchParts: MetaLoginSearchPartsStruct,
})

export type MetaLoginSearchParts = Infer<typeof MetaLoginSearchPartsStruct>
export type Metadata = Infer<typeof MetadataStruct>
