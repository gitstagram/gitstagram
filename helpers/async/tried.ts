import { nullish } from 'helpers'

type Success<T> = [T, null]
type Failure = [null, Error]
type Try<T> = Success<T> | Failure

export async function tried<T>(
  promise: Promise<T> | undefined
): Promise<Try<T>> {
  if (nullish(promise)) return [null, new Error('Promise undefined')]

  try {
    const data = await promise
    return [data, null]
  } catch (error) {
    return [null, error]
  }
}
