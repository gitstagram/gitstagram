import React, { useState } from 'react'
import { apolloClient } from 'graphql/apolloClient'
import styled, { css } from 'styled-components'
import { Button } from 'components/ui'
import { toast } from 'react-toastify'
import { writeLibraryData } from 'components/data/gitstagramLibraryData'
import { useUserInfo } from 'components/data/useUserInfo'
import { deleteStarMutationPromise } from 'graphql/operations'
import {
  UserHasBeen,
  Cache_UserInfoHasBeenFragmentDoc,
  Cache_UserInfoHasBeenFragment,
} from 'graphql/generated'
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
  const { following, hasBeen } = useUserInfo(followUserLogin)
  const [followState, setFollowState] = useState<FollowState>('base')

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
      { following: following.filter((item) => item !== followUserLogin) },
      { commitMessage: `Unfollow: ${followUserLogin}` }
    )
      .then(() => {
        const newHasBeen =
          hasBeen === UserHasBeen.Followed
            ? UserHasBeen.Untouched
            : UserHasBeen.Unfollowed

        apolloClient.writeFragment<Cache_UserInfoHasBeenFragment>({
          id: apolloClient.cache.identify({
            __typename: 'UserInfo',
            login: followUserLogin,
          }),
          fragment: Cache_UserInfoHasBeenFragmentDoc,
          data: { hasBeen: newHasBeen },
        })
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
