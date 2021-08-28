import React from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const LandingStyles = styled.div`
  position: relative;
  flex-grow: 1;
`

const Hero = styled.h1`
  font-size: ${theme('fontHero_FontSize')};
  font-family: ${theme('fontLogo_Family')};
  text-align: center;
`

export const Landing = (): JSX.Element => {
  return (
    <LandingStyles>
      <Hero>Gitstagram</Hero>
    </LandingStyles>
  )
}
