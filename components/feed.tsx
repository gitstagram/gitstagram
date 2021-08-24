import React from 'react'
import { useQuery, gql } from '@apollo/client'

const GET_REPO = gql`
  query GetRepo {
    repository(name: "gitstagram", owner: "mongkuen") {
      id
    }
  }
`

export const Feed = (): JSX.Element => {
  const { loading, error, data } = useQuery<unknown>(GET_REPO)
  if (loading) return <>Loading</>
  if (error) return <>Error</>
  return <>{JSON.stringify(data)}</>
}
