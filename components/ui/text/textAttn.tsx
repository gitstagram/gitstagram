import React, { FC } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const TextAttnStyles = styled.p`
  color: ${theme('fontAttn_Color')};
  font-weight: ${theme('fontAttn_FontWeight')};
  font-size: ${theme('fontAttn_FontSize')};
  text-transform: ${theme('fontAttn_TextTransform')};
`

export const TextAttn: FC<ComponentProps> = ({ children, ...props }) => {
  return <TextAttnStyles {...props}>{children}</TextAttnStyles>
}
