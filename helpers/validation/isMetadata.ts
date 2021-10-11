import { is } from 'superstruct'
import { MetadataStruct, Metadata } from 'helpers/validation/structs/metadata'

export const isMetadata = (value: unknown): value is Metadata => {
  return is(value, MetadataStruct)
}
