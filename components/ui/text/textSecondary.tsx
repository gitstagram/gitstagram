import React, { FC } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const TextSecondaryStyles = styled.p`
  color: ${theme('fontSecondary_Color')};
  font-weight: bold;
`

export const TextSecondary: FC<IComponentProps> = ({ children, ...props }) => {
  return <TextSecondaryStyles {...props}>{children}</TextSecondaryStyles>
}
