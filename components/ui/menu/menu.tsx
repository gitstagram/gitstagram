import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import {
  Menu as ReakitMenu,
  MenuProps as ReakitMenuProps,
  MenuArrow,
} from 'reakit/Menu'
import { theme } from 'styles/themes'
import { zIndicies } from 'styles/zIndicies'

interface MenuStylesProps {
  expand?: boolean
  arrowHighlighted?: boolean
  allowScroll?: boolean
}

const MenuStyles = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['arrowHighlighted', 'allowScroll', 'expand'].includes(prop),
})<MenuStylesProps>`
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
  transition: ${theme('trans_OpacityTransform')};

  [data-enter] & {
    transform: scaleY(1);
    opacity: 1;
  }

  .menu-arrow {
    top: -40px;
    z-index: ${zIndicies.menuArrow};
    color: ${theme('base_BgColor')};

    ${({ arrowHighlighted }) =>
      arrowHighlighted &&
      css`
        color: ${theme('base_BgColor__Hover')};
      `}
  }

  ${({ expand }) =>
    expand &&
    css`
      width: 100%;
    `}

  ${({ allowScroll }) =>
    allowScroll &&
    css`
      overflow: scroll;
    `}
`

type MenuProps = ReakitMenuProps &
  MenuStylesProps & {
    ariaLabel: string
    hasArrow?: boolean
  }

export const Menu: FC<MenuProps> = ({
  children,
  className,
  ariaLabel,
  hasArrow = true,
  expand,
  arrowHighlighted,
  allowScroll,
  ...props
}): JSX.Element => {
  return (
    <ReakitMenu aria-label={ariaLabel} {...props}>
      <MenuStyles
        className={className}
        expand={expand}
        arrowHighlighted={arrowHighlighted}
        allowScroll={allowScroll}
      >
        {hasArrow && <MenuArrow {...props} className='menu-arrow' />}
        {children}
      </MenuStyles>
    </ReakitMenu>
  )
}
