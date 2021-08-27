import React from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const FooterStyles = styled.footer`
  color: ${theme('fontTertiary_Color')};
  font-size: ${theme('fontTertiary_Size')};
  text-align: center;
`

export const Footer = (): JSX.Element => {
  return <FooterStyles>❤ Gitstagram, {new Date().getFullYear()}</FooterStyles>
}
