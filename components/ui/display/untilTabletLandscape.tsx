import React, { FC } from 'react'
import styled from 'styled-components'
import { themeConstant } from 'styles/themes'

const UntilTabletLandscapeStyles = styled.div`
  ${themeConstant('media__TabletLandscape')} {
    position: absolute !important;
    display: none !important;
  }
`

export const UntilTabletLandscape: FC<ComponentProps> = ({
  children,
  ...props
}) => {
  return (
    <UntilTabletLandscapeStyles {...props}>
      {children}
    </UntilTabletLandscapeStyles>
  )
}
