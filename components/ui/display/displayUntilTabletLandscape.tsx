import React, { FC } from 'react'
import styled from 'styled-components'
import { themeProp } from 'styles/themes'

const DisplayUntilTabletLandscapeStyles = styled.div`
  @media ${themeProp('media_TabletLandscape')} {
    position: absolute;
    display: none;
  }
`

export const DisplayUntilTabletLandscape: FC<IComponentProps> = ({
  children,
  ...props
}) => {
  return (
    <DisplayUntilTabletLandscapeStyles {...props}>
      {children}
    </DisplayUntilTabletLandscapeStyles>
  )
}
