import { create, mask, is } from 'superstruct'
import * as structs from 'helpers/validation/structs/metadata'
import { isAnyRecord } from 'helpers/validation/isAnyRecord'
import { stringCombinatorials } from 'helpers/string/stringCombinatorials'

export const coerceMetaLoginSearchParts = (
  anyValue: unknown
): structs.MetaLoginSearchParts => {
  const validMetaLoginSearchParts = create(
    anyValue,
    structs.MetaLoginSearchPartsStruct
  )
  return validMetaLoginSearchParts
}

export const coerceMetadata = (anyValue: unknown): structs.Metadata => {
  // If value is not a record, make it an empty record
  const metadataRecord = isAnyRecord(anyValue) ? anyValue : {}

  // use mask to first ignore any extraneous keys
  // create value using struct coercion logic
  const validMetadata = create(
    mask(metadataRecord, structs.MetadataStruct),
    structs.MetadataStruct
  )
  return validMetadata
}

export const isMetadata = (value: unknown): value is structs.Metadata => {
  return is(value, structs.MetadataStruct)
}

/*
 * Metadata is stored in `gitstagram-library` repository description
 *   - Description field characters max out at 65536
 *   - Provides additional data to help with gitstagram discoverability, etc
 */
export const getMetadataJson = (login: string, name: Maybe<string>): string => {
  /*
   * Breaks up login name into constituent parts
   *   - "foobar" => "foo", "foob", "fooba", "foobar"
   *   - It is usually not possible to search a partial login name for a repo
   *   - This allows Github to find `gitstagram-library`'s with login name partials
   */
  const loginParts = stringCombinatorials(login, 3)
  const nameSearchWords = name ? name.split(' ') : []
  const nameSearchParts = nameSearchWords.reduce((acc, word) => {
    const wordParts = stringCombinatorials(word, 3)
    return [...acc, ...wordParts]
  }, [] as string[])
  const loginSearchParts = [...loginParts, ...nameSearchParts]
  const metadata = coerceMetadata({ loginSearchParts })
  const jsonStr = JSON.stringify(metadata)
  return jsonStr
}
