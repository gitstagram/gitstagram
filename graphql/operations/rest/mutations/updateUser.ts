import { gql, FetchResult } from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'
import { updateRepositoryMutationPromise } from 'graphql/operations'
import { getMetadataJson, async } from 'helpers'

type UpdateUserVariablesInput = {
  name: Maybe<string>
  location: Maybe<string>
  twitterUsername: Maybe<string>
  bio: Maybe<string>
}

type UpdateUserVariables = {
  input: UpdateUserVariablesInput
}

interface UpdateUserMutationReturn extends UpdateUserVariablesInput {
  login: string
}

interface UpdateUserPromiseArgs extends UpdateUserMutationReturn {
  libraryRepoId: string
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

export const updateUserPromise = async (
  input: UpdateUserPromiseArgs
): Promise<FetchResult<UpdateUserMutationReturn>> => {
  const { login, libraryRepoId, ...restInput } = input
  if (input.name) {
    const descriptionMetadata = getMetadataJson(login, input.name)
    const { err } = await async(
      updateRepositoryMutationPromise({
        repositoryId: libraryRepoId,
        description: descriptionMetadata,
      })
    )
    if (err) return Promise.reject(err)
  }
  return apolloClient.mutate<UpdateUserMutationReturn, UpdateUserVariables>({
    mutation: UPDATE_USER,
    variables: {
      input: restInput,
    },
  })
}
