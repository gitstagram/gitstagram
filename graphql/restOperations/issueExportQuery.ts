import { gql, ApolloQueryResult } from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'

type GetRestIssueExportQuery = {
  restIssues: {
    raw: string
  }
}

type GetRestIssueExportQueryVariables = {
  userLogin: string
  page: number
}

const GET_ISSUE_EXPORT = gql`
  query GetIssueExport($userLogin: String!, $page: Int!) {
    restIssues(userLogin: $userLogin, page: $page)
      @rest(
        type: "RestIssues"
        path: "/repos/{args.userLogin}/gitstagram-library/issues?state=all&per_page=100&page={args.page}"
      ) {
      raw
    }
  }
`

export const getIssueExportQueryPromise = (
  variables: GetRestIssueExportQueryVariables
): Promise<ApolloQueryResult<GetRestIssueExportQuery>> => {
  return apolloClient.query<GetRestIssueExportQuery>({
    query: GET_ISSUE_EXPORT,
    variables,
  })
}
