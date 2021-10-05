import {
  gql,
  useLazyQuery,
  LazyQueryHookOptions,
  QueryTuple,
  OperationVariables,
} from '@apollo/client'

export const GET_RATE_LIMIT = gql`
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

export type GetRestRateLimitQuery = {
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
