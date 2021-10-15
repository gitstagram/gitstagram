export const getURIQueryString = (string: string): string => {
  return `q=${encodeURIComponent(string)}`
}
