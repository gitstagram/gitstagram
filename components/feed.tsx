import React from 'react'
import { useGetViewerGitstagramLibraryQuery } from 'graphql/generated'

export const Feed = (): JSX.Element => {
  const { data, loading } = useGetViewerGitstagramLibraryQuery()
  return loading ? <>Loading</> : <>Data: {JSON.stringify(data)}</>
}
