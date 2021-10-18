import { nullish } from 'helpers/type/nullish'

export const toReadableNum = (num?: number | string): string => {
  if (nullish(num)) return ''
  const int = parseInt(`${num}`)

  if (int >= 1000000) {
    const millions = int / 1000000
    const millionsDecimal = millions.toFixed(2)
    return `${millionsDecimal}m`
  } else if (int >= 100000) {
    const thousands = int / 1000
    const thousandsInt = parseInt(`${thousands}`)
    return `${thousandsInt}k`
  } else if (int > 1000) {
    const chars = `${int}`.split('')
    const toSplitAt = chars.length - 3
    const first = chars.slice(0, toSplitAt)
    const last = chars.slice(toSplitAt)
    return [...first, ',', ...last].join('')
  } else {
    return `${int}`
  }
}
