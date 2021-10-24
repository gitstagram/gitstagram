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
import {
  getRawLibraryDataQueryPromise,
  getLibraryDataQueryPromise,
} from 'graphql/restOperations'
import { Hr, UntilTabletLandscape, FromTabletLandscape } from 'components/ui'
import { useLoadAsync } from 'components/hooks'
import { useFollowingVar } from 'components/data/gitstagramLibraryData'
import { useViewerInfo } from 'components/data/useViewerInfo'
import { captureException, isLibraryData } from 'helpers'
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
  const [allError, setAllError] = useState<unknown>(undefined)
  const { data: userData } = useGetUserGitstagramLibraryQuery({
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
          setAllError(err)
        })
    },
  })
  useEffect(() => setAllLoading(true), [userLogin])

  const { data: viewerData, loading: viewerLoading } =
    useGetViewerGitstagramLibraryQuery({
      skip: !isViewer,
      variables: {
        userLogin: viewerLogin,
      },
    })

  const data = userData?.user || viewerData?.viewer
  const loading = allLoading || viewerLoading

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

  const {
    data: libData,
    loadState: libLoadState,
    loading: libLoading,
    err: libErr,
  } = useLoadAsync((login: string) => getRawLibraryDataQueryPromise(login), {
    skip: isViewer,
    arguments: [userLogin],
  })
  const libCorrectFormat = !libLoading && !libErr && isLibraryData(libData)
  const followingCount = libData?.following?.length

  if (!libLoading && (libErr || !libCorrectFormat)) {
    captureException({
      libErr,
      inside: 'Profile',
      msgs: [
        [libErr, 'FollowingBanner libData fetch failure'],
        [!libCorrectFormat, 'FollowingBanner libData fetch bad format'],
      ],
    })
  }

  const followingVar = useFollowingVar()
  const bannerLoadState: LoadingStates = isViewer ? 'complete' : libLoadState
  const bannerFollowingCount = isViewer ? followingVar.length : followingCount

  return (
    <>
      {loading && <SkeletonProfile />}
      {!loading && !data && <ProfileNotFound />}
      {!libLoading && (libErr || !libCorrectFormat || allError) && (
        <ProfileCorrupted />
      )}
      {!loading && data && (
        <ProfileHeader
          data={data}
          followerDialog={followerDialog}
          followingDialog={followingDialog}
          bannerLoadState={bannerLoadState}
          bannerFollowingCount={bannerFollowingCount}
        />
      )}
      <ProfileStyles>
        {!loading && data && (
          <>
            <UntilTabletLandscape>
              <Hr dim />
              <FollowingBanner
                data={data}
                followerDialog={followerDialog}
                followingDialog={followingDialog}
                loadState={bannerLoadState}
                followingCount={bannerFollowingCount}
              />
              <Hr dim />
            </UntilTabletLandscape>
            <FromTabletLandscape>
              <Hr dim />
            </FromTabletLandscape>
          </>
        )}
        {followerDialogMounted && (
          <FollowerDialog userLogin={userLogin} dialogProps={followerDialog} />
        )}
        {followingDialogMounted && (
          <FollowingDialog
            userLogin={userLogin}
            dialogProps={followingDialog}
          />
        )}
      </ProfileStyles>
    </>
  )
}
