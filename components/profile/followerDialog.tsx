import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { DialogStateReturn } from 'reakit/Dialog'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { ProfileIcon } from 'components/profileIcon'
import { useViewerInfo } from 'components/data/useViewerInfo'
import { useUserInfo } from 'components/data/useUserInfo'
import { FollowDialogStyles } from 'components/profile/followDialogStyles'
import { FollowingButton } from 'components/profile/followingButton'
import { FollowButton } from 'components/profile/followButton'
import {
  TextDeemph,
  TextInfo,
  SkeletonUserList,
  useDialogScroll,
} from 'components/ui'
import {
  useGetStargazersLazyQuery,
  useGetStargazersQuery,
  GetStargazersQuery,
  UserHasBeen,
} from 'graphql/generated'
import { getProfilePath } from 'routes'
import type { Merge } from 'type-fest'

type FollowerDialogProps = BaseProps & {
  dialogProps: DialogStateReturn
  userLogin: string
}

type QueryStargazers = NonNullable<
  GetStargazersQuery['repository']
>['stargazers']
type Stargazer = NonNullable<NonNullable<QueryStargazers['nodes']>[number]>
type Edge = NonNullable<NonNullable<QueryStargazers['edges']>[number]>
type StargazerWithCursor = Merge<Stargazer, Edge>
type StargazersWithCursor = StargazerWithCursor[]
const getStargazersAndLastCursor = (queryData: GetStargazersQuery) => {
  const edges = queryData?.repository?.stargazers?.edges
  const lastEdge = edges && edges[edges.length - 1]
  const lastCursor = lastEdge?.cursor

  const stargazerNodes = queryData?.repository?.stargazers?.nodes
  const stargazerEdges = queryData?.repository?.stargazers?.edges

  const stargazersWithCursor = (stargazerNodes || []).reduce(
    (acc, node, index) => {
      const edge = stargazerEdges && stargazerEdges[index]
      const cursor = edge?.cursor

      return cursor && node
        ? [
            ...acc,
            {
              ...node,
              cursor,
            } as StargazerWithCursor,
          ]
        : acc
    },
    [] as StargazersWithCursor
  )
  return { lastCursor, stargazersWithCursor }
}

const fetchBatchCount = 50

export const FollowerDialog = ({
  dialogProps,
  userLogin,
}: FollowerDialogProps): JSX.Element => {
  const [lastCursor, setLastCursor] = useState<string | null>(null)
  const [stargazers, setStargazers] = useState<StargazersWithCursor>([])
  const [fetchedCount, setFetchedCount] = useState(0)
  const viewerInfo = useViewerInfo()
  const userInfo = useUserInfo(userLogin)

  const {
    data: initData,
    loading: initLoading,
    error: initError,
  } = useGetStargazersQuery({
    variables: {
      userLogin,
      firstStargazers: fetchBatchCount,
    },
  })
  const [
    getMoreStargazers,
    { data: moreData, loading: moreLoading, error: moreError },
  ] = useGetStargazersLazyQuery()

  const totalStargazers = initData?.repository?.stargazerCount || 0
  const anyLoading = initLoading || moreLoading
  const anyError = initError || moreError

  useEffect(() => {
    if (initData) {
      const { lastCursor, stargazersWithCursor } =
        getStargazersAndLastCursor(initData)
      setLastCursor(lastCursor || null)
      setStargazers(stargazersWithCursor)
      setFetchedCount((fetchedCount) => (fetchedCount += fetchBatchCount))
    }
  }, [initData])

  useEffect(() => {
    if (moreData) {
      const { lastCursor, stargazersWithCursor } =
        getStargazersAndLastCursor(moreData)
      setLastCursor(lastCursor || null)
      setStargazers((stargazers) => [...stargazers, ...stargazersWithCursor])
      setFetchedCount((fetchedCount) => (fetchedCount += fetchBatchCount))
    }
  }, [moreData])

  const handleListScrollToBottom = () => {
    const fetchedMoreThanTotal = fetchedCount > totalStargazers
    if (lastCursor && !anyLoading && !fetchedMoreThanTotal) {
      getMoreStargazers({
        variables: {
          userLogin,
          firstStargazers: fetchBatchCount,
          afterStargazers: lastCursor,
        },
      })
    }
  }
  const scrollRef = useBottomScrollListener(handleListScrollToBottom)
  useDialogScroll(dialogProps, scrollRef)

  // If user has Followed/Unfollowed by viewer
  // Ensure that the viewer is visible or filtered out
  const adjustedStargazers =
    userInfo.hasBeen === UserHasBeen.Followed &&
    !stargazers.find((user) => user.login === viewerInfo.login)
      ? [
          {
            login: viewerInfo.login,
            avatarUrl: viewerInfo.avatarUrl,
            name: viewerInfo.name,
          },
          ...stargazers,
        ]
      : userInfo.hasBeen === UserHasBeen.Unfollowed
      ? stargazers.filter((user) => user.login !== viewerInfo.login)
      : stargazers

  return (
    <FollowDialogStyles
      {...dialogProps}
      ariaLabel='Followers list dialog'
      title='Followers'
    >
      <div
        className='follow-dialog-body'
        ref={scrollRef as React.RefObject<HTMLDivElement>}
      >
        {!anyLoading && adjustedStargazers.length === 0 && (
          <div className='follow-nothing'>
            <TextInfo>No users to show</TextInfo>
          </div>
        )}
        {adjustedStargazers.length !== 0 &&
          // use index as key because pagination may result in duplicated items
          adjustedStargazers.map((stargazer, index) => {
            const login = stargazer.login
            const isViewer = login === viewerInfo.login
            const isFollowing = viewerInfo.followingUsers.includes(login)
            return (
              <div key={index} className='follow-item'>
                <Link href={getProfilePath(login)}>
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                  <a className='follow-profile' onClick={dialogProps.hide}>
                    <ProfileIcon
                      className='follow-profile-img'
                      url={stargazer.avatarUrl as string}
                      userLogin={login}
                      size={32}
                    />
                    <div className='follow-profile-details'>
                      <b>{login}</b>
                      {stargazer.name && (
                        <TextDeemph className='follow-profile-name'>
                          {stargazer.name}
                        </TextDeemph>
                      )}
                    </div>
                  </a>
                </Link>
                {!isViewer && (
                  <>
                    <FollowingButton
                      className='follow-button'
                      variant='small'
                      followUserLogin={stargazer.login}
                      show={isFollowing}
                    />
                    <FollowButton
                      className='follow-button'
                      variant='small'
                      followUserLogin={stargazer.login}
                      show={!isFollowing}
                    />
                  </>
                )}
              </div>
            )
          })}
        {anyError && (
          <div className='follow-nothing'>
            <TextInfo>Issue loading, please try again</TextInfo>
          </div>
        )}
        {anyLoading && <SkeletonUserList />}
      </div>
    </FollowDialogStyles>
  )
}
