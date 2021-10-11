import { gql, ApolloQueryResult } from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'

type DeleteRepoQuery = {
  deleteRepo: {
    raw: string
  }
}

type DeleteRepoQueryVariables = {
  userLogin: string
}

const DELETE_REPO = gql`
  query DeleteRepo($userLogin: String!) {
    deleteRepo(userLogin: $userLogin)
      @rest(
        type: "RestDeleteRepo"
        path: "/repos/{args.userLogin}/gitstagram-library"
        method: "DELETE"
      ) {
      raw
    }
  }
`

export const deleteRepoQueryPromise = (
  variables: DeleteRepoQueryVariables
): Promise<ApolloQueryResult<DeleteRepoQuery>> => {
  return apolloClient.query<DeleteRepoQuery>({
    query: DELETE_REPO,
    variables,
  })
}
