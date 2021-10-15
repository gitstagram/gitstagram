import React from 'react'
import styled from 'styled-components'
import { SkeletonProfile } from 'components/profile/profileSkeleton'
import { ProfileIcon } from 'components/profileIcon'
import { ProfileNotFound } from 'components/profile/profileNotFound'
import {
  useGetUserGitstagramLibraryQuery,
  useGetViewerQuery,
  useGetViewerGitstagramLibraryQuery,
} from 'graphql/generated'

const ProfileStyles = styled.div``

type ProfileProps = {
  userLogin: string
}

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
      {!loading && data && (
        <ProfileStyles>
          <div className='profile-head'>
            <ProfileIcon
              className='search-item-img'
              url={data.avatarUrl as string}
              userLogin={data.login}
              size={96}
            />
          </div>
        </ProfileStyles>
      )}
    </>
  )
}
