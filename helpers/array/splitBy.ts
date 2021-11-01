import { times } from 'helpers/array/times'

export const splitBy = <T>(arr: T[], by: number): T[][] => {
  if (by === 0) throw new Error('splitBy cannot divide by 0')
  const length = arr.length
  const partsNumerator = length ? length : 1
  const partsCount = Math.ceil(partsNumerator / by)

  const splitArr = times(partsCount).reduce((acc, _, index) => {
    const currentIndex = index * by
    const sliceTo = currentIndex + by
    const slice = arr.slice(currentIndex, sliceTo)

    return [...acc, slice]
  }, [] as T[][])

  return splitArr
}
