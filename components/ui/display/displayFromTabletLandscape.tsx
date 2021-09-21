import React, { FC } from 'react'
import styled from 'styled-components'
import { themeProp } from 'styles/themes'

const DisplayFromTabletLandscapeStyles = styled.div`
  position: absolute;
  display: none;

  @media ${themeProp('media_TabletLandscape')} {
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
