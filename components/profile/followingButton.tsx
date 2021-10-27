import React, { useState } from 'react'
import cn from 'classnames'
import styled, { css } from 'styled-components'
import { apolloClient } from 'graphql/apolloClient'
import { Button } from 'components/ui'
import { toast } from 'react-toastify'
import { writeLibraryData } from 'components/data/gitstagramLibraryData'
import { useViewerInfo } from 'components/data/useViewerInfo'
import { useUserInfo } from 'components/data/useUserInfo'
import {
  UserHasBeen,
  Cache_UserInfo_HasBeenFragment,
  Cache_UserInfo_HasBeenFragmentDoc,
} from 'graphql/generated'
import { deleteStarMutationPromise } from 'graphql/operations'
import { async, captureException } from 'helpers'

type FollowingButtonStylesProps = {
  show: Maybe<boolean>
}

type FollowingButtonProps = BaseProps &
  FollowingButtonStylesProps & {
    variant?: 'small'
    followUserLogin: string
  }

type FollowState = 'base' | 'loading'

const FollowingButtonStyles = styled.span.withConfig({
  shouldForwardProp: (prop) => !['show'].includes(prop),
})<FollowingButtonStylesProps>`
  button {
    ::after {
      content: 'Following';
    }
  }

  .loading {
    ::after {
      content: 'Unfollow';
    }
  }

  button {
    &:hover,
    &:focus {
      ::after {
        content: 'Unfollow';
      }
    }
  }

  ${({ show }) =>
    !show &&
    css`
      display: none;
    `}
`

export const FollowingButton = ({
  variant,
  followUserLogin,
  show,
  ...props
}: FollowingButtonProps): JSX.Element => {
  const [followState, setFollowState] = useState<FollowState>('base')
  const userInfo = useUserInfo(followUserLogin)
  const viewerInfo = useViewerInfo()

  const handleUnfollow = async () => {
    setFollowState('loading')
    const { err: starErr } = await async(
      deleteStarMutationPromise({ userLogin: followUserLogin })
    )

    if (starErr) {
      captureException({
        err: starErr,
        inside: 'FollowingButton',
        msgs: [[starErr, 'Error removing star']],
      })
      toast.warn('Issue unfollowing user on Github')
      setFollowState('base')
      return
    }

    return writeLibraryData(
      {
        following: viewerInfo.followingUsers.filter(
          (item) => item !== followUserLogin
        ),
      },
      { commitMessage: `Unfollow: ${followUserLogin}` }
    )
      .then(() => {
        // A fully loaded user will have cached follower number
        // Following/Unfollowing user from that cached state needs to be flagged
        if (userInfo.fullyLoaded) {
          const newHasBeen =
            userInfo.hasBeen === UserHasBeen.Followed
              ? UserHasBeen.Untouched
              : UserHasBeen.Unfollowed

          apolloClient.writeFragment<Cache_UserInfo_HasBeenFragment>({
            id: apolloClient.cache.identify({
              __typename: 'User',
              login: followUserLogin,
            }),
            fragment: Cache_UserInfo_HasBeenFragmentDoc,
            data: { hasBeen: newHasBeen },
          })
        }
        return
      })
      .finally(() => {
        setFollowState('base')
      })
  }

  return (
    <FollowingButtonStyles show={show}>
      <Button
        {...props}
        className={cn(props.className, { loading: followState === 'loading' })}
        variant={variant}
        onClick={handleUnfollow}
        intent='danger-invert'
        icon={
          variant === 'small'
            ? undefined
            : {
                ariaHidden: true,
                icon: followState === 'loading' ? 'gear' : 'person-fill',
              }
        }
        loading={followState === 'loading'}
        disabled={followState === 'loading'}
      />
    </FollowingButtonStyles>
  )
}
