import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/client'
import { DialogStateReturn } from 'reakit/Dialog'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { ProfileIcon } from 'components/profileIcon'
import { FollowDialogStyles } from 'components/profile/followDialogStyles'
import { FollowButton } from 'components/profile/followButton'
import { FollowingButton } from 'components/profile/followingButton'
import { useFollowingVar } from 'components/data/gitstagramLibraryData'
import { getRawLibraryDataPromise } from 'graphql/restOperations'
import {
  useGetFollowingQuery,
  useGetFollowingLazyQuery,
  GetFollowingQuery,
} from 'graphql/generated'
import { useLoadAsync } from 'components/hooks'
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
  const [session] = useSession()
  const isViewerPage = session?.user?.name === userLogin

  const {
    data: libData,
    loading: libLoading,
    err: libErr,
  } = useLoadAsync((login: string) => getRawLibraryDataPromise(login), {
    arguments: [userLogin],
  })
  const followingVar = useFollowingVar()
  const followingList = isViewerPage ? followingVar : libData?.following

  const [following, setFollowing] = useState<User[]>([])
  const [fetchedCount, setFetchedCount] = useState(0)
  const firstBatch = useMemo(
    () => followingList?.slice(0, fetchBatchCount),
    [followingList]
  )

  const { data, loading, error } = useGetFollowingQuery({
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
  const isLoading = libLoading || loading || moreLoading
  const hasError = libErr || error || moreError

  useEffect(() => {
    if (followingList) {
      setFollowing((following) => {
        if (followingList.length < following.length) {
          return following.filter((item) => followingList.includes(item.login))
        } else {
          return following
        }
      })
    }
  }, [followingList])

  useEffect(() => {
    setFollowing([])
    setFetchedCount(0)
  }, [userLogin])

  useEffect(() => {
    if (data && fetchedCount === 0) {
      const followingResults = getFollowingResults(data)
      setFollowing(followingResults)
      setFetchedCount((fetchedCount) => fetchedCount + fetchBatchCount)
    }
  }, [data, fetchedCount])

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
    if (!isLoading && !fetchedMoreThanTotal) {
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
        {!isLoading && totalFollowing === 0 && (
          <div className='follow-nothing'>
            <TextInfo>No users to show</TextInfo>
          </div>
        )}
        {following.length !== 0 &&
          // use index as key because pagination may result in duplicated items
          following.map((follow, index) => {
            const login = follow.login
            const isUser = login === session?.user?.name
            const isFollowing = followingVar?.includes(login)
            return (
              <div key={index} className='follow-item'>
                <Link href={getProfilePath(login)}>
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                  <a className='follow-profile' onClick={dialogProps.hide}>
                    <ProfileIcon
                      className='follow-profile-img'
                      url={follow.avatarUrl as string}
                      userLogin={login}
                      size={32}
                    />
                    <div className='follow-profile-details'>
                      <b>{login}</b>
                      {follow.name && (
                        <TextDeemph className='follow-profile-name'>
                          {follow.name}
                        </TextDeemph>
                      )}
                    </div>
                  </a>
                </Link>
                <FollowingButton
                  className='follow-button'
                  variant='small'
                  followUserLogin={follow.login}
                  show={session && !isUser && isFollowing}
                />
                <FollowButton
                  className='follow-button'
                  variant='small'
                  followUserLogin={follow.login}
                  show={session && !isUser && !isFollowing}
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
