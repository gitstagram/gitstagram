import React, { FC } from 'react'
import Link from 'next/link'
import type { UrlObject } from 'url'
import styled, { css } from 'styled-components'
import { theme } from 'styles/themes'

type Url = string | UrlObject
interface TextLogoStyleProps {
  size?: 'small' | 'large'
  href?: Url
}

const TextLogoStyles = styled.h1<TextLogoStyleProps>`
  color: ${theme('fontLogo_Color')};
  font-weight: ${theme('fontLogo_FontWeight')};
  font-size: ${theme('fontLogo_FontSize__Small')};
  font-family: ${theme('fontLogo_Family')};
  letter-spacing: ${theme('fontLogo_LetterSpacing')};

  ${({ size }) =>
    size === 'large' &&
    css`
      font-size: ${theme('fontLogo_FontSize__Large')};
    `}

  ${({ href }) =>
    href &&
    css`
      text-decoration: none;

      &:hover,
      &:focus {
        text-shadow: ${theme('logo_TextShadow__Hover')};
      }

      &:active {
        text-shadow: ${theme('logo_TextShadow__Active')};
      }
    `}
`

interface TextLogoProps extends ComponentProps, TextLogoStyleProps {
  href?: Url
}

export const TextLogo: FC<TextLogoProps> = ({
  href,
  size = 'small',
  ...props
}) => {
  return href ? (
    <Link href={href} passHref>
      <TextLogoStyles as='a' href={href} size={size} {...props}>
        Gitstagram
      </TextLogoStyles>
    </Link>
  ) : (
    <TextLogoStyles size={size} {...props}>
      Gitstagram
    </TextLogoStyles>
  )
}
