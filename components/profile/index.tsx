import React from 'react'
import { useSession } from 'next-auth/client'
import styled from 'styled-components'
import { SkeletonProfile } from 'components/profile/profileSkeleton'
import { ProfileNotFound } from 'components/profile/profileNotFound'
import { ProfileHeader } from 'components/profile/profileHeader'
import { FollowingBanner } from 'components/profile/followingBanner'
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

  return (
    <>
      {loading && <SkeletonProfile />}
      {!loading && !data && <ProfileNotFound />}
      {!loading && data && <ProfileHeader data={data} />}
      <ProfileStyles>{!loading && data && <FollowingBanner />}</ProfileStyles>
    </>
  )
}
