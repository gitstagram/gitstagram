import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import {
  Menu as ReakitMenu,
  MenuProps as ReakitMenuProps,
  MenuArrow,
} from 'reakit/Menu'
import { theme, themeProp } from 'styles/themes'
import { zIndicies } from 'components/ui/menu/zIndicies'

interface MenuStylesProps {
  expand?: boolean
}

const MenuStyles = styled.div<MenuStylesProps>`
  @media screen and (prefers-reduced-motion: reduce) {
    transition: none;
  }

  display: flex;
  flex-direction: column;
  width: ${theme('sz192')};
  background-color: ${theme('base_BgColor')};
  border-radius: ${theme('rounded_BorderRadius')};
  box-shadow: ${theme('panel_BoxShadow')};
  transform: scaleY(0.5);
  transform-origin: top center;
  opacity: 0;
  transition: ${themeProp('trans_OpacityTransform')};
  overflow: scroll;

  [data-enter] & {
    transform: scaleY(1);
    opacity: 1;
  }

  .menu-arrow {
    top: -40px;
    z-index: ${zIndicies.menuItem};
    color: ${theme('base_BgColor')};
  }

  ${({ expand }) =>
    expand &&
    css`
      width: 100%;
    `}
`

type MenuProps = ReakitMenuProps & {
  ariaLabel: string
  hasArrow?: boolean
  expand?: boolean
}

export const Menu: FC<MenuProps> = ({
  children,
  className,
  ariaLabel,
  hasArrow = true,
  expand,
  ...props
}): JSX.Element => {
  return (
    <ReakitMenu aria-label={ariaLabel} {...props}>
      <MenuStyles className={className} expand={expand}>
        {hasArrow && <MenuArrow {...props} className='menu-arrow' />}
        {children}
      </MenuStyles>
    </ReakitMenu>
  )
}
