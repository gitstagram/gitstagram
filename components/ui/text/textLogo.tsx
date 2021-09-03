import React, { FC } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const TextLogoStyles = styled.h1`
  color: ${theme('fontLogo_Color')};
  font-weight: normal;
  font-size: ${theme('fontLogo_FontSize')};
  font-family: ${theme('fontLogo_Family')};
  letter-spacing: ${theme('fontLogo_LetterSpacing')};
`

export const TextLogo: FC<IComponentProps> = ({ children, ...props }) => {
  return <TextLogoStyles {...props}>{children}</TextLogoStyles>
}
