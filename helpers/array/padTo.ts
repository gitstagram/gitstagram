import { times } from 'helpers/array/times'

export const padTo = <T>(
  arr: T[][],
  padToCount: number
): (T | undefined)[][] => {
  const paddedArr = arr.reduce((acc, item) => {
    if (item.length < padToCount) {
      const timesToPad = padToCount - item.length
      const timesArr = times(timesToPad)
      const paddedItem = [...item, ...timesArr]
      return [...acc, paddedItem]
    } else {
      return [...acc, item]
    }
  }, [] as (T | undefined)[][])
  return paddedArr
}
