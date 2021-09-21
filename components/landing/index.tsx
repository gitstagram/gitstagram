import React from 'react'
import Image from 'next/image'
import { signIn } from 'next-auth/client'
import { LandingStyles } from 'components/landing/styles'

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
  NextImgWrapper,
  DisplayFromTabletLandscape,
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
        <DisplayFromTabletLandscape className='mobile-preview'>
          <div className='mobile-content'>
            <NextImgWrapper>
              <Image
                src='/mobileContent.jpeg'
                alt='Gitstagram photo sharing app'
                layout='fill'
              />
            </NextImgWrapper>
          </div>
          <NextImgWrapper>
            <Image src='/mobileFrame.png' alt='iPhone frame' layout='fill' />
          </NextImgWrapper>
        </DisplayFromTabletLandscape>
        <Panel className='login-panel'>
          <TextAttn className='explain-title'>How it works:</TextAttn>
          <ul className='explain-list'>
            <li>Creates repo if none exists</li>
            <li>
              <TextCode>gitstagram-library</TextCode>
            </li>
            <li>Actions self-contained to repo</li>
          </ul>
          <TextLink
            className='sign-up'
            deemph
            external
            href='https://github.com/signup'
          >
            Need an account? Sign up
          </TextLink>
          <Button
            className='login'
            variant='large'
            intent='success'
            onClick={handleLogin}
          >
            Login with Github
          </Button>
        </Panel>
      </div>
    </LandingStyles>
  )
}
