import React from 'react'
import styled from 'styled-components'
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
  z-index: ${zIndicies.menuItem};

  button&,
  a& {
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
  :first-child a {
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
    a& {
      background-color: ${theme('base_BgColor__Emph')};
    }
  }
`

function MenuItemBase(
  { as = 'button', className, highlighted, ...props }: MenuItemProps,
  ref: React.Ref<HTMLButtonElement>
): JSX.Element {
  return (
    <MenuItemStyles
      ref={ref}
      forwardedAs={as}
      className={cn(className, { highlighted })}
      {...props}
    />
  )
}

export const MenuItem = React.forwardRef(MenuItemBase)
