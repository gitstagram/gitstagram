import React, { FC } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const TextCodeStyles = styled.code`
  background-color: ${theme('fontCode_BgColor')};
  color: ${theme('fontCode_Color')};
`

export const TextCode: FC<IComponentProps> = ({ children, ...props }) => {
  return <TextCodeStyles {...props}>`{children}`</TextCodeStyles>
}
