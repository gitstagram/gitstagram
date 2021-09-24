import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { TextLogo } from 'components/ui'
import { theme } from 'styles/themes'

const transitionDelay = 1500
const transitionDuration = 1000
const hideVisibilityAfter = transitionDelay + transitionDuration

type OverlayProps = {
  loading: boolean
}

type OverlayStylesProps = OverlayProps & {
  visibility: boolean
}

const OverlayStyles = styled.div.withConfig({
  shouldForwardProp: (prop) => !['loading', 'visibility'].includes(prop),
})<OverlayStylesProps>`
  @media screen and (prefers-reduced-motion: reduce) {
    transition: none;
  }

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme('root_Bg')};
  animation-name: backgroundColorPalette;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  transition-property: opacity;
  transition-delay: ${transitionDelay}ms;
  transition-duration: ${transitionDuration}ms;
  transition-timing-function: ease-in-out;
  opacity: 1;
  visibility: visible;

  @keyframes backgroundColorPalette {
    0% {
      background: ${theme('root_Bg__Gradient1')};
    }

    50% {
      background: ${theme('root_Bg__Gradient2')};
    }

    100% {
      background: ${theme('root_Bg__Gradient1')};
    }
  }

  .overlay-logo {
    text-shadow: 0 -2px 0 rgba(255, 255, 255, 0.5);
    opacity: 0.3;
  }

  ${({ loading }) =>
    !loading &&
    css`
      opacity: 0;
    `}

  ${({ visibility }) =>
    visibility === false &&
    css`
      visibility: hidden;
    `}
`

export const Overlay = ({ loading }: OverlayProps): JSX.Element => {
  const [visibility, setVisibility] = useState<boolean>(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) setVisibility(false)
    }, hideVisibilityAfter)

    return () => clearTimeout(timer)
  }, [loading])

  return (
    <OverlayStyles
      loading={loading}
      aria-hidden={!loading}
      visibility={visibility}
    >
      <TextLogo className='overlay-logo'>Gitstagram</TextLogo>
    </OverlayStyles>
  )
}
