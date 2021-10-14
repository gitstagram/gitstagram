import { FetchResult } from '@apollo/client'
import {
  CreateFileCommitMutationVariables,
  CreateFileCommitMutation,
  GetViewerGitstagramLibraryQuery,
} from 'graphql/generated'
import { CREATE_FILE_COMMIT } from 'graphql/operations/mutations'
import { GET_VIEWER_GITSTAGRAM_LIBRARY } from 'graphql/operations/queries'
import { apolloClient } from 'graphql/apolloClient'
import { deepMerge } from 'helpers'

export const createFileCommitPromise = (
  variables: CreateFileCommitMutationVariables
): Promise<FetchResult<CreateFileCommitMutation>> => {
  return apolloClient.mutate<CreateFileCommitMutation>({
    mutation: CREATE_FILE_COMMIT,
    variables,
    update: (cache, { data }) => {
      const newOid = data?.createCommitOnBranch?.commit?.oid as string
      const existingViewer = cache.readQuery<GetViewerGitstagramLibraryQuery>({
        query: GET_VIEWER_GITSTAGRAM_LIBRARY,
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
