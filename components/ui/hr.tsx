import React from 'react'
import styled, { css } from 'styled-components'
import { Separator } from 'reakit/Separator'
import { theme } from 'styles/themes'

type HrStylesProps = {
  deemph?: boolean
  dim?: boolean
}

type HrProps = HrStylesProps & BaseProps

const HrStyles = styled(Separator).withConfig({
  shouldForwardProp: (prop) => !['dim', 'deemph'].includes(prop),
})<HrStylesProps>`
  border-color: ${theme('hr_BorderColor')};

  ${({ deemph }) =>
    deemph &&
    css`
      border-color: ${theme('hr_BorderColor__Deemph')};
      opacity: 0.5;
    `}

  ${({ dim }) =>
    dim &&
    css`
      opacity: 0.5;
    `}
`

export const Hr = (props: HrProps): JSX.Element => {
  return <HrStyles {...props} />
}
