import React, { useState } from 'react'
import { apolloClient } from 'graphql/apolloClient'
import styled, { css } from 'styled-components'
import { Button } from 'components/ui'
import { toast } from 'react-toastify'
import { writeLibraryData } from 'components/data/gitstagramLibraryData'
import { useUserInfo } from 'components/data/useUserInfo'
import { addStarMutationPromise } from 'graphql/operations'
import {
  UserHasBeen,
  Cache_UserInfoHasBeenFragmentDoc,
  Cache_UserInfoHasBeenFragment,
} from 'graphql/generated'
import { async, captureException, uniqArr } from 'helpers'

type FollowButtonStylesProps = {
  show: Maybe<boolean>
}

type FollowButtonProps = BaseProps &
  FollowButtonStylesProps & {
    variant?: 'small'
    followUserLogin: string
  }

type FollowState = 'base' | 'loading'

const FollowButtonStyles = styled.span.withConfig({
  shouldForwardProp: (prop) => !['show'].includes(prop),
})<FollowButtonStylesProps>`
  ${({ show }) =>
    !show &&
    css`
      display: none;
    `}
`

export const FollowButton = ({
  variant,
  followUserLogin,
  show,
  ...props
}: FollowButtonProps): JSX.Element => {
  const { following, hasBeen } = useUserInfo(followUserLogin)
  const [followState, setFollowState] = useState<FollowState>('base')

  const handleFollow = async () => {
    setFollowState('loading')
    const { err: starErr } = await async(
      addStarMutationPromise({ userLogin: followUserLogin })
    )

    if (starErr) {
      captureException({
        err: starErr,
        inside: 'FollowButton',
        msgs: [[starErr, 'Error adding star']],
      })
      toast.warn('Issue following user on Github')
      setFollowState('base')
      return
    }

    return writeLibraryData(
      { following: uniqArr([...following, followUserLogin]) },
      { commitMessage: `Follow: ${followUserLogin}` }
    )
      .then(() => {
        const newHasBeen =
          hasBeen === UserHasBeen.Unfollowed
            ? UserHasBeen.Untouched
            : UserHasBeen.Followed

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
    <FollowButtonStyles show={show}>
      <Button
        {...props}
        variant={variant}
        onClick={handleFollow}
        icon={
          variant === 'small'
            ? undefined
            : {
                ariaHidden: true,
                icon: followState === 'loading' ? 'gear' : 'person-plus-fill',
              }
        }
        loading={followState === 'loading'}
        disabled={followState === 'loading'}
      >
        Follow
      </Button>
    </FollowButtonStyles>
  )
}
