import { QueryResult } from '@apollo/client'
import {
  useGetFeedQuery as useGetFeedQueryGenerated,
  GetFeedQuery,
  GetFeedQueryVariables as GetFeedQueryVariablesGenerated,
  useCache_UserInfo_ViewerPropsQuery,
} from 'graphql/generated'
import { getFeedQueryString } from 'helpers'

export const useGetFeedQuery = (): QueryResult<
  GetFeedQuery,
  GetFeedQueryVariablesGenerated
> => {
  const { data } = useCache_UserInfo_ViewerPropsQuery()
  const followingUsers = data?.viewer.followingUsers || []
  const feedSearch = getFeedQueryString(followingUsers)
  const queryResult = useGetFeedQueryGenerated({ variables: { feedSearch } })
  return queryResult
}
