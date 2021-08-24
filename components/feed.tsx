import React from 'react'
import { gql } from '@apollo/client'
import { getApolloClient } from 'graphql/apolloClient'

export const Feed = (): JSX.Element => {
  void getApolloClient()
    .query({
      query: gql`
        {
          repository(name: "gitstagram", owner: "mongkuen") {
            id
          }
        }
      `,
    })
    .then((result) => {
      return result
    })
  return <>Feed</>
}
