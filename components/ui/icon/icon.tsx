import React from 'react'
import styled, { css } from 'styled-components'
import { theme } from 'styles/themes'
import { BootstrapIcons } from 'components/ui/icon/types'

type BootstrapIconsId = `${BootstrapIcons}`

type IconStyleProps = {
  size?: 24 | 20 | 16 | 12
  clickable?: boolean
}

type ConditionalProps =
  | { ariaLabel: string; ariaHidden?: never }
  | { ariaLabel?: never; ariaHidden: true }

export type IconProps = ComponentProps &
  IconStyleProps &
  ConditionalProps & {
    icon: BootstrapIconsId
    filled?: boolean
  }

const IconStyles = styled.i<IconStyleProps>`
  ${({ size }) =>
    size === 24 &&
    css`
      font-size: ${theme('icn24')};
    `}

  ${({ size }) =>
    size === 20 &&
    css`
      font-size: ${theme('icn20')};
    `}

  ${({ size }) =>
    size === 16 &&
    css`
      font-size: ${theme('icn16')};
    `}

  ${({ size }) =>
    size === 12 &&
    css`
      font-size: ${theme('icn12')};
    `}

  ${({ clickable }) =>
    clickable &&
    css`
      color: inherit;
      text-decoration: none;
      cursor: pointer;
    `}
`

export const Icon = ({
  icon,
  ariaLabel,
  ariaHidden,
  filled = false,
  size = 20,
  className,
  ...props
}: IconProps): JSX.Element => {
  const iconType = `bi-${icon}${filled ? '-fill' : ''}`
  const iconClassName = `${className ? className : ''} ${iconType}`

  return (
    <IconStyles
      className={iconClassName}
      role='img'
      aria-label={ariaLabel}
      aria-hidden={ariaHidden ? 'true' : undefined}
      size={size}
      {...props}
    />
  )
}
