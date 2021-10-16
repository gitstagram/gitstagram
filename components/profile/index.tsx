import React from 'react'
import styled from 'styled-components'
import { SkeletonProfile } from 'components/profile/profileSkeleton'
import { ProfileNotFound } from 'components/profile/profileNotFound'
import { ProfileHeader } from 'components/profile/profileHeader'
import { FromTabletLandscape, Hr } from 'components/ui'

import {
  useGetUserGitstagramLibraryQuery,
  useGetViewerQuery,
  useGetViewerGitstagramLibraryQuery,
} from 'graphql/generated'

type ProfileProps = {
  userLogin: string
}

const ProfileStyles = styled.div`
  width: 100%;
`

export const Profile = ({ userLogin }: ProfileProps): JSX.Element => {
  const { data: loginData } = useGetViewerQuery()
  const isViewer = loginData?.viewer.login === userLogin

  const { data: userData, loading: userLoading } =
    useGetUserGitstagramLibraryQuery({
      skip: isViewer,
      variables: {
        userLogin,
      },
    })

  const { data: viewerData, loading: viewerLoading } =
    useGetViewerGitstagramLibraryQuery({
      skip: !isViewer,
    })

  const data = userData?.user || viewerData?.viewer
  const loading = userLoading || viewerLoading

  return (
    <>
      {loading && <SkeletonProfile />}
      {!loading && !data && <ProfileNotFound />}
      {!loading && data && <ProfileHeader userLogin={userLogin} data={data} />}
      <ProfileStyles>
        <FromTabletLandscape>
          <Hr />
        </FromTabletLandscape>
      </ProfileStyles>
    </>
  )
}
