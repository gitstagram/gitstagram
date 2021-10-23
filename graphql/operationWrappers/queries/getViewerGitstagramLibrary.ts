import { ApolloQueryResult, QueryOptions } from '@apollo/client'
import {
  GetViewerGitstagramLibraryDocument,
  GetViewerGitstagramLibraryQueryVariables,
  GetViewerGitstagramLibraryQuery,
} from 'graphql/generated'
import { apolloClient } from 'graphql/apolloClient'

type GetViewerGitstagramLibraryQueryPromiseOptions = Omit<
  QueryOptions<GetViewerGitstagramLibraryQueryVariables>,
  'query'
>

export type GetViewerGitstagramLibraryQueryPromise =
  ApolloQueryResult<GetViewerGitstagramLibraryQuery>

export const getViewerGitstagramLibraryQueryPromise = (
  options: GetViewerGitstagramLibraryQueryPromiseOptions
): Promise<GetViewerGitstagramLibraryQueryPromise> => {
  return apolloClient.query<GetViewerGitstagramLibraryQuery>({
    ...options,
    query: GetViewerGitstagramLibraryDocument,
  })
}
