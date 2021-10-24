import { gql, ApolloQueryResult } from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'

export type LibraryDataQuery = {
  getLibraryData: {
    content: string
    sha: string
  }
}

export type LibraryDataQueryVariables = {
  userLogin: string
}

const GET_LIBRARY_DATA = gql`
  query GetLibraryData($userLogin: String!) {
    getLibraryData(userLogin: $userLogin)
      @rest(
        type: "GetLibraryData"
        path: "/repos/{args.userLogin}/gitstagram-library/contents/gitstagram-data.json"
      ) {
      content
      sha
    }
  }
`

export const getLibraryDataQueryPromise = (
  variables: LibraryDataQueryVariables
): Promise<ApolloQueryResult<LibraryDataQuery>> => {
  return apolloClient.query<LibraryDataQuery>({
    query: GET_LIBRARY_DATA,
    variables: {
      ...variables,
    },
  })
}
