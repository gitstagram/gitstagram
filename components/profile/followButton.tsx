import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { Button } from 'components/ui'
import { toast } from 'react-toastify'
import {
  writeLibraryData,
  useFollowingVar,
} from 'components/data/gitstagramLibraryData'
import { addStarMutationPromise } from 'graphql/restOperations'
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
  const [followState, setFollowState] = useState<FollowState>('base')
  const followingVar = useFollowingVar()

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
      { following: uniqArr([...followingVar, followUserLogin]) },
      { commitMessage: `Following: ${followUserLogin}` }
    ).finally(() => {
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
