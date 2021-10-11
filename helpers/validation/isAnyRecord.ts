import { is } from 'superstruct'
import {
  AnyRecord,
  AnyRecordStruct,
} from 'helpers/validation/structs/anyRecord'

export const isAnyRecord = (value: unknown): value is AnyRecord => {
  return is(value, AnyRecordStruct)
}
