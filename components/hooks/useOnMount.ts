import { useEffect, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
export const useOnMount = (fn: Function): void => {
  const mounted = useRef(false)
  useEffect(() => {
    if (mounted.current === false) {
      mounted.current = true
      fn()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
