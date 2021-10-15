import React, { FC } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const TextDeemphStyles = styled.p`
  color: ${theme('font_Color__Deemph')};
  font-size: ${theme('font_FontSize__Deemph')};
`

export const TextDeemph: FC<ComponentProps> = ({ children, ...props }) => {
  return <TextDeemphStyles {...props}>{children}</TextDeemphStyles>
}
