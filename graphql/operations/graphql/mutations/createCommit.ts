import { FetchResult } from '@apollo/client'
import {
  CreateCommitMutationVariables,
  CreateCommitMutation,
  CreateCommitDocument,
  Cache_UserInfo_ViewerPropsQuery,
  Cache_UserInfo_ViewerPropsDocument,
  Cache_UserInfo_LiftedPropsFragmentDoc,
  Cache_UserInfo_LiftedPropsFragment,
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
  const cacheViewer = apolloClient.readQuery<Cache_UserInfo_ViewerPropsQuery>({
    query: Cache_UserInfo_ViewerPropsDocument,
  })
  const currentOid = cacheViewer?.viewer?.currentOid
  const login = cacheViewer?.viewer?.login

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
    update: (_, { data }) => {
      const newOid = data?.createCommitOnBranch?.commit?.oid as string
      if (!newOid) {
        captureException({
          inside: 'createCommitMutationPromise:mutateCallback',
          msgs: ['Commit did not return an oId'],
        })
        throw new Error('Commit did not return oId')
      }
      apolloClient.writeFragment<Cache_UserInfo_LiftedPropsFragment>({
        id: apolloClient.cache.identify({
          __typename: 'User',
          login,
        }),
        fragment: Cache_UserInfo_LiftedPropsFragmentDoc,
        data: {
          currentOid: newOid,
        },
      })
    },
  })
}
