import { gql, FetchResult } from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'
import { updateRepositoryMutationPromise } from 'graphql/operations'
import {
  Cache_UserInfo_ViewerPropsQuery,
  Cache_UserInfo_ViewerPropsDocument,
} from 'graphql/generated'
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

interface UpdateUserMutation extends UpdateUserVariablesInput {
  login: string
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

export const updateUserMutationPromise = async (
  input: UpdateUserVariablesInput
): Promise<FetchResult<UpdateUserMutation>> => {
  const cachedViewer = apolloClient.readQuery<Cache_UserInfo_ViewerPropsQuery>({
    query: Cache_UserInfo_ViewerPropsDocument,
  })
  const viewer = cachedViewer?.viewer

  if (viewer && input.name) {
    const { login, name, libraryRepoId } = viewer

    if (libraryRepoId && name !== input.name) {
      const descriptionMetadata = getMetadataJson(login, input.name)
      const { err } = await async(
        updateRepositoryMutationPromise({
          repositoryId: libraryRepoId,
          description: descriptionMetadata,
        })
      )
      if (err) return Promise.reject(err)
    }
  }

  return apolloClient.mutate<UpdateUserMutation, UpdateUserVariables>({
    mutation: UPDATE_USER,
    variables: {
      input,
    },
  })
}
