import { QueryResult } from '@apollo/client'
import {
  useGetFeedQuery as useGetFeedQueryGenerated,
  GetFeedQuery,
  GetFeedQueryVariables as GetFeedQueryVariablesGenerated,
  useCache_UserInfo_ViewerPropsQuery,
  Cache_UserInfo_ViewerPropsQuery,
  Cache_UserInfo_ViewerPropsDocument,
} from 'graphql/generated'
import { apolloClient } from 'graphql/apolloClient'
import { getFeedQueryString, async } from 'helpers'

export const useGetFeedQuery = (): QueryResult<
  GetFeedQuery,
  GetFeedQueryVariablesGenerated
> => {
  const { data } = useCache_UserInfo_ViewerPropsQuery()
  const followingUsers = data?.viewer.followingUsers || []
  const feedSearch = getFeedQueryString(followingUsers)
  const queryResult = useGetFeedQueryGenerated({
    variables: { feedSearch },
    notifyOnNetworkStatusChange: true,
  })
  return queryResult
}

export const feedFetchMore = async (
  fetchMoreFn: QueryResult['fetchMore'],
  cursor: string
): Promise<void> => {
  const viewerInfo = await async(
    apolloClient.query<Cache_UserInfo_ViewerPropsQuery>({
      query: Cache_UserInfo_ViewerPropsDocument,
    })
  )

  const followingUsers = viewerInfo?.res?.data.viewer.followingUsers || []
  const feedSearch = getFeedQueryString(followingUsers)
  void fetchMoreFn<GetFeedQuery, GetFeedQueryVariablesGenerated>({
    variables: { feedSearch, afterIssueCursor: cursor },
  })
  return
}
