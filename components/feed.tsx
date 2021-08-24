import React from 'react'
import { getApolloClient } from 'graphql/apolloClient'
import { gql } from '@apollo/client'

export const Feed = (): JSX.Element => {
  void getApolloClient()
    // .query({
    //   query: gql`
    //     {
    //       repository(name: "gitstagram", owner: "mongkuen") {
    //         id
    //       }
    //     }
    //   `,
    // })
    .query({
      query: gql`
        {
          repos @rest(path: "/user/repos") {
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
