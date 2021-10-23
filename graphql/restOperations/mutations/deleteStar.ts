import { gql, FetchResult } from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'

type DeleteStarMutation = {
  deleteStar: {
    raw: string
  }
}

type DeleteStarMutationVariables = {
  userLogin: string
}

const DELETE_STAR = gql`
  mutation DeleteStar($userLogin: String!) {
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

export const deleteStarMutationPromise = (
  variables: DeleteStarMutationVariables
): Promise<FetchResult<DeleteStarMutation>> => {
  return apolloClient.mutate<DeleteStarMutation, DeleteStarMutationVariables>({
    mutation: DELETE_STAR,
    variables,
  })
}
