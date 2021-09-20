import React from 'react'
import styled, { css } from 'styled-components'
import { theme } from 'styles/themes'
import { BootstrapIcons } from 'components/ui/icon/types'

type BootstrapIconsId = `${BootstrapIcons}`

interface IconStyleProps {
  size?: 20 | 16
  clickable?: boolean
}

interface IconProps extends IComponentProps, IconStyleProps {
  icon: BootstrapIconsId
  ariaLabel: string
  filled?: boolean
}

const IconStyles = styled.i<IconStyleProps>`
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
  filled = false,
  size = 20,
  className,
  ...props
}: IconProps): JSX.Element => {
  const iconType = `bi-${icon}${filled ? '-fill' : ''}`
  const iconClassName = `${className} ${iconType}`
  return (
    <IconStyles
      className={iconClassName}
      role='img'
      aria-label={ariaLabel}
      size={size}
      {...props}
    />
  )
}
