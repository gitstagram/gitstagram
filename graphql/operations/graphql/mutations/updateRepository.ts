import { FetchResult } from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'
import {
  useUpdateRepositoryMutation as genUseUpdateRepositoryMutation,
  UpdateRepositoryMutation,
  UpdateRepositoryMutationVariables,
  UpdateRepositoryDocument,
} from 'graphql/generated'

type MutationTuple = ReturnType<typeof genUseUpdateRepositoryMutation>

export const useUpdateRepositoryMutation = (): MutationTuple => {
  const mutationTuple = genUseUpdateRepositoryMutation()
  return mutationTuple
}

export const updateRepositoryMutationPromise = (
  variables: UpdateRepositoryMutationVariables
): Promise<FetchResult<UpdateRepositoryMutation>> => {
  return apolloClient.mutate<
    UpdateRepositoryMutation,
    UpdateRepositoryMutationVariables
  >({
    mutation: UpdateRepositoryDocument,
    variables,
  })
}
