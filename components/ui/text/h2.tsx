import React from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const H2Styles = styled.h2`
  color: ${theme('fontH2_Color')};
  font-weight: ${theme('fontH2_Weight')};
  font-size: ${theme('fontH2_FontSize')};
`

function H2Base(
  { children, ...props }: ComponentProps,
  ref: React.Ref<HTMLHeadingElement>
): JSX.Element {
  return (
    <H2Styles {...props} ref={ref}>
      {children}
    </H2Styles>
  )
}

export const H2 = React.forwardRef(H2Base)
