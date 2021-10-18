import { useState, useEffect, useRef } from 'react'
import { async } from 'helpers'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArguments = any[]

type State<T> = {
  loadState: LoadingStates
  loading: boolean
  data?: T
  err?: unknown
}

type UseLoadAsyncOptions<T> = {
  dataDefault?: T
  skip?: boolean
  arguments?: AnyArguments
}

export const useLoadAsync = <T>(
  // Use function wrapper to lazily evaluate promise inside effect
  promiseFn: (...args: AnyArguments) => Promise<T>,
  options?: UseLoadAsyncOptions<T>
): State<T> => {
  const [state, setState] = useState<State<T>>({
    loadState: 'initiating',
    loading: true,
    data: options?.dataDefault,
  })

  const args = (options && options.arguments) || []

  // Hold lazy promise function in a ref to prevent infinite reload loops
  const functionToRun = useRef(promiseFn)

  useEffect(() => {
    const load = async () => {
      setState({ loadState: 'loading', loading: true })
      const { res, err } = await async(functionToRun.current(...args))

      if (err) {
        setState({
          loadState: 'errored',
          loading: false,
          err: err,
        })

        return
      }

      setState({
        loadState: 'complete',
        loading: false,
        data: res,
      })
    }

    if (!options || options.skip !== true) {
      void load()
    }
    // Reload effect if arguments to promise change
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, react-hooks/exhaustive-deps
  }, [functionToRun, ...args])

  return state
}
