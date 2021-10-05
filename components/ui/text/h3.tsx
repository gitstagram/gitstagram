import React, { FC } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const H3Styles = styled.h3`
  color: ${theme('fontH3_Color')};
  font-weight: ${theme('fontH3_FontWeight')};
  font-size: ${theme('fontH3_FontSize')};
`

export const H3: FC<ComponentProps> = ({ children, ...props }) => {
  return <H3Styles {...props}>{children}</H3Styles>
}
