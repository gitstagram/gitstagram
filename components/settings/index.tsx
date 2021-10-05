import React from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'
import { H2, H3, Panel, Hr, Icon, TextInput, TextLink } from 'components/ui'
import { ProfileIcon } from 'components/profileIcon'
import { useGetViewerQuery } from 'graphql/generated'

const SettingsStyles = styled.div`
  width: 100%;
  max-width: ${theme('sz512')};
  margin-right: auto;
  margin-left: auto;

  .settings-section {
    margin-top: ${theme('sz56')};
    margin-bottom: ${theme('sz56')};
  }

  h3 {
    margin-bottom: ${theme('sz8')};
  }

  .settings-icon {
    margin-right: ${theme('sz8')};
  }

  .profile-image {
    margin-right: auto;
    margin-bottom: ${theme('sz8')};
    margin-left: auto;
    border-radius: ${theme('roundedCircle_BorderRadius')};
  }

  .profile-input {
    margin-bottom: ${theme('sz24')};
  }

  .profile-edit {
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      margin-right: ${theme('sz8')};
    }
  }
`

export const Settings = (): JSX.Element => {
  const { data, loading } = useGetViewerQuery()

  return (
    <SettingsStyles>
      <H2>Settings</H2>
      <Hr />
      <div className='settings-section'>
        <H3>
          <Icon className='settings-icon' icon='person-fill' ariaHidden />
          Profile
        </H3>
        <Panel>
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
        </Panel>
      </div>
      <Hr deemph />
      <div className='settings-section'>
        <H3>
          <Icon className='settings-icon' icon='github' ariaHidden />
          Rate limits
        </H3>
        <Panel>Setting</Panel>
      </div>
      <Hr deemph />
      <div className='settings-section'>
        <H3>
          <Icon
            className='settings-icon'
            icon='exclamation-triangle-fill'
            ariaHidden
          />
          Account
        </H3>
        <Panel>Setting</Panel>
      </div>
    </SettingsStyles>
  )
}
