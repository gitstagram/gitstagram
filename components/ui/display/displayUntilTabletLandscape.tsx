import React, { FC } from 'react'
import styled from 'styled-components'
import { themeConstant } from 'styles/themes'

const DisplayUntilTabletLandscapeStyles = styled.div`
  ${themeConstant('media__TabletLandscape')} {
    position: absolute;
    display: none;
  }
`

export const DisplayUntilTabletLandscape: FC<ComponentProps> = ({
  children,
  ...props
}) => {
  return (
    <DisplayUntilTabletLandscapeStyles {...props}>
      {children}
    </DisplayUntilTabletLandscapeStyles>
  )
}
