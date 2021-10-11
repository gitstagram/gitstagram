import { record, unknown, string, Infer } from 'superstruct'

export const AnyRecordStruct = record(string(), unknown())

export type AnyRecord = Infer<typeof AnyRecordStruct>
