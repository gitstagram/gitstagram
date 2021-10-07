export const percentToHex = (percent: number): string => {
  const scaleTarget = (255 * percent) / 100
  const int = parseInt(`${scaleTarget}`, 10)
  const hex = int.toString(16)
  return hex
}
