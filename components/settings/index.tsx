import React from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'
import { H2, H3, Hr, Icon, FromTabletLandscape } from 'components/ui'
import { ProfileSection } from 'components/settings/profileSection'
import { RateLimitsSection } from 'components/settings/rateLimitsSection'
import { AccountSection } from 'components/settings/accountSection'

const SettingsStyles = styled.div`
  width: 100%;
  max-width: ${theme('sz512')};
  margin-right: auto;
  margin-left: auto;

  .settings-section {
    margin-top: ${theme('sz32')};
    margin-bottom: ${theme('sz32')};
  }

  h3 {
    margin-bottom: ${theme('sz8')};
  }

  .settings-icon {
    margin-right: ${theme('sz8')};
  }
`

export const Settings = (): JSX.Element => {
  return (
    <SettingsStyles>
      <FromTabletLandscape>
        <H2>Settings</H2>
        <Hr className='hr' />
      </FromTabletLandscape>
      <div className='settings-section'>
        <H3>
          <Icon className='settings-icon' icon='person-fill' ariaHidden />
          Profile
        </H3>
        <ProfileSection />
      </div>
      <Hr deemph />
      <div className='settings-section'>
        <H3>
          <Icon className='settings-icon' icon='github' ariaHidden />
          Rate limits
        </H3>
        <RateLimitsSection />
      </div>
      <Hr deemph />
      <div className='settings-section'>
        <H3>
          <Icon className='settings-icon' icon='gear-fill' ariaHidden />
          Account
        </H3>
        <AccountSection />
      </div>
    </SettingsStyles>
  )
}
