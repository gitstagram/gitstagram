import { object, coerce, unknown, array, string, is, Infer } from 'superstruct'

export const MetadataStruct = object({
  loginSearchParts: coerce(array(string()), unknown(), (value) => {
    return is(value, array(string())) ? value : []
  }),
})

export type Metadata = Infer<typeof MetadataStruct>
