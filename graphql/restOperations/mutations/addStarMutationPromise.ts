import { gql, FetchResult } from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'

type AddStarMutation = {
  addStar: {
    raw: string
  }
}

type AddStarMutationVariables = {
  userLogin: string
  input?: string
}

const ADD_STAR_MUTATION = gql`
  mutation AddStar($userLogin: String!, $input: String!) {
    addStar(input: $input, userLogin: $userLogin)
      @rest(
        type: "RestAddStar"
        path: "/user/starred/{args.userLogin}/gitstagram-library"
        method: "PUT"
      ) {
      raw
    }
  }
`

export const addStarMutationPromise = (
  variables: AddStarMutationVariables
): Promise<FetchResult<AddStarMutation>> => {
  return apolloClient.mutate<AddStarMutation, AddStarMutationVariables>({
    mutation: ADD_STAR_MUTATION,
    variables: {
      ...variables,
      input: '{}',
    },
  })
}
