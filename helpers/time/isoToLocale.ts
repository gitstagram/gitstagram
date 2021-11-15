export const isoToLocale = (isoString: string): string => {
  return new Date(Date.parse(isoString)).toLocaleString()
}
