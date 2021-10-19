import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/client'
import { DialogStateReturn } from 'reakit/Dialog'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { ProfileIcon } from 'components/profileIcon'
import { useFollowingVar } from 'components/data/gitstagramLibraryData'
import { FollowDialogStyles } from 'components/profile/followDialogStyles'
import { FollowingButton } from 'components/profile/followingButton'
import { FollowButton } from 'components/profile/followButton'
import { TextDeemph, TextInfo, SkeletonUserList } from 'components/ui'
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
  const [session] = useSession()
  const { data, loading, error } = useGetStargazersQuery({
    variables: {
      userLogin,
      firstStargazers: fetchBatchCount,
    },
  })
  const totalStargazers = data?.repository?.stargazerCount || 0
  const [
    getMoreStargazers,
    { data: moreData, loading: moreLoading, error: moreError },
  ] = useGetStargazersLazyQuery()
  const [lastCursor, setLastCursor] = useState<string | null>(null)
  const [stargazers, setStargazers] = useState<StargazersWithCursor>([])
  const [fetchedCount, setFetchedCount] = useState(0)

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

  const followingVar = useFollowingVar()
  const isLoading = loading || moreLoading
  const hasError = error || moreError

  /**
   * This fixes iOS scroll lock not being released
   * https://github.com/reakit/reakit/issues/469
   */
  const scrollRef = useBottomScrollListener(handleListScrollToBottom)
  useEffect(() => {
    const scrollBox = scrollRef.current
    if (dialogProps.visible && scrollBox) {
      disableBodyScroll(scrollBox)
    }
    return () => {
      scrollBox && enableBodyScroll(scrollBox)
    }
  }, [dialogProps.visible, scrollRef])

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
            <TextInfo className='search-prompt'>No users to show</TextInfo>
          </div>
        )}
        {stargazers.length !== 0 &&
          stargazers.map((stargazer) => {
            const login = stargazer.login
            const isUser = login === session?.user?.name
            const isFollowing = followingVar.includes(login)
            return (
              <div key={stargazer.login} className='follow-item'>
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
                {session && !isUser && isFollowing && (
                  <FollowingButton className='follow-button' variant='small' />
                )}
                {session && !isUser && !isFollowing && (
                  <FollowButton className='follow-button' variant='small' />
                )}
              </div>
            )
          })}
        {hasError && (
          <div className='follow-nothing'>
            <TextInfo className='search-prompt'>
              Issue loading, please try again
            </TextInfo>
          </div>
        )}
        {isLoading && <SkeletonUserList />}
      </div>
    </FollowDialogStyles>
  )
}