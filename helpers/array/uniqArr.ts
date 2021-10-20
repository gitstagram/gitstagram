export const uniqArr = <T>(arr: T[]): T[] => {
  return [...new Set(arr)]
}
