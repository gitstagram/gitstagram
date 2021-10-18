import { nullish } from 'helpers/type/nullish'

type PluralizeArgs = {
  word: string
  number?: number
}

export const pluralize = ({ word, number }: PluralizeArgs): string => {
  if (nullish(number)) return word

  const lastChar = word.slice(-1).toLowerCase()
  const lastTwoChars = word.slice(-2).toLowerCase()

  if (number !== 1) {
    if (['ss', 'ch', 'sh'].includes(lastTwoChars) || ['x'].includes(lastChar)) {
      // dress => dresses
      // bench => benches
      // dish => dishes
      // fox => foxes
      return `${word}es`
    } else if (['ay', 'ey', 'iy', 'oy', 'uy'].includes(lastTwoChars)) {
      // day => days
      // hey => heys
      // boy => boys
      // guy => guys
      return `${word}s`
    } else if (lastChar === 'y') {
      // puppy => puppies
      return `${word.slice(0, word.length - 1)}ies`
    } else if (
      lastChar === 'o' &&
      !['ao', 'eo', 'io', 'oo', 'uo'].includes(lastTwoChars)
    ) {
      // hero => heroes
      // veto => vetoes
      return `${word}es`
    } else if (lastChar === 'f' || lastTwoChars === 'fe') {
      return lastChar === 'f'
        ? // loaf => loaves
          `${word.slice(0, word.length - 1)}ves`
        : // knife => knives
          `${word.slice(0, word.length - 2)}ves`
    } else {
      return `${word}s`
    }
  } else {
    return word
  }
}
