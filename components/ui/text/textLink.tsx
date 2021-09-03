import React, { FC, ReactHTML } from 'react'
import Link, { LinkProps } from 'next/link'
import type { UrlObject } from 'url'
import styled, { css } from 'styled-components'
import { theme } from 'styles/themes'

type Url = string | UrlObject
type StyleProps = { deemph?: boolean }

type ConditionalProps =
  | { external: true; as?: never; onClick?: never; href: string }
  | {
      external?: never
      as?: Omit<keyof ReactHTML, 'button'>
      onClick?: never
      href: Url
    }
  | {
      external?: never
      as: 'button'
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
      href?: never
    }

type TextLinkProps = IComponentProps &
  Omit<LinkProps, 'as' | 'href' | 'passHref'> &
  ConditionalProps &
  StyleProps

const TextLinkStyles = styled.a<StyleProps>`
  color: ${theme('fontLink_Color')};

  &:hover,
  &:focus {
    color: ${theme('fontLink_Color__Hover')};
  }

  &:active {
    color: ${theme('fontLink_Color__Active')};
  }

  ${({ deemph }) =>
    deemph &&
    css`
      font-size: ${theme('fontLink_FontSize__Deemph')};
      color: ${theme('fontLink_Color__Deemph')};

      &:hover,
      &:focus {
        color: ${theme('fontLink_Color__Deemph_Hover')};
      }

      &:active {
        color: ${theme('fontLink_Color__Deemph_Active')};
      }
    `}
`

export const TextLink: FC<TextLinkProps> = ({
  children,
  as = 'a',
  external,
  href,
  onClick,
  ...props
}) => {
  const { prefetch, replace, scroll, shallow, locale, ...otherProps } = props
  const nextLinkProps = { prefetch, replace, scroll, shallow, locale }

  if (external) {
    return (
      <TextLinkStyles
        href={href as string}
        target='_blank'
        rel='noreferrer'
        {...otherProps}
      >
        {children}
      </TextLinkStyles>
    )
  } else if (as === 'button') {
    return (
      <TextLinkStyles as='button' onClick={onClick} {...otherProps}>
        {children}
      </TextLinkStyles>
    )
  } else {
    return (
      <Link passHref href={href as Url} {...nextLinkProps}>
        <TextLinkStyles as={as as keyof ReactHTML} {...otherProps}>
          {children}
        </TextLinkStyles>
      </Link>
    )
  }
}
