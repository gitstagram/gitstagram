import { FetchResult } from '@apollo/client'
import {
  CreateFileCommitMutationVariables,
  CreateFileCommitMutation,
} from 'graphql/generated'
import { CREATE_FILE_COMMIT } from 'graphql/operations/mutations'
import { apolloClient } from 'graphql/apolloClient'

export const createFileCommitPromise = (
  variables: CreateFileCommitMutationVariables
): Promise<FetchResult<CreateFileCommitMutation>> => {
  return apolloClient.mutate<CreateFileCommitMutation>({
    mutation: CREATE_FILE_COMMIT,
    variables,
  })
}
