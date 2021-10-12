import { create, mask } from 'superstruct'
import * as structs from 'helpers/validation/structs/metadata'
import { isAnyRecord } from 'helpers/validation/isAnyRecord'

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
