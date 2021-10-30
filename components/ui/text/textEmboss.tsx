import React from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const TextEmbossStyles = styled.p`
  color: ${theme('fontTextEmboss_Color')};
  text-shadow: ${theme('textEmboss_TextShadow')};
`

export const TextEmboss = ({
  children,
  ...props
}: ComponentProps): JSX.Element => {
  return <TextEmbossStyles {...props}>{children}</TextEmbossStyles>
}
