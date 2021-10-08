/* eslint-disable */
import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import cn from 'classnames'
import {
  MenuItem as ReakitMenuItem,
  MenuItemProps as ReakitMenuItemProps,
} from 'reakit/Menu'
import { As } from 'reakit-utils/types'
import { theme } from 'styles/themes'
import { zIndicies } from 'styles/zIndicies'

type MenuItemStylesProps = {
  highlighted?: boolean
}
type MenuItemProps = ReakitMenuItemProps & MenuItemStylesProps & { as?: As }

const MenuItemStyles = styled(ReakitMenuItem).withConfig({
  shouldForwardProp: (prop) => !['highlighted'].includes(prop),
})<MenuItemStylesProps>`
  button&,
  a {
    z-index: ${zIndicies.menuItem};
    display: flex;
    flex-shrink: 0;
    align-items: center;
    padding: ${theme('sz8')} ${theme('sz12')};
    color: ${theme('font_Color')};
    text-decoration: none;
    background-color: ${theme('base_BgColor')};
    border: none;
    cursor: pointer;

    i {
      margin-right: ${theme('sz8')};
    }

    &[aria-selected],
    &:hover,
    &:focus {
      background-color: ${theme('base_BgColor__Hover')} !important;
    }

    &:active {
      background-color: ${theme('base_BgColor__Active')} !important;
    }
  }

  :first-child,
  :first-child a,
  :nth-child(2),
  :nth-child(2) a {
    border-radius: ${theme('rounded_BorderRadius')}
      ${theme('rounded_BorderRadius')} 0 0;
  }

  :last-child,
  :last-child a {
    border-radius: ${theme('roundedNone')} ${theme('roundedNone')}
      ${theme('rounded_BorderRadius')} ${theme('rounded_BorderRadius')};
  }

  :only-child {
    border-radius: ${theme('rounded_BorderRadius')};
  }

  &.highlighted {
    a {
      background-color: ${theme('base_BgColor__Emph')};
    }
  }
`

export const MenuItem: FC<MenuItemProps> = ({
  as = 'button',
  className,
  highlighted,
  ...props
}) => {
  return (
    <MenuItemStyles
      forwardedAs={as}
      className={cn(className, { highlighted })}
      {...props}
    />
  )
}
