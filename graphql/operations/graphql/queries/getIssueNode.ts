import { ApolloQueryResult, QueryOptions } from '@apollo/client'
import {
  GetIssueNodeDocument,
  GetIssueNodeQueryVariables,
  GetIssueNodeQuery,
} from 'graphql/generated'
import { apolloClient } from 'graphql/apolloClient'

type GetIssueNodeQueryPromiseOptions = Omit<
  QueryOptions<GetIssueNodeQueryVariables>,
  'query'
>

type GetIssueNodeQueryPromise = ApolloQueryResult<GetIssueNodeQuery>

export const getIssueNodeQueryPromise = (
  options: GetIssueNodeQueryPromiseOptions
): Promise<GetIssueNodeQueryPromise> => {
  return apolloClient.query<GetIssueNodeQuery>({
    ...options,
    query: GetIssueNodeDocument,
  })
}
