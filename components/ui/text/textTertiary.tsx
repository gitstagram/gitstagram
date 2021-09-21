import React, { FC } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const TextTertiaryStyles = styled.p`
  color: ${theme('fontTertiary_Color')};
  font-size: ${theme('fontTertiary_FontSize')};
`

export const TextTertiary: FC<ComponentProps> = ({ children, ...props }) => {
  return <TextTertiaryStyles {...props}>{children}</TextTertiaryStyles>
}
