import {
  gql,
  useLazyQuery,
  LazyQueryHookOptions,
  QueryTuple,
} from '@apollo/client'

type SearchUsersVariables = {
  loginSearchQueryString: string
}

type SearchUsersQuery = {
  searchUsers: {
    items: {
      node_id: string
      name: string
      owner: {
        login: string
        avatar_url: string
      }
    }[]
  }
}

const SEARCH_USERS = gql`
  query SearchUsers($loginSearchQueryString: String!) {
    searchUsers(query: $loginSearchQueryString)
      @rest(
        type: "RestSearchUsers"
        path: "/search/repositories?{args.query}&per_page=50"
      ) {
      items {
        node_id
        name
        owner {
          login
          avatar_url
        }
      }
    }
  }
`

export function useSearchUsersLazyQuery(
  options?: LazyQueryHookOptions<SearchUsersQuery, SearchUsersVariables>
): QueryTuple<SearchUsersQuery, SearchUsersVariables> {
  return useLazyQuery<SearchUsersQuery, SearchUsersVariables>(
    SEARCH_USERS,
    options
  )
}
