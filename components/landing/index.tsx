import React from 'react'
import { signIn } from 'next-auth/client'
import { LandingStyles } from './styles'

import {
  Emoji,
  Panel,
  TextAttn,
  TextCode,
  TextLogo,
  TextHero,
  TextSecondary,
  TextLink,
  Button,
} from 'components/ui'

export const Landing = (): JSX.Element => {
  const handleLogin = (): void => {
    void signIn('github')
  }

  return (
    <LandingStyles>
      <div className='left-column'>
        <TextLogo className='logo'>Gitstagram</TextLogo>
        <TextHero className='hero'>
          Social photo sharing <br /> on your Github account
        </TextHero>
        <ul className='benefit-list'>
          <li>
            <TextSecondary>
              <Emoji emoji='💾' ariaLabel='data disk' /> Control your personal
              data
            </TextSecondary>
          </li>
          <li>
            <TextSecondary>
              <Emoji emoji='🤖' ariaLabel='robot' /> No ads or surveillance
            </TextSecondary>
          </li>
          <li>
            <TextSecondary>
              <Emoji emoji='🎉' ariaLabel='party' /> Free and open source
            </TextSecondary>
          </li>
        </ul>
      </div>
      <div className='right-column'>
        <Panel className='login-panel'>
          <TextAttn className='explain-title'>How it works:</TextAttn>
          <ul className='explain-list'>
            <li>Creates repo if none exists</li>
            <li>
              <TextCode>gitstagram-library</TextCode>
            </li>
            <li>Actions self-contained to repo</li>
          </ul>
          <Button className='login' type='large' onClick={handleLogin}>
            Login with Github
          </Button>
        </Panel>
        <TextLink deemph external href='https://github.com/signup'>
          Need an account? Sign up
        </TextLink>
      </div>
    </LandingStyles>
  )
}
