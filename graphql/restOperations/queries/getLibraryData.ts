import { gql, ApolloQueryResult } from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'

type LibraryDataQuery = {
  getLibraryData: {
    content: string
  }
}

type LibraryDataQueryVariables = {
  userLogin: string
}

const GET_LIBRARY_DATA = gql`
  query GetLibraryData($userLogin: String!) {
    getLibraryData(userLogin: $userLogin)
      @rest(
        type: "RestLibraryData"
        path: "/repos/{args.userLogin}/gitstagram-library/contents/gitstagram-data.json"
      ) {
      content
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
