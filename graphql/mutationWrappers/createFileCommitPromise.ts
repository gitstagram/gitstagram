import { FetchResult } from '@apollo/client'
import {
  CreateFileCommitMutationVariables,
  CreateFileCommitMutation,
  Cache_ViewerInfoDocument,
  Cache_ViewerInfoQuery,
  CreateFileCommitDocument,
} from 'graphql/generated'
import { apolloClient } from 'graphql/apolloClient'
import { captureException } from 'helpers'

type CreateFileCommitPromiseVariables = Omit<
  CreateFileCommitMutationVariables,
  'repoWithLogin' | 'headOid' | 'login'
>

export const createFileCommitPromise = (
  variables: CreateFileCommitPromiseVariables
): Promise<FetchResult<CreateFileCommitMutation>> => {
  const cacheViewer = apolloClient.readQuery<Cache_ViewerInfoQuery>({
    query: Cache_ViewerInfoDocument,
  })
  const currentOid = cacheViewer?.viewerInfo?.currentOid
  const login = cacheViewer?.viewerInfo?.login

  if (!currentOid) {
    captureException({
      inside: 'createFileCommitPromise',
      msgs: ['Cannot read commit oId'],
    })
    return Promise.reject()
  }

  const mutationVariables = {
    ...variables,
    headOid: currentOid,
    repoWithLogin: `${login}/gitstagram-library`,
  }

  return apolloClient.mutate<
    CreateFileCommitMutation,
    CreateFileCommitMutationVariables
  >({
    mutation: CreateFileCommitDocument,
    variables: mutationVariables,
    update: (cache, { data }) => {
      const newOid = data?.createCommitOnBranch?.commit?.oid as string
      const cacheViewer = cache.readQuery<Cache_ViewerInfoQuery>({
        query: Cache_ViewerInfoDocument,
      })
      const viewerInfo = cacheViewer?.viewerInfo

      if (!newOid) {
        captureException({
          inside: 'createFileCommitPromise:mutateCallback',
          msgs: ['Commit did not return an oId'],
        })
        throw new Error('Commit did not return oId')
      }

      if (newOid && viewerInfo) {
        const newData = {
          viewerInfo: {
            ...viewerInfo,
            currentOid: newOid,
          },
        }
        cache.writeQuery<Cache_ViewerInfoQuery>({
          query: Cache_ViewerInfoDocument,
          data: newData,
        })
      }
    },
  })
}
