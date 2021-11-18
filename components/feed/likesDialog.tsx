import React from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { DialogStateReturn } from 'reakit/Dialog'
import { ProfileIcon } from 'components/profileIcon'
import {
  TextInfo,
  SkeletonUserList,
  TextDeemph,
  useDialogScroll,
} from 'components/ui'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { ListDialogStyles } from 'components/listDialogStyles'
import { FollowButton } from 'components/profile/followButton'
import { FollowingButton } from 'components/profile/followingButton'
import { useViewerInfo } from 'components/data'
import {
  useGetLikesQuery,
  GetLikesQuery,
  GetLikesQueryVariables,
} from 'graphql/generated'
import { getProfilePath } from 'routes'

type LikesDialogProps = {
  issueId: string
  dialogProps: DialogStateReturn
}

export const LikesDialog = ({
  issueId,
  dialogProps,
}: LikesDialogProps): JSX.Element => {
  const viewerInfo = useViewerInfo()
  const { data, loading, error, fetchMore } = useGetLikesQuery({
    variables: { issueId },
  })
  const reactions =
    data?.node?.__typename === 'Issue' ? data.node.reactions : undefined
  const likes = reactions?.nodes

  const handleListScrollToBottom = () => {
    if (reactions?.pageInfo.hasNextPage && !loading) {
      const cursor = reactions.pageInfo.endCursor
      void fetchMore<GetLikesQuery, GetLikesQueryVariables>({
        variables: { issueId, afterReactionsCursor: cursor },
      })
    }
  }
  const scrollRef = useBottomScrollListener(handleListScrollToBottom)
  useDialogScroll(dialogProps, scrollRef)

  return (
    <ListDialogStyles
      {...dialogProps}
      ariaLabel='Likes list dialog'
      title='Likes'
    >
      <div
        className='list-dialog-body'
        ref={scrollRef as React.RefObject<HTMLDivElement>}
      >
        {!loading && likes && likes.length === 0 && (
          <div className='list-dialog-nothing'>
            <TextInfo>No users to show</TextInfo>
          </div>
        )}
        {!loading &&
          likes &&
          likes.length !== 0 &&
          likes.map((like, index) => {
            const user = like?.user

            if (user) {
              const userLogin = user.login
              const isViewer = userLogin === viewerInfo.login
              const isFollowing = viewerInfo.followingUsers?.includes(userLogin)

              return (
                <div
                  key={index}
                  className={cn('list-dialog-item', {
                    'list-dialog-following-removed': !isViewer && !isFollowing,
                  })}
                >
                  <Link href={getProfilePath(userLogin)}>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                    <a
                      className='list-dialog-profile'
                      onClick={dialogProps.hide}
                    >
                      <ProfileIcon
                        className='list-dialog-profile-img'
                        url={user.avatarUrl as string}
                        userLogin={userLogin}
                        size={32}
                      />
                      <div className='list-dialog-profile-details'>
                        <b>{userLogin}</b>
                        {user.name && (
                          <TextDeemph className='list-dialog-profile-name'>
                            {user.name}
                          </TextDeemph>
                        )}
                      </div>
                    </a>
                  </Link>
                  {!isViewer && (
                    <>
                      <FollowingButton
                        className='list-dialog-follow-button'
                        variant='small'
                        followUserLogin={userLogin}
                        show={isFollowing}
                      />
                      <FollowButton
                        className='list-dialog-follow-button'
                        variant='small'
                        followUserLogin={userLogin}
                        show={!isFollowing}
                        removable={true}
                      />
                    </>
                  )}
                </div>
              )
            } else {
              return null
            }
          })}
        {error && (
          <div className='list-dialog-nothing'>
            <TextInfo>Issue loading, please try again</TextInfo>
          </div>
        )}
        {loading && <SkeletonUserList />}
      </div>
    </ListDialogStyles>
  )
}
