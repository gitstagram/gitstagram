import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { Button } from 'components/ui'
import { toast } from 'react-toastify'
import {
  writeLibraryData,
  useFollowingVar,
} from 'components/data/gitstagramLibraryData'
import { deleteStarMutationPromise } from 'graphql/restOperations'
import { async, captureException } from 'helpers'
import {
  useGetViewerQuery,
  useGetViewerGitstagramLibraryQuery,
} from 'graphql/generated'

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
  const [followState, setFollowState] = useState<FollowState>('base')

  const { data: loginData } = useGetViewerQuery()
  const viewerLogin = loginData?.viewer.login
  const { data } = useGetViewerGitstagramLibraryQuery({
    skip: !viewerLogin,
    variables: {
      userLogin: viewerLogin as string,
    },
  })

  const followingVar = useFollowingVar()

  const handleUnfollow = async () => {
    if (!viewerLogin) {
      toast.warn('Cannot read current user')
      return
    }

    setFollowState('loading')
    const { err: starErr } = await async(
      deleteStarMutationPromise({ userLogin: followUserLogin })
    )

    const oid = data?.viewer?.repository?.defaultBranchRef?.target
      ?.oid as string

    if (starErr || !oid) {
      captureException({
        err: starErr,
        msgs: [
          [starErr, 'FollowingButton issue removing star'],
          [!oid, 'FollowingButton no oID found'],
        ],
      })
      toast.warn('Issue unfollowing user on Github')
      setFollowState('base')
      return
    }

    await writeLibraryData(
      { following: followingVar.filter((item) => item !== followUserLogin) },
      {
        login: viewerLogin,
        headOid: oid,
        commitMessage: `Unfollow: ${followUserLogin}`,
      }
    )
    setFollowState('base')
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
