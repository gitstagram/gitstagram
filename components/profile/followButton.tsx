import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { Button } from 'components/ui'
import { toast } from 'react-toastify'
import {
  writeLibraryData,
  useFollowingVar,
} from 'components/data/gitstagramLibraryData'
import { addStarQueryPromise } from 'graphql/restOperations'
import { async, captureException, uniqArr } from 'helpers'
import {
  useGetViewerQuery,
  useGetViewerGitstagramLibraryQuery,
} from 'graphql/generated'

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

  const { data: loginData } = useGetViewerQuery()
  const viewerLogin = loginData?.viewer.login
  const { data } = useGetViewerGitstagramLibraryQuery({
    skip: !viewerLogin,
    variables: {
      userLogin: viewerLogin as string,
    },
  })

  const followingVar = useFollowingVar()

  const handleFollow = async () => {
    if (!viewerLogin) {
      toast.warn('Cannot read current user')
      return
    }

    setFollowState('loading')
    const { err: starErr } = await async(
      addStarQueryPromise({ userLogin: followUserLogin })
    )

    const oid = data?.viewer?.repository?.defaultBranchRef?.target
      ?.oid as string

    if (starErr || !oid) {
      captureException({
        err: starErr,
        msgs: [
          [starErr, 'FollowButton issue adding star'],
          [!oid, 'FollowButton no oID found'],
        ],
      })
      toast.warn('Issue following user on Github')
      setFollowState('base')
      return
    }

    await writeLibraryData(
      { following: uniqArr([...followingVar, followUserLogin]) },
      {
        login: viewerLogin,
        headOid: oid,
        commitMessage: `Following: ${followUserLogin}`,
      }
    )
    setFollowState('base')
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
