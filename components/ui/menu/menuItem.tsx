import React, { FC } from 'react'
import styled from 'styled-components'
import { MenuItem as ReakitMenuItem, MenuItemProps } from 'reakit/Menu'
import { As } from 'reakit-utils/types'
import { theme } from 'styles/themes'
import { zIndicies } from 'components/ui/menu/zIndicies'

const MenuItemStyles = styled(ReakitMenuItem)`
  button&,
  a {
    z-index: ${zIndicies.menuItem};
    display: flex;
    align-items: center;
    padding: ${theme('sz8')} ${theme('sz12')};
    color: ${theme('font_Color')};
    text-decoration: none;

    i {
      margin-right: ${theme('sz8')};
    }

    &:hover,
    &:focus {
      background-color: ${theme('base_BgColor__Hover')};
    }

    &:active {
      background-color: ${theme('base_BgColor__Active')};
    }
    border: none;
    cursor: pointer;
  }

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
`

export const MenuItem: FC<MenuItemProps & { as?: As }> = ({
  as = 'button',
  ...props
}) => {
  return <MenuItemStyles forwardedAs={as} {...props} />
}
