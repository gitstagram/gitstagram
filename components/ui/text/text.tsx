import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { theme } from 'styles/themes'

type TextStylesProps = {
  deemph?: boolean
}

type TextProps = ComponentProps & TextStylesProps

const TextStyles = styled.p<TextStylesProps>`
  ${({ deemph }) =>
    deemph &&
    css`
      color: ${theme('font_Color__Deemph')};
      font-size: ${theme('font_FontSize__Deemph')};
    `}
`

export const Text: FC<TextProps> = ({ children, ...props }) => {
  return <TextStyles {...props}>{children}</TextStyles>
}
