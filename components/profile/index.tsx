import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDialogState } from 'reakit/Dialog'
import { useViewerInfo } from 'components/data'
import { SkeletonProfile } from 'components/profile/profileSkeleton'
import { ProfileUnavailable } from 'components/profile/profileUnavailable'
import { ProfileHeader } from 'components/profile/profileHeader'
import { FollowingBanner } from 'components/profile/followingBanner'
import { FollowerDialog } from 'components/profile/followerDialog'
import { FollowingDialog } from 'components/profile/followingDialog'
import { ProfilePosts } from 'components/profile/profilePosts'
import { getLibraryDataQueryPromise } from 'graphql/operations'
import { Hr, UntilTabletLandscape, FromTabletLandscape } from 'components/ui'
import { themeConstant, theme } from 'styles/themes'

import {
  useGetUserGitstagramLibraryQuery,
  useGetViewerGitstagramLibraryQuery,
} from 'graphql/generated'

type ProfileProps = {
  userLogin: string
}

const ProfileStyles = styled.div`
  width: 100vw;
  margin-left: calc(-1 * ${theme('appPadding')});

  ${themeConstant('media__TabletLandscape')} {
    width: 100%;
    margin-left: 0;
  }
`

export const Profile = ({ userLogin }: ProfileProps): JSX.Element => {
  const viewerInfo = useViewerInfo()
  const isViewer = userLogin === viewerInfo.login

  const [userLoading, setUserLoading] = useState(true)
  const [userLibDataErr, setUserLibDataErr] = useState<unknown>(undefined)
  const { data: userData, error: userError } = useGetUserGitstagramLibraryQuery(
    {
      skip: isViewer,
      variables: {
        userLogin,
      },
      onCompleted: () => {
        return getLibraryDataQueryPromise({ userLogin: userLogin })
          .then((res) => {
            setUserLoading(false)
            return res
          })
          .catch((err) => {
            setUserLibDataErr(err)
            setUserLoading(false)
          })
      },
    }
  )
  useEffect(() => {
    isViewer ? setUserLoading(false) : setUserLoading(true)
    setUserLibDataErr(undefined)
  }, [userLogin, isViewer])

  const {
    data: viewerData,
    loading: viewerLoading,
    error: viewerError,
  } = useGetViewerGitstagramLibraryQuery({
    skip: !isViewer,
    variables: {
      userLogin: viewerInfo.login,
    },
  })

  const profileData = userData?.user || viewerData?.viewer
  const anyLoading = userLoading || viewerLoading
  const anyError = userError || userLibDataErr || viewerError

  const [followerDialogMounted, setFollowerDialogMounted] = useState(false)
  const followerDialog = useDialogState({
    animated: true,
    modal: true,
    baseId: 'FollowerDialog',
  })

  useEffect(() => {
    if (followerDialog.visible && !followerDialogMounted) {
      setFollowerDialogMounted(true)
    }
  }, [followerDialog.visible, followerDialogMounted])

  const [followingDialogMounted, setFollowingDialogMounted] = useState(false)
  const followingDialog = useDialogState({
    animated: true,
    modal: true,
    baseId: 'FollowingDialog',
  })

  useEffect(() => {
    if (followingDialog.visible && !followingDialogMounted) {
      setFollowingDialogMounted(true)
    }
  }, [followingDialog.visible, followingDialogMounted])

  return (
    <>
      {anyLoading && !anyError && <SkeletonProfile />}
      {anyError && <ProfileUnavailable />}
      {!anyLoading && !anyError && profileData && (
        <>
          <ProfileHeader
            userLogin={userLogin}
            followerDialog={followerDialog}
            followingDialog={followingDialog}
          />
          <ProfileStyles>
            <UntilTabletLandscape>
              <Hr dim />
              <FollowingBanner
                followerDialog={followerDialog}
                followingDialog={followingDialog}
              />
              <Hr dim />
            </UntilTabletLandscape>
            <FromTabletLandscape>
              <Hr dim />
            </FromTabletLandscape>
          </ProfileStyles>
        </>
      )}
      {!anyLoading && <ProfilePosts userLogin={userLogin} />}
      {followerDialogMounted && (
        <FollowerDialog userLogin={userLogin} dialogProps={followerDialog} />
      )}
      {followingDialogMounted && (
        <FollowingDialog userLogin={userLogin} dialogProps={followingDialog} />
      )}
    </>
  )
}
