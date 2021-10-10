import React, { Fragment } from 'react'
import styled from 'styled-components'

type PreWrapProps = {
  str: string
}

const PreWrapStyles = styled.span`
  white-space: pre-wrap;
`

export const PreWrap = ({ str }: PreWrapProps): JSX.Element => {
  return (
    <PreWrapStyles>
      {str.split('\\n').map((item, index) => (
        <Fragment key={index}>
          {item}
          <br />
        </Fragment>
      ))}
    </PreWrapStyles>
  )
}
