import React, { FC } from 'react'
import styled, { css } from 'styled-components'
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
    border: none;
    cursor: pointer;
    background-color: ${theme('base_BgColor')};

    i {
      margin-right: ${theme('sz8')};
    }

    ${({ highlighted }) =>
      highlighted &&
      css`
        background-color: ${theme('base_BgColor__Emph')};
      `}

    &[aria-selected],
    &:hover,
    &:focus {
      background-color: ${theme('base_BgColor__Hover')};
    }

    &:active {
      background-color: ${theme('base_BgColor__Active')};
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
`

export const MenuItem: FC<MenuItemProps> = ({ as = 'button', ...props }) => {
  return <MenuItemStyles forwardedAs={as} {...props} />
}
