import React, { FC } from 'react'
import styled from 'styled-components'

const TextStyles = styled.p``

export const Text: FC<IComponentProps> = ({ children, ...props }) => {
  return <TextStyles {...props}>{children}</TextStyles>
}
