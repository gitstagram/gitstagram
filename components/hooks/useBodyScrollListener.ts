// Monkey forking https://github.com/karl-run/react-bottom-scroll-listener/blob/master/src/hook/index.tsx
import { useCallback, useEffect, useMemo } from 'react'
import { debounce } from 'helpers'

const createCallback = (
  debounceTime: number,
  handleOnScroll: () => void
): (() => void) => {
  if (debounceTime) {
    return debounce(handleOnScroll, debounceTime)
  } else {
    return handleOnScroll
  }
}

export function useBodyScrollListener(
  onBottom: () => void,
  options?: {
    offset?: number
    debounce?: number
    triggerOnNoScroll?: boolean
  }
): void {
  const { offset, triggerOnNoScroll, debounce } = useMemo(
    () => ({
      offset: options?.offset ?? 0,
      debounce: options?.debounce ?? 200,
      triggerOnNoScroll: options?.triggerOnNoScroll ?? false,
    }),
    [options?.offset, options?.debounce, options?.triggerOnNoScroll]
  )

  const debouncedOnBottom = useMemo(
    () => createCallback(debounce, onBottom),
    [debounce, onBottom]
  )
  const handleOnScroll = useCallback(() => {
    const body = document.getElementsByTagName('body')[0]
    const scrollContainerBottomPosition = Math.round(
      body.scrollTop + body.offsetHeight
    )
    const scrollPosition = Math.round(body.scrollHeight - offset)
    if (scrollPosition <= scrollContainerBottomPosition) debouncedOnBottom()
  }, [offset, debouncedOnBottom])

  useEffect((): (() => void) => {
    if (triggerOnNoScroll) handleOnScroll()

    const body = document.getElementsByTagName('body')[0]
    body.addEventListener('scroll', handleOnScroll)
    return () => body.removeEventListener('scroll', handleOnScroll)
  }, [handleOnScroll, triggerOnNoScroll])
}
