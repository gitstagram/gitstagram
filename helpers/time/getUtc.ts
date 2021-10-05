export const getUtc = (ms?: boolean): number => {
  return ms
    ? new Date().getTime()
    : parseInt(`${new Date().getTime()}`.slice(0, 10), 10)
}
