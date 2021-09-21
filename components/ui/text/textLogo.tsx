import React, { FC } from 'react'
import Link from 'next/link'
import type { UrlObject } from 'url'
import styled, { css } from 'styled-components'
import { theme } from 'styles/themes'

type Url = string | UrlObject
interface TextLogoStyleProps {
  size?: 'small'
  href?: Url
}

const TextLogoStyles = styled.h1<TextLogoStyleProps>`
  color: ${theme('fontLogo_Color')};
  font-weight: normal;
  font-size: ${theme('fontLogo_FontSize')};
  font-family: ${theme('fontLogo_Family')};
  letter-spacing: ${theme('fontLogo_LetterSpacing')};

  ${({ size }) =>
    size === 'small' &&
    css`
      font-size: ${theme('fontLogo_FontSize__Small')};
    `}

  ${({ href }) =>
    href &&
    css`
      text-decoration: none;

      &:hover,
      &:focus {
        text-shadow: 0 0 2px ${theme('fontLogo_Color__Emboss')};
      }

      &:active {
        text-shadow: 0 0 5px ${theme('fontLogo_Color__Emboss')};
      }
    `}
`

interface TextLogoProps extends ComponentProps, TextLogoStyleProps {
  href?: Url
}

export const TextLogo: FC<TextLogoProps> = ({ children, href, ...props }) => {
  return href ? (
    <Link href={href} passHref>
      <TextLogoStyles as='a' href={href} {...props}>
        {children}
      </TextLogoStyles>
    </Link>
  ) : (
    <TextLogoStyles {...props}>{children}</TextLogoStyles>
  )
}
