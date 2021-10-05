import React, { FC } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const H2Styles = styled.h2`
  color: ${theme('fontH2_Color')};
  font-weight: ${theme('fontH2_Weight')};
  font-size: ${theme('fontH2_FontSize')};
`

export const H2: FC<ComponentProps> = ({ children, ...props }) => {
  return <H2Styles {...props}>{children}</H2Styles>
}
