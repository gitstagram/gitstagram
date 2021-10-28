import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import cn from 'classnames'
import { apolloClient } from 'graphql/apolloClient'
import { Button } from 'components/ui'
import { toast } from 'react-toastify'
import { writeLibraryData, useViewerInfo, useUserInfo } from 'components/data'
import {
  UserHasBeen,
  Cache_UserInfo_HasBeenFragment,
  Cache_UserInfo_HasBeenFragmentDoc,
} from 'graphql/generated'
import { addStarMutationPromise } from 'graphql/operations'
import { async, captureException, uniqArr } from 'helpers'

type FollowButtonStylesProps = {
  variant?: 'small'
  show: Maybe<boolean>
  removable?: boolean
}

type FollowButtonProps = BaseProps &
  FollowButtonStylesProps & {
    followUserLogin: string
  }

type FollowState = 'base' | 'loading'

const FollowButtonStyles = styled.span.withConfig({
  shouldForwardProp: (prop) => !['show', 'removable'].includes(prop),
})<FollowButtonStylesProps>`
  ${({ removable }) =>
    removable &&
    css`
      button {
        ::after {
          content: 'Removed';
        }
      }

      .loading {
        ::after {
          content: 'Refollow';
        }
      }

      button {
        &:hover,
        &:focus {
          ::after {
            content: 'Refollow';
          }
        }
      }
    `}

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
  removable,
  ...props
}: FollowButtonProps): JSX.Element => {
  const [followState, setFollowState] = useState<FollowState>('base')
  const userInfo = useUserInfo(followUserLogin)
  const viewerInfo = useViewerInfo()

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
      { following: uniqArr([...viewerInfo.followingUsers, followUserLogin]) },
      { commitWithMessage: `Follow: ${followUserLogin}` }
    )
      .then(() => {
        // A fully loaded user will have cached follower number
        // Following/Unfollowing user from that cached state needs to be flagged
        if (userInfo.fullyLoaded) {
          const newHasBeen =
            userInfo.hasBeen === UserHasBeen.Unfollowed
              ? UserHasBeen.Untouched
              : UserHasBeen.Followed

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
    <FollowButtonStyles show={show} variant={variant} removable={removable}>
      <Button
        {...props}
        className={cn(props.className, { loading: followState === 'loading' })}
        variant={variant}
        onClick={handleFollow}
        intent={removable ? 'warning-invert' : undefined}
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
        {removable ? '' : 'Follow'}
      </Button>
    </FollowButtonStyles>
  )
}
