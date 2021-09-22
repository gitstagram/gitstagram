import React, { FC } from 'react'
import styled from 'styled-components'
import { Menu as ReakitMenu, MenuProps, MenuArrow } from 'reakit/Menu'
import { theme, themeProp } from 'styles/themes'
import { zIndicies } from 'components/ui/menu/zIndicies'

const MenuStyles = styled.div`
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

  [data-enter] & {
    transform: scaleY(1);
    opacity: 1;
  }

  .menu-arrow {
    top: -40px;
    z-index: ${zIndicies.menuItem};
    color: ${theme('base_BgColor')};
  }
`

export const Menu: FC<MenuProps> = ({
  children,
  className,
  ...props
}): JSX.Element => {
  return (
    <ReakitMenu className={className} {...props}>
      <MenuStyles>
        <MenuArrow {...props} className='menu-arrow' />
        {children}
      </MenuStyles>
    </ReakitMenu>
  )
}
