import React, { FC } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const TextCodeStyles = styled.code`
  color: ${theme('fontCode_Color')};
  background-color: ${theme('fontCode_BgColor')};
`

export const TextCode: FC<IComponentProps> = ({ children, ...props }) => {
  return <TextCodeStyles {...props}>`{children}`</TextCodeStyles>
}
