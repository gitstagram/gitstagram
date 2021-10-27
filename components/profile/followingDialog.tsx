import React, { useState, useEffect, useMemo } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { DialogStateReturn } from 'reakit/Dialog'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { ProfileIcon } from 'components/profileIcon'
import { FollowDialogStyles } from 'components/profile/followDialogStyles'
import { FollowButton } from 'components/profile/followButton'
import { FollowingButton } from 'components/profile/followingButton'
import { useViewerInfo } from 'components/data/useViewerInfo'
import { useUserInfo } from 'components/data/useUserInfo'
import {
  useGetFollowingQuery,
  useGetFollowingLazyQuery,
  GetFollowingQuery,
} from 'graphql/generated'
import {
  useDialogScroll,
  TextInfo,
  SkeletonUserList,
  TextDeemph,
} from 'components/ui'
import { getFollowingQueryString } from 'helpers'
import { getProfilePath } from 'routes'

type FollowingDialogProps = BaseProps & {
  dialogProps: DialogStateReturn
  userLogin: string
}

const fetchBatchCount = 50

type SearchTypes = NonNullable<GetFollowingQuery['search']['nodes']>[number]
type User = Extract<SearchTypes, { __typename?: 'User' }>

const getFollowingResults = (queryData: GetFollowingQuery) => {
  return queryData?.search?.nodes?.filter(
    (item) => item?.__typename === 'User'
  ) as User[]
}

export const FollowingDialog = ({
  userLogin,
  dialogProps,
}: FollowingDialogProps): JSX.Element => {
  const viewerInfo = useViewerInfo()
  const userInfo = useUserInfo(userLogin)
  const isViewerPage = userLogin === viewerInfo.login

  const followingList = isViewerPage
    ? viewerInfo.followingUsers
    : userInfo?.followingUsers
  const [following, setFollowing] = useState<User[]>([])
  const [fetchedCount, setFetchedCount] = useState(0)
  useEffect(() => {
    setFollowing([])
    setFetchedCount(0)
  }, [userLogin])

  const firstBatch = useMemo(
    () => followingList?.slice(0, fetchBatchCount),
    [followingList]
  )
  const {
    data: initData,
    loading: initLoading,
    error: initErr,
  } = useGetFollowingQuery({
    skip: !firstBatch || firstBatch.length === 0,
    variables: {
      followingSearch: getFollowingQueryString(firstBatch || []),
      firstUsers: fetchBatchCount,
    },
  })
  const [
    getMoreFollowing,
    { data: moreData, loading: moreLoading, error: moreError },
  ] = useGetFollowingLazyQuery()

  const totalFollowing = followingList?.length
  const anyLoading = initLoading || moreLoading
  const anyError = initErr || moreError

  useEffect(() => {
    if (initData && fetchedCount === 0) {
      const followingResults = getFollowingResults(initData)
      setFollowing(followingResults)
      setFetchedCount((fetchedCount) => fetchedCount + fetchBatchCount)
    }
    // If additional initData comes in
    // That means the viewer's following list has changed in the first batch
    // Find any items that are not currently in that first batch, and add them
    if (initData && fetchedCount !== 0) {
      setFollowing((currentFollowing) => {
        const newData = getFollowingResults(initData)
        const currentLogins = currentFollowing.map((user) => user.login)
        const notInFollowing = newData.filter(
          (user) => !currentLogins.includes(user.login)
        )
        setFetchedCount((fetchedCount) => fetchedCount + notInFollowing.length)
        return [...currentFollowing, ...notInFollowing]
      })
    }
  }, [initData, fetchedCount])

  useEffect(() => {
    if (moreData) {
      const followingResults = getFollowingResults(moreData)
      setFollowing((following) => [...following, ...followingResults])
      setFetchedCount((fetchedCount) => fetchedCount + fetchBatchCount)
    }
  }, [moreData])

  const handleListScrollToBottom = () => {
    const fetchedMoreThanTotal =
      typeof totalFollowing === 'number' ? fetchedCount > totalFollowing : true
    if (!anyLoading && !fetchedMoreThanTotal) {
      const nextBatch = followingList?.slice(
        fetchedCount,
        fetchedCount + fetchBatchCount
      )
      nextBatch &&
        getMoreFollowing({
          variables: {
            followingSearch: getFollowingQueryString(nextBatch),
            firstUsers: fetchBatchCount,
          },
        })
    }
  }
  const scrollRef = useBottomScrollListener(handleListScrollToBottom)
  useDialogScroll(dialogProps, scrollRef)

  return (
    <FollowDialogStyles
      {...dialogProps}
      ariaLabel='Following list dialog'
      title='Following'
    >
      <div
        className='follow-dialog-body'
        ref={scrollRef as React.RefObject<HTMLDivElement>}
      >
        {!anyLoading && !following.length && totalFollowing === 0 && (
          <div className='follow-nothing'>
            <TextInfo>No users to show</TextInfo>
          </div>
        )}
        {following.length !== 0 &&
          // use index as key because pagination may result in duplicated items
          following.map((follow, index) => {
            const userLogin = follow.login
            const isViewer = userLogin === viewerInfo.login
            const isFollowing = viewerInfo.followingUsers?.includes(userLogin)

            // User a 'following-removed' class on the viewer's page
            // So unfollowing someone isn't an irreversible disappearance
            return (
              <div
                key={index}
                className={cn('follow-item', {
                  'following-removed': isViewerPage && !isFollowing,
                })}
              >
                <Link href={getProfilePath(userLogin)}>
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                  <a className='follow-profile' onClick={dialogProps.hide}>
                    <ProfileIcon
                      className='follow-profile-img'
                      url={follow.avatarUrl as string}
                      userLogin={userLogin}
                      size={32}
                    />
                    <div className='follow-profile-details'>
                      <b>{userLogin}</b>
                      {follow.name && (
                        <TextDeemph className='follow-profile-name'>
                          {follow.name}
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
                      followUserLogin={userLogin}
                      show={isFollowing}
                    />
                    <FollowButton
                      className='follow-button'
                      variant='small'
                      followUserLogin={userLogin}
                      show={!isFollowing}
                      removable={isViewerPage}
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
