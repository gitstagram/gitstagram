import {
  gql,
  useLazyQuery,
  LazyQueryHookOptions,
  QueryTuple,
  OperationVariables,
  ApolloQueryResult,
} from '@apollo/client'
import { apolloClient } from 'graphql/apolloClient'

const GET_RATE_LIMIT = gql`
  fragment FRAG_Rate_Limit_Resource on RestRateLimitResource {
    limit
    remaining
    reset
    used
  }

  query GetRateLimit {
    restRateLimit @rest(type: "RestRateLimit", path: "/rate_limit") {
      resources {
        core @type(name: "RestRateLimitResource") {
          ...FRAG_Rate_Limit_Resource
        }
        search @type(name: "RestRateLimitResource") {
          ...FRAG_Rate_Limit_Resource
        }
        graphql @type(name: "RestRateLimitResource") {
          ...FRAG_Rate_Limit_Resource
        }
      }
    }
  }
`

export type RestRateLimitResource = {
  __typename: 'RestRateLimitResource'
  limit: number
  used: number
  remaining: number
  reset: number
}

type GetRestRateLimitQuery = {
  restRateLimit: {
    __typename?: 'RestRateLimits'
    resources: {
      __typename?: 'RestRateLimitResources'
      core: RestRateLimitResource
      search: RestRateLimitResource
      graphql: RestRateLimitResource
    }
    rate: RestRateLimitResource
  }
}

export function useGetRateLimitLazyQuery(
  options?: LazyQueryHookOptions<GetRestRateLimitQuery>
): QueryTuple<GetRestRateLimitQuery, OperationVariables> {
  return useLazyQuery<GetRestRateLimitQuery>(GET_RATE_LIMIT, options)
}

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

type DeleteStarQuery = {
  deleteStar: {
    raw: string
  }
}

type DeleteStarQueryVariables = {
  userLogin: string
}

const DELETE_STAR = gql`
  query DeleteStar($userLogin: String!) {
    deleteStar(userLogin: $userLogin)
      @rest(
        type: "RestDeleteStar"
        path: "/user/starred/{args.userLogin}/gitstagram-library"
        method: "DELETE"
      ) {
      raw
    }
  }
`

export const deleteStarQueryPromise = (
  variables: DeleteStarQueryVariables
): Promise<ApolloQueryResult<DeleteStarQuery>> => {
  return apolloClient.query<DeleteStarQuery>({
    query: DELETE_STAR,
    variables,
  })
}

type DeleteRepoQuery = {
  deleteRepo: {
    raw: string
  }
}

type DeleteRepoQueryVariables = {
  userLogin: string
}

const DELETE_REPO = gql`
  query DeleteRepo($userLogin: String!) {
    deleteRepo(userLogin: $userLogin)
      @rest(
        type: "RestDeleteRepo"
        path: "/repos/{args.userLogin}/gitstagram-library"
        method: "DELETE"
      ) {
      raw
    }
  }
`

export const deleteRepoQueryPromise = (
  variables: DeleteRepoQueryVariables
): Promise<ApolloQueryResult<DeleteRepoQuery>> => {
  return apolloClient.query<DeleteRepoQuery>({
    query: DELETE_REPO,
    variables,
  })
}
