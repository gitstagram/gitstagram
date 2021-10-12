import { gql, ApolloQueryResult } from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'

type GetIssueExportQuery = {
  issueExport: {
    raw: string
  }
}

type GetIssueExportQueryVariables = {
  userLogin: string
  page: number
}

const GET_ISSUE_EXPORT = gql`
  query GetIssueExport($userLogin: String!, $page: Int!) {
    issueExport(userLogin: $userLogin, page: $page)
      @rest(
        type: "RestIssues"
        path: "/repos/{args.userLogin}/gitstagram-library/issues?state=all&per_page=100&page={args.page}"
      ) {
      raw
    }
  }
`

export const getIssueExportQueryPromise = (
  variables: GetIssueExportQueryVariables
): Promise<ApolloQueryResult<GetIssueExportQuery>> => {
  return apolloClient.query<GetIssueExportQuery>({
    query: GET_ISSUE_EXPORT,
    variables,
  })
}
