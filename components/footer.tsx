import React from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const FooterStyles = styled.footer`
  font-size: ${theme('fontTertiary_Size')};
  color: ${theme('fontTertiary_Color')};
  text-align: center;
`

export const Footer = (): JSX.Element => {
  return <FooterStyles>❤ Gitstagram, {new Date().getFullYear()}</FooterStyles>
}
