import React from 'react'
import { useGetFeedQuery } from 'graphql/operations'

export const Feed = (): JSX.Element => {
  const { data, loading, error } = useGetFeedQuery()
  return (
    <>
      {loading && <>Loading</>}
      {error && <>Error</>}
      {data && <>{JSON.stringify(data)}</>}
    </>
  )
}
