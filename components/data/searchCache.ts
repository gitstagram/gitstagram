import { makeVar, useReactiveVar } from '@apollo/client'
export const searchCacheVar = makeVar('')
export const useSearchCacheVar = (): string => {
  return useReactiveVar(searchCacheVar)
}
