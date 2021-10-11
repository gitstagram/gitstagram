// ('foobar', 3) => ['foo', 'foob', 'fooba', 'foobar']
export const stringCombinatorials = (str: string, from = 1): string[] => {
  const validFrom = from <= str.length ? from : str.length
  const sliceFrom = validFrom > 0 ? validFrom : 1

  const initialChars = str.slice(0, sliceFrom)
  const remainingChars = str.slice(sliceFrom, str.length).split('')
  const combinatorials = remainingChars.reduce(
    (acc, char) => {
      const lastItem = acc[acc.length - 1]
      const nextItem = `${lastItem}${char}`
      return [...acc, nextItem]
    },
    [initialChars]
  )
  return combinatorials
}
