import React, { FC } from 'react'
import styled from 'styled-components'
import { themeConstant } from 'styles/themes'

const FromTabletLandscapeStyles = styled.div`
  position: absolute !important;
  display: none !important;

  ${themeConstant('media__TabletLandscape')} {
    position: inherit !important;
    display: inherit !important;
  }
`

export const FromTabletLandscape: FC<ComponentProps> = ({
  children,
  ...props
}) => {
  return (
    <FromTabletLandscapeStyles {...props}>{children}</FromTabletLandscapeStyles>
  )
}
