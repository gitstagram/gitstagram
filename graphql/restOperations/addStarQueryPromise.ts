import { gql, ApolloQueryResult } from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'

type AddStarQuery = {
  addStar: {
    raw: string
  }
}

type AddStarQueryVariables = {
  userLogin: string
}

const ADD_STAR = gql`
  query AddStar($userLogin: String!, $input: String!, $bodySerializer: any) {
    addStar(input: $input, userLogin: $userLogin)
      @rest(
        type: "RestAddStar"
        path: "/user/starred/{args.userLogin}/gitstagram-library"
        method: "PUT"
        bodySerializer: $bodySerializer
      ) {
      raw
    }
  }
`

export const addStarQueryPromise = (
  variables: AddStarQueryVariables
): Promise<ApolloQueryResult<AddStarQuery>> => {
  return apolloClient.query<AddStarQuery>({
    query: ADD_STAR,
    variables: {
      ...variables,
      input: '{}',
    },
  })
}
