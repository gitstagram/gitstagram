export const promiseReduce = <T>(
  promises: Promise<T>[]
): Promise<unknown[]> => {
  return promises.reduce(async (accPromise, currentPromise) => {
    const accResults = await accPromise
    const currentResult = await currentPromise
    return [...accResults, currentResult]
  }, Promise.resolve([]) as Promise<unknown[]>)
}
