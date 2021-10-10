import React from 'react'
import styled, { css } from 'styled-components'
import {
  Menu as ReakitMenu,
  MenuProps as ReakitMenuProps,
  MenuArrow,
} from 'reakit/Menu'
import { theme } from 'styles/themes'
import { zIndicies } from 'styles/zIndicies'

interface MenuStylesProps {
  arrowHighlighted?: boolean
  allowScroll?: boolean
}

const MenuStyles = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['arrowHighlighted', 'allowScroll'].includes(prop),
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
  transform: scaleY(0);
  transform-origin: top center;
  opacity: 0;
  transition: ${theme('trans_OpacityTransform')};

  [data-enter] & {
    transform: scaleY(1);
    opacity: 1;
  }

  [data-leave] & {
    visibility: hidden;
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

  ${({ allowScroll }) =>
    allowScroll &&
    css`
      overflow: scroll;
    `}
`

type MenuProps = ReakitMenuProps &
  MenuStylesProps &
  BaseProps & {
    ariaLabel: string
    hasArrow?: boolean
  }

export const Menu = ({
  children,
  className,
  ariaLabel,
  hasArrow = true,
  arrowHighlighted,
  allowScroll,
  ...props
}: MenuProps): JSX.Element => {
  const Arrow = hasArrow && (
    <MenuArrow {...props} key='arrow' className='menu-arrow' />
  )
  const [first, ...rest] = children as React.ReactNode[]

  return (
    <ReakitMenu aria-label={ariaLabel} {...props}>
      <MenuStyles
        className={className}
        arrowHighlighted={arrowHighlighted}
        allowScroll={allowScroll}
      >
        {[first, Arrow, ...rest]}
      </MenuStyles>
    </ReakitMenu>
  )
}
