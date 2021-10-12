import { array, is, Struct, Coercer } from 'superstruct'

export const coerceArray = <T>(
  contentStruct: Struct,
  defaultArray: T[] = []
): Coercer<unknown> => {
  return (value: unknown) => {
    const isArray = is(value, array())
    const isContentArray = is(value, array(contentStruct))

    if (isContentArray) return value
    if (isArray && !isContentArray) {
      const val = value as unknown[]
      const filtered = val.filter((item) => is(item, contentStruct)) as T[]
      return filtered.length ? filtered : defaultArray
    }
    return defaultArray
  }
}
