import { gql, FetchResult } from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'

type DeleteRepoMutation = never

type DeleteRepoMutationVariables = {
  userLogin: string
}

const DELETE_REPO = gql`
  query DeleteRepo($userLogin: String!) {
    deleteRepo(userLogin: $userLogin)
      @rest(
        type: "RestRepo"
        path: "/repos/{args.userLogin}/gitstagram-library"
        method: "DELETE"
      ) {
      NoResponse
    }
  }
`

export const deleteRepoMutationPromise = (
  variables: DeleteRepoMutationVariables
): Promise<FetchResult<DeleteRepoMutation>> => {
  return apolloClient.mutate<DeleteRepoMutation>({
    mutation: DELETE_REPO,
    variables,
  })
}
