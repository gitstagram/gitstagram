import React, { FC } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const PanelStyles = styled.div`
  padding: ${theme('sz16')};
  background: ${theme('base_BgColor')};
  border-radius: ${theme('rounded_BorderRadius')};
  box-shadow: ${theme('panel_BoxShadow')};
`

export const Panel: FC<ComponentProps> = ({ children, ...props }) => {
  return <PanelStyles {...props}>{children}</PanelStyles>
}
