import React from 'react'
import styled, { css } from 'styled-components'
import { HEmboss, TextTertiary } from 'components/ui'
import { theme } from 'styles/themes'

type MistakeStylesProps = {
  expand?: boolean
}

const MistakeStyles = styled.div<MistakeStylesProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;

  .mistake {
    margin-bottom: ${theme('sz16')};
  }

  .mistake-description {
    max-width: 30ch;
  }

  .mistake-action {
    margin-top: ${theme('sz32')};
  }

  ${({ expand }) =>
    expand &&
    css`
      height: 100%;
    `}
`

type MistakeProps = MistakeStylesProps &
  BaseProps & {
    mistake: string
    mistakeDescription: string
  }

export const Mistake = ({
  children,
  mistake,
  mistakeDescription,
  expand,
  ...props
}: MistakeProps): JSX.Element => {
  return (
    <MistakeStyles expand={expand} {...props}>
      <HEmboss as='h3' className='mistake'>
        {mistake}
      </HEmboss>
      <TextTertiary className='mistake-description'>
        {mistakeDescription}
      </TextTertiary>
      {children && <div className='mistake-action'>{children}</div>}
    </MistakeStyles>
  )
}
