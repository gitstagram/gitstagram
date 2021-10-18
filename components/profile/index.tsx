import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import styled from 'styled-components'
import { useDialogState } from 'reakit/Dialog'
import { SkeletonProfile } from 'components/profile/profileSkeleton'
import { ProfileNotFound } from 'components/profile/profileNotFound'
import { ProfileHeader } from 'components/profile/profileHeader'
import { FollowingBanner } from 'components/profile/followingBanner'
import { getRawLibraryDataPromise } from 'graphql/restOperations'
import { Hr, UntilTabletLandscape, Dialog } from 'components/ui'
import { useLoadAsync } from 'components/hooks'
import { useFollowingVar } from 'components/data/gitstagramLibraryData'
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

const FollowDialogStyles = styled(Dialog)``

export const Profile = ({ userLogin }: ProfileProps): JSX.Element => {
  const [session] = useSession()
  const viewerLogin = session?.user?.name
  const isLoggedOut = !session || !viewerLogin
  const isViewer = viewerLogin === userLogin

  const { data: userData, loading: userLoading } =
    useGetUserGitstagramLibraryQuery({
      skip: isLoggedOut || isViewer,
      variables: {
        userLogin,
      },
    })

  const { data: viewerData, loading: viewerLoading } =
    useGetViewerGitstagramLibraryQuery({
      skip: isLoggedOut || !isViewer,
      variables: {
        userLogin: viewerLogin as string,
      },
    })

  const data = userData?.user || viewerData?.viewer
  const loading = userLoading || viewerLoading

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
  } = useLoadAsync((login: string) => getRawLibraryDataPromise(login), {
    skip: isViewer,
    arguments: [userLogin],
  })
  const libCorrectFormat = !libLoading && !libErr && isLibraryData(libData)
  const followingData = libData?.following
  const followingCount = followingData?.length

  if (!libLoading && (libErr || !libCorrectFormat || !followingData)) {
    captureException({
      libErr,
      msgs: [
        [libErr, 'FollowingBanner libData fetch failure'],
        [!libCorrectFormat, 'FollowingBanner libData fetch bad format'],
        [!followingData, 'FollowingBanner libData no following in response'],
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
        )}
        {followerDialogMounted && (
          <FollowDialogStyles
            {...followerDialog}
            ariaLabel='Follower list dialog'
            title={<span>Followers</span>}
          >
            Follower list
          </FollowDialogStyles>
        )}
        {followingDialogMounted && (
          <FollowDialogStyles
            {...followingDialog}
            ariaLabel='Following list dialog'
            title={<span>Following</span>}
          >
            Following list
          </FollowDialogStyles>
        )}
      </ProfileStyles>
    </>
  )
}
