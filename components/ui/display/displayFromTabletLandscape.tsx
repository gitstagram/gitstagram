import React, { FC } from 'react'
import styled from 'styled-components'
import { themeConstant } from 'styles/themes'

const DisplayFromTabletLandscapeStyles = styled.div`
  position: absolute;
  display: none;

  ${themeConstant('media__TabletLandscape')} {
    position: inherit;
    display: inherit;
  }
`

export const DisplayFromTabletLandscape: FC<ComponentProps> = ({
  children,
  ...props
}) => {
  return (
    <DisplayFromTabletLandscapeStyles {...props}>
      {children}
    </DisplayFromTabletLandscapeStyles>
  )
}
