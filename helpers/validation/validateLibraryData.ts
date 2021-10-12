import { create, mask, is } from 'superstruct'
import * as structs from 'helpers/validation/structs/libraryData'
import { isAnyRecord } from 'helpers/validation/isAnyRecord'

export const coerceLibFollowing = (anyValue: unknown): structs.LibFollowing => {
  const validLibFollowing = create(anyValue, structs.LibFollowingStruct)
  return validLibFollowing
}

export const coerceLibFollowingTags = (
  anyValue: unknown
): structs.LibFollowingTags => {
  const validLibFollowingTags = create(anyValue, structs.LibFollowingTagsStruct)
  return validLibFollowingTags
}

export const coerceLibSaved = (anyValue: unknown): structs.LibSaved => {
  const validSaved = create(anyValue, structs.LibSavedStruct)
  return validSaved
}

export const coerceLibraryData = (anyValue: unknown): structs.LibraryData => {
  // If value is not a record, make it an empty record
  const libraryDataRecord = isAnyRecord(anyValue) ? anyValue : {}

  // use mask to first ignore any extraneous keys
  // create value using struct coercion logic
  const validLibraryData = create(
    mask(libraryDataRecord, structs.LibraryDataStruct),
    structs.LibraryDataStruct
  )
  return validLibraryData
}

export const isLibraryData = (value: unknown): value is structs.LibraryData => {
  return is(value, structs.LibraryDataStruct)
}
