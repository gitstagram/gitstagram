import { gql, FetchResult } from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'

type AddStarMutation = never

type AddStarMutationVariables = {
  userLogin: string
  input?: string
}

const ADD_STAR = gql`
  mutation AddStar($userLogin: String!, $input: String!) {
    addStar(input: $input, userLogin: $userLogin)
      @rest(
        type: "RestStar"
        path: "/user/starred/{args.userLogin}/gitstagram-library"
        method: "PUT"
      ) {
      NoResponse
    }
  }
`

export const addStarMutationPromise = (
  variables: AddStarMutationVariables
): Promise<FetchResult<AddStarMutation>> => {
  return apolloClient.mutate<AddStarMutation, AddStarMutationVariables>({
    mutation: ADD_STAR,
    variables: {
      ...variables,
      input: '{}',
    },
  })
}
