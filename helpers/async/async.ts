import { nullish } from 'helpers'

type Success<T> = { res: T; err?: never }
type Failure = { res?: never; err: unknown }
type Result<T> = Success<T> | Failure

export async function async<T>(promise?: Promise<T>): Promise<Result<T>> {
  if (nullish(promise))
    return { res: undefined, err: new Error('Promise undefined') }

  try {
    const res = await promise
    return { res, err: undefined }
  } catch (err: unknown) {
    return { res: undefined, err }
  }
}
