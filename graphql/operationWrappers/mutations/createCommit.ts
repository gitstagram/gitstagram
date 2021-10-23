import { FetchResult } from '@apollo/client'
import {
  Cache_ViewerInfoDocument,
  Cache_ViewerInfoQuery,
  CreateCommitMutationVariables,
  CreateCommitMutation,
  CreateCommitDocument,
} from 'graphql/generated'
import { apolloClient } from 'graphql/apolloClient'
import { captureException } from 'helpers'

type CreateCommitMutationPromiseVariables = Omit<
  CreateCommitMutationVariables,
  'repoWithLogin' | 'headOid' | 'login'
>

export const createCommitMutationPromise = (
  variables: CreateCommitMutationPromiseVariables
): Promise<FetchResult<CreateCommitMutation>> => {
  const cacheViewer = apolloClient.readQuery<Cache_ViewerInfoQuery>({
    query: Cache_ViewerInfoDocument,
  })
  const currentOid = cacheViewer?.viewerInfo?.currentOid
  const login = cacheViewer?.viewerInfo?.login

  if (!currentOid) {
    captureException({
      inside: 'createCommitMutationPromise',
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
    CreateCommitMutation,
    CreateCommitMutationVariables
  >({
    mutation: CreateCommitDocument,
    variables: mutationVariables,
    update: (cache, { data }) => {
      const newOid = data?.createCommitOnBranch?.commit?.oid as string
      const cacheViewer = cache.readQuery<Cache_ViewerInfoQuery>({
        query: Cache_ViewerInfoDocument,
      })
      const viewerInfo = cacheViewer?.viewerInfo

      if (!newOid) {
        captureException({
          inside: 'createCommitMutationPromise:mutateCallback',
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
