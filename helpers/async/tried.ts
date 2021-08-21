type Success<T> = [T, null]
type Failure = [null, Error]
type Try<T> = Success<T> | Failure

export async function tried<T>(promise: Promise<T>): Promise<Try<T>> {
  try {
    const data = await promise
    return [data, null]
  } catch (error) {
    return [null, error]
  }
}
