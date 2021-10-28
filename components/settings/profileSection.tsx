import React from 'react'
import styled from 'styled-components'
import { useViewerInfo } from 'components/data'
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
  const viewerInfo = useViewerInfo()

  return (
    <ProfileSectionStyles>
      <ProfileIcon className='profile-image' size={96} useViewer />
      <TextInput
        className='profile-input'
        id='profile-username'
        name='profile-username'
        initialValue={viewerInfo.login || ''}
        disabled
        label='Username'
      />
      <TextInput
        className='profile-input'
        id='profile-name'
        name='profile-name'
        initialValue={viewerInfo.name || ''}
        placeholderText='Name...'
        disabled
        label='Name'
      />
      <TextInput
        className='profile-input'
        id='profile-location'
        name='profile-location'
        initialValue={(viewerInfo.location as Maybe<string>) || ''}
        placeholderText='Location...'
        disabled
        label='Location'
      />
      <TextInput
        className='profile-input'
        id='profile-twitter'
        name='profile-twitter'
        initialValue={viewerInfo.twitterUsername || ''}
        placeholderText='Twitter username...'
        disabled
        label='Twitter Username'
      />
      <TextInput
        className='profile-input'
        id='profile-bio'
        name='profile-bio'
        initialValue={viewerInfo.bio || ''}
        placeholderText='Bio...'
        disabled
        label='Bio'
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
