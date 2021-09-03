import React, { FC } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const TextHeroStyles = styled.h1`
  color: ${theme('intentPrimary_Color')};
  font-size: ${theme('fontHero_FontSize')};
`

export const TextHero: FC<IComponentProps> = ({ children, ...props }) => {
  return <TextHeroStyles {...props}>{children}</TextHeroStyles>
}
