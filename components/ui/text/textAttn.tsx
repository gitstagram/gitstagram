import React, { FC } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const TextAttnStyles = styled.p`
  color: ${theme('fontAttn_Color')};
  font-weight: bold;
  font-size: ${theme('fontAttn_FontSize')};
  text-transform: uppercase;
`

export const TextAttn: FC<IComponentProps> = ({ children, ...props }) => {
  return <TextAttnStyles {...props}>{children}</TextAttnStyles>
}
