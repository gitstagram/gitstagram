import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { theme } from 'styles/themes'

interface StyleProps {
  intent?: 'success'
  type?: 'large'
}

interface ButtonProps extends IComponentProps, StyleProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const ButtonStyles = styled.button<StyleProps>`
  color: ${theme('fontButton_Color')};
  border: none;
  border-radius: ${theme('rounded_BorderRadius')};
  box-shadow: ${theme('button_BoxShadow')};
  cursor: pointer;

  ${({ intent }) =>
    intent &&
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
