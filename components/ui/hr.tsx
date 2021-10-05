import React from 'react'
import styled, { css } from 'styled-components'
import { theme } from 'styles/themes'

type HrStylesProps = {
  deemph?: boolean
}

type HrProps = HrStylesProps & BaseProps

const HrStyles = styled.hr<HrStylesProps>`
  border-color: ${theme('hr_BorderColor')};

  ${({ deemph }) =>
    deemph &&
    css`
      border-color: ${theme('hr_BorderColor__Deemph')};
      opacity: 0.5;
    `}
`

export const Hr = (props: HrProps): JSX.Element => {
  return <HrStyles {...props} />
}
