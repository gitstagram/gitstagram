import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDialogState } from 'reakit/Dialog'
import { SkeletonProfile } from 'components/profile/profileSkeleton'
import { ProfileNotFound } from 'components/profile/profileNotFound'
import { ProfileCorrupted } from 'components/profile/profileCorrupted'
import { ProfileHeader } from 'components/profile/profileHeader'
import { FollowingBanner } from 'components/profile/followingBanner'
import { FollowerDialog } from 'components/profile/followerDialog'
import { FollowingDialog } from 'components/profile/followingDialog'
import { getLibraryDataQueryPromise } from 'graphql/operations'
import { Hr, UntilTabletLandscape, FromTabletLandscape } from 'components/ui'
import { useViewerInfo } from 'components/data/useViewerInfo'
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
  const viewerLogin = viewerInfo.login
  const isViewer = userLogin === viewerLogin

  const [allLoading, setAllLoading] = useState(true)
  const [libDataErr, setLibDataErr] = useState<unknown>(undefined)
  const { data: userData, error: userError } = useGetUserGitstagramLibraryQuery(
    {
      skip: isViewer,
      variables: {
        userLogin,
      },
      onCompleted: () => {
        return getLibraryDataQueryPromise({ userLogin: userLogin })
          .then((res) => {
            setAllLoading(false)
            return res
          })
          .catch((err) => {
            setLibDataErr(err)
            setAllLoading(false)
          })
      },
    }
  )
  useEffect(() => {
    isViewer ? setAllLoading(false) : setAllLoading(true)
    setLibDataErr(undefined)
  }, [userLogin, isViewer])

  const { data: viewerData, loading: viewerLoading } =
    useGetViewerGitstagramLibraryQuery({
      skip: !isViewer,
      variables: {
        userLogin: viewerLogin,
      },
    })

  const data = userData?.user || viewerData?.viewer
  const loading = allLoading || viewerLoading
  const error = libDataErr || userError

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
      {loading && <SkeletonProfile />}
      {!loading && !data && <ProfileNotFound />}
      {!loading && error && <ProfileCorrupted />}
      {!loading && !error && data && (
        <>
          <ProfileHeader
            data={data}
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
      {followerDialogMounted && (
        <FollowerDialog userLogin={userLogin} dialogProps={followerDialog} />
      )}
      {followingDialogMounted && (
        <FollowingDialog userLogin={userLogin} dialogProps={followingDialog} />
      )}
    </>
  )
}
