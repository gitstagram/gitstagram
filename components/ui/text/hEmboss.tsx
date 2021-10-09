import React from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const HEmbossStyles = styled.h2`
  color: ${theme('fontEmboss_Color')};
  font-weight: ${theme('fontEmboss_FontWeight')};
  font-size: ${theme('fontEmboss_FontSize')};
  text-shadow: 3px -3px 0 ${theme('fontEmboss_ShadowColor')};
`

export const HEmboss = ({
  children,
  ...props
}: ComponentProps): JSX.Element => {
  return <HEmbossStyles {...props}>{children}</HEmbossStyles>
}
