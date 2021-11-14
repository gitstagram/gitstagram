import React, { Fragment } from 'react'
import styled from 'styled-components'

type PreWrapProps = {
  str: string
}

const PreWrapStyles = styled.span`
  white-space: pre-wrap;
`

export const PreWrap = ({ str }: PreWrapProps): JSX.Element => {
  const lineBrokenParts = str.split('\n')
  return (
    <PreWrapStyles>
      {lineBrokenParts.map((item, index) => (
        <Fragment key={index}>
          {item}
          {index !== lineBrokenParts.length - 1 && <br />}
        </Fragment>
      ))}
    </PreWrapStyles>
  )
}
