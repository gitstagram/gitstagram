import { getUtc } from 'helpers/time/getUtc'
import { pluralize } from 'helpers/string/pluralize'

const minutes = 60
const hours = 60 * minutes
const days = 24 * hours
const weeks = 7 * days
const months = 4 * weeks
const years = 12 * months

export const timeAgo = (isoTimestamp: string): string => {
  const parsed = Date.parse(isoTimestamp)
  const utcTimestamp = parseInt(
    `${parsed}`.slice(0, `${parsed}`.length - 3),
    10
  )
  const currentUtc = getUtc()
  const secondsDifference = currentUtc - utcTimestamp

  if (secondsDifference > years) {
    const number = Math.round(secondsDifference / years)
    return `${number} ${pluralize({ word: 'year', number })} ago`
  } else if (secondsDifference > months) {
    const number = Math.round(secondsDifference / months)
    return `${number} ${pluralize({ word: 'month', number })} ago`
  } else if (secondsDifference > weeks) {
    const number = Math.round(secondsDifference / weeks)
    return `${number} ${pluralize({ word: 'week', number })} ago`
  } else if (secondsDifference > days) {
    const number = Math.round(secondsDifference / days)
    return `${number} ${pluralize({ word: 'day', number })} ago`
  } else if (secondsDifference > hours) {
    const number = Math.round(secondsDifference / hours)
    return `${number} ${pluralize({ word: 'hour', number })} ago`
  } else if (secondsDifference > minutes) {
    const number = Math.round(secondsDifference / minutes)
    return `${number} ${pluralize({ word: 'minute', number })} ago`
  } else {
    return `Just now`
  }
}
