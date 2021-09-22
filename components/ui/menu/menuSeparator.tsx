import React, { FC } from 'react'
import styled from 'styled-components'
import {
  MenuSeparator as ReakitMenuSeparator,
  MenuSeparatorProps,
} from 'reakit/Menu'
import { theme } from 'styles/themes'

const MenuSeparatorStyles = styled(ReakitMenuSeparator)`
  width: 100%;
  margin-top: ${theme('sz4')};
  margin-bottom: ${theme('sz4')};
  opacity: 0.1;
`

export const MenuSeparator: FC<MenuSeparatorProps> = ({ ...props }) => {
  return <MenuSeparatorStyles {...props} />
}
