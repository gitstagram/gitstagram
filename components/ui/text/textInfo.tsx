import React, { FC } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const TextInfoStyles = styled.p`
  color: ${theme('fontInfo_Color')};
  font-size: ${theme('fontInfo_FontSize')};
  font-style: ${theme('fontInfo_FontStyle')};
`

export const TextInfo: FC<ComponentProps> = ({ children, ...props }) => {
  return <TextInfoStyles {...props}>{children}</TextInfoStyles>
}
