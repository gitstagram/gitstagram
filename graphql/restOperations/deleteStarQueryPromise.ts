import { gql, ApolloQueryResult } from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'

type DeleteStarQuery = {
  deleteStar: {
    raw: string
  }
}

type DeleteStarQueryVariables = {
  userLogin: string
}

const DELETE_STAR = gql`
  query DeleteStar($userLogin: String!) {
    deleteStar(userLogin: $userLogin)
      @rest(
        type: "RestDeleteStar"
        path: "/user/starred/{args.userLogin}/gitstagram-library"
        method: "DELETE"
      ) {
      raw
    }
  }
`

export const deleteStarQueryPromise = (
  variables: DeleteStarQueryVariables
): Promise<ApolloQueryResult<DeleteStarQuery>> => {
  return apolloClient.query<DeleteStarQuery>({
    query: DELETE_STAR,
    variables,
  })
}
