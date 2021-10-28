import { gql, FetchResult } from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'

type UpdateUser = {
  login: string
  name: Maybe<string>
  location: Maybe<string>
  twitterUsername: Maybe<string>
  bio: Maybe<string>
}

type UpdateUserPromiseInput = {
  name: Maybe<string>
  location: Maybe<string>
  twitterUsername: Maybe<string>
  bio: Maybe<string>
}

type UpdateUserVariables = {
  input: UpdateUserPromiseInput
}

const UPDATE_USER = gql`
  mutation UpdateUser($input: String!) {
    updateUser(input: $input)
      @rest(type: "User", path: "/user", method: "PATCH") {
      login
      name
      location
      twitterUsername
      bio
    }
  }
`

export const updateUserPromise = (
  input: UpdateUserPromiseInput
): Promise<FetchResult<UpdateUser>> => {
  return apolloClient.mutate<UpdateUser, UpdateUserVariables>({
    mutation: UPDATE_USER,
    variables: {
      input,
    },
  })
}
