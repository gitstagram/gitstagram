import React, { FC } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const MiddotStyles = styled.span`
  margin-right: ${theme('sz12')};
  margin-left: ${theme('sz12')};
`

export const Middot: FC<IComponentProps> = ({ ...props }) => {
  return <MiddotStyles {...props}>&middot;</MiddotStyles>
}
