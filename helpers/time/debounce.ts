/* eslint-disable @typescript-eslint/ban-types, prefer-rest-params */
export function debounce<T extends Function>(func: T, delay = 250): () => void {
  let timeout: NodeJS.Timeout | null

  return function () {
    const args = arguments

    // 1. Wrapped function to call
    const toCall = function () {
      timeout = null
      // 4. call args with cached arguments
      func(...args)
    }

    // 3. however if this function is called then clear the set timeout
    if (timeout) clearTimeout(timeout)

    // 2. That will call after a delay
    timeout = setTimeout(toCall, delay)
  }
}
