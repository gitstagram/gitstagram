import React from 'react'
import styled from 'styled-components'
import { useGetViewerQuery } from 'graphql/generated'
import { theme } from 'styles/themes'

import { Panel, TextInput, Icon, TextLink } from 'components/ui'
import { ProfileIcon } from 'components/profileIcon'

const ProfileSectionStyles = styled(Panel)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .profile-image {
    margin-bottom: ${theme('sz8')};
  }

  .profile-input {
    width: 100%;
    margin-bottom: ${theme('sz24')};
  }

  .profile-edit {
    display: flex;
    align-items: center;

    i {
      margin-right: ${theme('sz8')};
    }
  }
`

export const ProfileSection = (): JSX.Element => {
  const { data, loading } = useGetViewerQuery()

  return (
    <ProfileSectionStyles>
      <ProfileIcon
        className='profile-image'
        size={96}
        url={data?.viewer.avatarUrl as string}
        name={data?.viewer.login as string}
      />
      <TextInput
        className='profile-input'
        id='profile-name'
        name='profile-name'
        initialValue={data?.viewer.login || ''}
        disabled
        label='Name'
        loading={loading}
      />
      <TextInput
        className='profile-input'
        id='profile-bio'
        name='profile-bio'
        initialValue={data?.viewer.bio || ''}
        placeholderText='Github bio...'
        disabled
        label='Github Bio'
        loading={loading}
      />
      <TextInput
        className='profile-input'
        id='profile-url'
        name='profile-url'
        initialValue={(data?.viewer.websiteUrl as Maybe<string>) || ''}
        placeholderText='Github URL...'
        disabled
        label='Website URL'
        loading={loading}
      />
      <TextInput
        className='profile-input'
        id='profile-twitter'
        name='profile-twitter'
        initialValue={data?.viewer.bio || ''}
        placeholderText='Twitter username...'
        disabled
        label='Twitter Username'
        loading={loading}
      />
      <TextLink
        className='profile-edit'
        href='https://github.com/settings/profile'
        external
        deemph
      >
        <Icon icon='github' ariaHidden />
        Edit Profile into on Github
      </TextLink>
    </ProfileSectionStyles>
  )
}
