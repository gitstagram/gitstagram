import React, { useState, createContext, useContext } from 'react'

type LoadingStates =
  | 'initiating'
  | 'libFound'
  | 'libGetFailure'
  | 'libCreateFailure'

type LoadingContext = {
  loadingState: LoadingStates
  setLoadingState?: React.Dispatch<React.SetStateAction<LoadingStates>>
}

export const LoadingContext = createContext<LoadingContext>({
  loadingState: 'initiating',
})

export const LoadingContextProvider = ({
  children,
}: BaseProps): JSX.Element => {
  const [loadingState, setLoadingState] = useState<LoadingStates>('initiating')

  return (
    <LoadingContext.Provider
      value={{
        loadingState,
        setLoadingState,
      }}
    >
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoadingContext = (): Required<LoadingContext> => {
  const loadingContext = useContext(LoadingContext)
  if (!loadingContext.setLoadingState)
    throw new Error('Cannot set loading state')
  return loadingContext as Required<LoadingContext>
}
