import React from 'react'
import styled, { css } from 'styled-components'
import { theme } from 'styles/themes'
import { BootstrapIcons } from './types'

type BootstrapIconsId = `${BootstrapIcons}`

interface IconStyleProps {
  size?: 24 | 16
}

interface IconProps extends IComponentProps, IconStyleProps {
  icon: BootstrapIconsId
  ariaLabel: string
  filled?: boolean
}

const IconStyles = styled.i<IconStyleProps>`
  ${({ size }) =>
    size === 24 &&
    css`
      font-size: ${theme('sz24')};
    `}

  ${({ size }) =>
    size === 16 &&
    css`
      font-size: ${theme('sz16')};
    `}
`

export const Icon = ({
  icon,
  ariaLabel,
  filled = false,
  size = 24,
  ...props
}: IconProps): JSX.Element => {
  return (
    <IconStyles
      className={`bi-${icon}${filled ? '-fill' : ''}`}
      role='img'
      aria-label={ariaLabel}
      size={size}
      {...props}
    />
  )
}
