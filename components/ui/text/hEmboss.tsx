import React from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const HEmbossStyles = styled.h2`
  color: ${theme('fontHEmboss_Color')};
  font-weight: ${theme('fontHEmboss_FontWeight')};
  font-size: ${theme('fontHEmboss_FontSize')};
  text-shadow: ${theme('hEmboss_TextShadow')};
`

export const HEmboss = ({
  children,
  ...props
}: ComponentProps): JSX.Element => {
  return <HEmbossStyles {...props}>{children}</HEmbossStyles>
}
