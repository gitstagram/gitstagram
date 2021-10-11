import { create, mask } from 'superstruct'
import { Metadata, MetadataStruct } from 'helpers/validation/structs/metadata'
import { isAnyRecord } from 'helpers/validation/isAnyRecord'

export const coerceMetadata = (anyValue: unknown): Metadata => {
  // If value is not a record, make it an empty record
  const metadataRecord = isAnyRecord(anyValue) ? anyValue : {}

  // use mask to first ignore any extraneous keys
  // create value using struct coercion logic
  const validMetadata = create(
    mask(metadataRecord, MetadataStruct),
    MetadataStruct
  )
  return validMetadata
}
