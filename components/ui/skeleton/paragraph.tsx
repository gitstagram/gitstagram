import React from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const SkeletonParagraphStyles = styled.div`
  .glb-skeleton {
    height: ${theme('sz16')};
    margin-bottom: ${theme('sz8')};
  }

  .long {
    width: 80%;
  }

  .medium {
    width: 50%;
  }
`

export const SkeletonParagraph = ({ ...props }: BaseProps): JSX.Element => {
  return (
    <SkeletonParagraphStyles {...props}>
      <div className='long glb-skeleton' />
      <div className='long glb-skeleton' />
      <div className='medium glb-skeleton' />
      <div className='medium glb-skeleton' />
    </SkeletonParagraphStyles>
  )
}
