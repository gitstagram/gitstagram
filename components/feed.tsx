import React from 'react'
import { useGetRepoQuery } from 'graphql/generated'

export const Feed = (): JSX.Element => {
  const { loading, error, data } = useGetRepoQuery()
  if (loading) return <>Loading</>
  if (error) return <>Error</>
  return <>{JSON.stringify(data)}</>
}
