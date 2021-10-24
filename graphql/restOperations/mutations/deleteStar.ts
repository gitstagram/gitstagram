import { gql, FetchResult } from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'

type DeleteStarMutation = never

type DeleteStarMutationVariables = {
  userLogin: string
}

const DELETE_STAR = gql`
  mutation DeleteStar($userLogin: String!) {
    deleteStar(userLogin: $userLogin)
      @rest(
        type: "RestStar"
        path: "/user/starred/{args.userLogin}/gitstagram-library"
        method: "DELETE"
      ) {
      NoResponse
    }
  }
`

export const deleteStarMutationPromise = (
  variables: DeleteStarMutationVariables
): Promise<FetchResult<DeleteStarMutation>> => {
  return apolloClient.mutate<DeleteStarMutation, DeleteStarMutationVariables>({
    mutation: DELETE_STAR,
    variables,
  })
}
