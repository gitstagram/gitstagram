import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { DialogStateReturn } from 'reakit/Dialog'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { ProfileIcon } from 'components/profileIcon'
import { useFollowingVar } from 'components/data/gitstagramLibraryData'
import { useViewerInfo } from 'components/data/useViewerInfo'
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
  const followingVar = useFollowingVar()
  const [lastCursor, setLastCursor] = useState<string | null>(null)
  const [stargazers, setStargazers] = useState<StargazersWithCursor>([])
  const [fetchedCount, setFetchedCount] = useState(0)

  const viewerInfo = useViewerInfo()
  const { data, loading, error } = useGetStargazersQuery({
    variables: {
      userLogin,
      firstStargazers: fetchBatchCount,
    },
  })
  const [
    getMoreStargazers,
    { data: moreData, loading: moreLoading, error: moreError },
  ] = useGetStargazersLazyQuery()

  const totalStargazers = data?.repository?.stargazerCount || 0
  const isLoading = loading || moreLoading
  const hasError = error || moreError

  useEffect(() => {
    if (data) {
      const { lastCursor, stargazersWithCursor } =
        getStargazersAndLastCursor(data)
      setLastCursor(lastCursor || null)
      setStargazers(stargazersWithCursor)
      setFetchedCount((fetchedCount) => (fetchedCount += fetchBatchCount))
    }
  }, [data])

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
    if (lastCursor && !isLoading && !fetchedMoreThanTotal) {
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
        {!isLoading && stargazers.length === 0 && (
          <div className='follow-nothing'>
            <TextInfo>No users to show</TextInfo>
          </div>
        )}
        {stargazers.length !== 0 &&
          // use index as key because pagination may result in duplicated items
          stargazers.map((stargazer, index) => {
            const login = stargazer.login
            const isUser = login === viewerInfo.login
            const isFollowing = followingVar.includes(login)
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
                <FollowingButton
                  className='follow-button'
                  variant='small'
                  followUserLogin={stargazer.login}
                  show={!isUser && isFollowing}
                />
                <FollowButton
                  className='follow-button'
                  variant='small'
                  followUserLogin={stargazer.login}
                  show={!isUser && !isFollowing}
                />
              </div>
            )
          })}
        {hasError && (
          <div className='follow-nothing'>
            <TextInfo>Issue loading, please try again</TextInfo>
          </div>
        )}
        {isLoading && <SkeletonUserList />}
      </div>
    </FollowDialogStyles>
  )
}
