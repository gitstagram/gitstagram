import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { theme } from 'styles/themes'

type TextDeemphStylesProps = {
  fontSize?: 'normal' | 'deemph'
}
type TextDeemphProps = ComponentProps & TextDeemphStylesProps

const TextDeemphStyles = styled.p<TextDeemphStylesProps>`
  color: ${theme('font_Color__Deemph')};

  ${({ fontSize }) =>
    fontSize === 'deemph' &&
    css`
      font-size: ${theme('font_FontSize__Deemph')};
    `}
`

export const TextDeemph: FC<TextDeemphProps> = ({
  children,
  fontSize = 'deemph',
  ...props
}) => {
  return (
    <TextDeemphStyles {...props} fontSize={fontSize}>
      {children}
    </TextDeemphStyles>
  )
}
