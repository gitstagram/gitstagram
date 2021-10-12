import {
  gql,
  useLazyQuery,
  LazyQueryHookOptions,
  QueryTuple,
  OperationVariables,
} from '@apollo/client'

const GET_RATE_LIMIT = gql`
  fragment FRAG_Rate_Limit_Resource on RestRateLimitResource {
    limit
    remaining
    reset
    used
  }

  query GetRateLimit {
    getRateLimit @rest(type: "RestRateLimit", path: "/rate_limit") {
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

export type RateLimitResource = {
  __typename: 'RestRateLimitResource'
  limit: number
  used: number
  remaining: number
  reset: number
}

type GetRateLimitQuery = {
  getRateLimit: {
    __typename?: 'RestRateLimits'
    resources: {
      __typename?: 'RestRateLimitResources'
      core: RateLimitResource
      search: RateLimitResource
      graphql: RateLimitResource
    }
    rate: RateLimitResource
  }
}

export function useGetRateLimitLazyQuery(
  options?: LazyQueryHookOptions<GetRateLimitQuery>
): QueryTuple<GetRateLimitQuery, OperationVariables> {
  return useLazyQuery<GetRateLimitQuery>(GET_RATE_LIMIT, options)
}
