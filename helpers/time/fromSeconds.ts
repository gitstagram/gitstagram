type FromSecondsArgs = {
  seconds: number
  to: 'minutes' | 'hours'
  round?: number
}

export const fromSeconds = ({
  seconds,
  to,
  round,
}: FromSecondsArgs): number => {
  const toUnit =
    to === 'minutes'
      ? seconds / 60
      : to === 'hours'
      ? seconds / 3600
      : undefined

  if (!toUnit) throw new Error('Unexpected seconds conversion')
  if (round === undefined) return toUnit

  return round === 0
    ? parseInt(toUnit.toFixed(0))
    : parseFloat(toUnit.toFixed(round))
}
