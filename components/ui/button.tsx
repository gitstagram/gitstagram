import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { theme } from 'styles/themes'

interface ButtonStyleProps {
  intent?: 'success'
  type?: 'large'
}

interface ButtonProps extends IComponentProps, ButtonStyleProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const ButtonStyles = styled.button<ButtonStyleProps>`
  color: ${theme('fontButton_Color')};
  border: none;
  border-radius: ${theme('rounded_BorderRadius')};
  box-shadow: ${theme('button_BoxShadow')};
  cursor: pointer;

  ${({ intent }) =>
    intent === 'success' &&
    css`
      background-color: ${theme('intentSuccess_Color')};

      &:hover,
      &:focus {
        background-color: ${theme('intentSuccess_Color__Hover')};
      }

      &:active {
        background-color: ${theme('intentSuccess_Color__Active')};
      }
    `}

  ${({ type }) =>
    type === 'large' &&
    css`
      padding: ${theme('sz16')} ${theme('sz32')};
    `}
`

export const Button: FC<ButtonProps> = ({
  children,
  intent = 'success',
  ...props
}) => {
  return (
    <ButtonStyles intent={intent} {...props}>
      {children}
    </ButtonStyles>
  )
}
