import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { Button as ReakitButton } from 'reakit/Button'
import { Icon, IconProps } from 'components/ui/icon/icon'
import { theme } from 'styles/themes'

type ButtonVariants = 'large' | IconProps | undefined

interface ButtonStyleProps {
  intent?: 'success'
  variant?: ButtonVariants
  isIconButton?: boolean
}

interface ButtonProps extends ComponentProps, ButtonStyleProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const ButtonStyles = styled(ReakitButton).withConfig({
  shouldForwardProp: (prop) => !['isIconButton'].includes(prop),
})<ButtonStyleProps>`
  padding: ${theme('sz4')} ${theme('sz12')};
  color: ${theme('fontButton_Color')};
  font-weight: bold;
  background-color: ${theme('intentPrimary_Color')};
  border: none;
  border-radius: ${theme('rounded_BorderRadius')};
  box-shadow: ${theme('button_BoxShadow')};
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${theme('intentPrimary_Color__Hover')};
  }

  &:active {
    background-color: ${theme('intentPrimary_Color__Active')};
  }

  ${({ variant }) =>
    variant === 'large' &&
    css`
      padding: ${theme('sz16')} ${theme('sz32')};
      font-weight: normal;
    `}

  ${({ isIconButton }) =>
    isIconButton &&
    css`
      height: fit-content;
      padding: ${theme('sz4')};
      color: ${theme('iconInput_Color')};
      line-height: 0;
      background: none;
      border-radius: ${theme('roundedNone')};
      box-shadow: none;

      &:hover,
      &:focus {
        color: ${theme('iconInput_Color__Hover')};
        background: none;
      }

      &:active {
        color: ${theme('iconInput_Color__Active')};
        background: none;
      }
    `}

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

  ${({ isIconButton, intent }) =>
    isIconButton &&
    intent === 'success' &&
    css`
      color: ${theme('intentSuccess_Color')};

      &:hover,
      &:focus {
        color: ${theme('intentSuccess_Color__Hover')};
      }

      &:active {
        color: ${theme('intentSuccess_Color__Active')};
      }
    `}
`

function isIconVariant(variant: ButtonVariants): variant is IconProps {
  return !!(variant && typeof variant === 'object' && variant?.icon)
}

export const Button: FC<ButtonProps> = ({ children, variant, ...props }) => {
  return (
    <ButtonStyles
      variant={variant}
      isIconButton={isIconVariant(variant)}
      {...props}
    >
      {isIconVariant(variant) ? <Icon {...variant} /> : children}
    </ButtonStyles>
  )
}
