import { FetchResult } from '@apollo/client'
import {
  CreateFileCommitMutationVariables,
  CreateFileCommitMutation,
  GetViewerGitstagramLibraryQuery,
  GetViewerGitstagramLibraryQueryVariables,
} from 'graphql/generated'
import { CREATE_FILE_COMMIT } from 'graphql/operations/mutations'
import { GET_VIEWER_GITSTAGRAM_LIBRARY } from 'graphql/operations/queries'
import { apolloClient } from 'graphql/apolloClient'
import { deepMerge } from 'helpers'
import type { Merge } from 'type-fest'

type ScalarString = CreateFileCommitMutationVariables['repoWithLogin']
type CreateFileCommitPromiseVariables = Merge<
  Omit<CreateFileCommitMutationVariables, 'repoWithLogin'>,
  { login: ScalarString }
>

export const createFileCommitPromise = (
  variables: CreateFileCommitPromiseVariables
): Promise<FetchResult<CreateFileCommitMutation>> => {
  const { login, ...restVariables } = variables
  const mutationVariables = {
    ...restVariables,
    repoWithLogin: `${login}/gitstagram-library`,
  }

  return apolloClient.mutate<
    CreateFileCommitMutation,
    CreateFileCommitMutationVariables
  >({
    mutation: CREATE_FILE_COMMIT,
    variables: mutationVariables,
    update: (cache, { data }) => {
      const newOid = data?.createCommitOnBranch?.commit?.oid as string
      const existingViewer = cache.readQuery<
        GetViewerGitstagramLibraryQuery,
        GetViewerGitstagramLibraryQueryVariables
      >({
        query: GET_VIEWER_GITSTAGRAM_LIBRARY,
        variables: {
          userLogin: login,
        },
      })

      if (
        existingViewer?.viewer?.repository?.defaultBranchRef?.target?.oid &&
        newOid
      ) {
        const newData = deepMerge<GetViewerGitstagramLibraryQuery>(
          {},
          existingViewer,
          {
            viewer: {
              repository: { defaultBranchRef: { target: { oid: newOid } } },
            },
          }
        )

        cache.writeQuery({
          query: GET_VIEWER_GITSTAGRAM_LIBRARY,
          data: newData,
        })
      }
    },
  })
}
