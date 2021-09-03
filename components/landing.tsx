import React from 'react'
import styled from 'styled-components'
import { signIn } from 'next-auth/client'
import { theme } from 'styles/themes'

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

const LandingStyles = styled.div`
  flex-grow: 1;
  text-align: center;

  .logo {
    margin-bottom: ${theme('sz16')};
  }

  .hero {
    margin-bottom: ${theme('sz24')};
  }

  .benefit-list {
    width: fit-content;
    margin-right: auto;
    margin-bottom: ${theme('sz24')};
    margin-left: auto;
    text-align: left;

    li {
      margin-bottom: ${theme('sz4')};
    }
  }

  .login-panel {
    margin-bottom: ${theme('sz4')};
  }

  .explain-title {
    margin-bottom: ${theme('sz4')};
  }

  .explain-list {
    margin-bottom: ${theme('sz32')};
    text-align: left;
    list-style: circle;
    list-style-position: inside;
  }

  .login {
    width: calc(${theme('sz16')} * 2 + 100%);
    margin: calc(${theme('sz16')} * -1);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`

export const Landing = (): JSX.Element => {
  const handleLogin = (): void => {
    void signIn('github')
  }

  return (
    <LandingStyles>
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
    </LandingStyles>
  )
}
