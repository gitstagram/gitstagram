import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import cn from 'classnames'
import { Button as ReakitButton } from 'reakit/Button'
import { Icon, IconProps } from 'components/ui/icon/icon'
import { theme } from 'styles/themes'

type ButtonVariants = 'large' | 'naked' | IconProps | undefined
type ButtonOnClick = (e: React.MouseEvent<HTMLButtonElement>) => void

type ButtonStyleProps = {
  intent?: 'success' | 'success-invert' | 'warning-invert'
  variant?: ButtonVariants
  isIconButton?: boolean
  disabled?: boolean
  loading?: boolean
  icon?: IconProps
}

type ConditionalProps =
  | { onClick: ButtonOnClick; href?: never }
  | { onClick?: never; href: string; as: 'a' }
  | { variant: IconProps; icon?: never }

type ButtonProps = ComponentProps & ButtonStyleProps & ConditionalProps

const ButtonStyles = styled(ReakitButton).withConfig({
  shouldForwardProp: (prop) => !['isIconButton'].includes(prop),
})<ButtonStyleProps>`
  padding: ${theme('sz4')} ${theme('sz16')};
  color: ${theme('fontButton_Color')};
  font-weight: ${theme('fontButton_FontWeight')};
  background-color: ${theme('intentPrimary_Color')};
  border: none;
  border-radius: ${theme('rounded_BorderRadius')};
  box-shadow: ${theme('button_BoxShadow')};
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover,
  &:focus {
    background-color: ${theme('intentPrimary_Color__Hover')};
  }

  &:active {
    background-color: ${theme('intentPrimary_Color__Active')};
  }

  &:disabled {
    color: ${theme('intentDisabled_Color__Accent')};
    background-color: ${theme('intentDisabled_Color')};
  }

  ${({ variant }) =>
    variant === 'large' &&
    css`
      padding: ${theme('sz16')} ${theme('sz32')};
      font-weight: ${theme('fontButton_FontWeight__Large')};
    `}

  ${({ variant }) =>
    variant === 'naked' &&
    css`
      color: ${theme('intentNaked_Color')};
      background: none;
      border-radius: none;
      box-shadow: none;

      &:hover,
      &:focus {
        color: ${theme('intentNaked_Color__Hover')};
        background: none;
      }

      &:active {
        color: ${theme('intentNaked_Color__Active')};
        background: none;
      }
    `}

  ${({ isIconButton }) =>
    !isIconButton &&
    css`
      i {
        margin-right: ${theme('sz8')};
      }
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

  ${({ intent }) =>
    intent === 'success-invert' &&
    css`
      color: ${theme('intentSuccess_Color')};
      background-color: initial;
      border: 1px solid ${theme('buttonInvert_Border_Color')};
      box-shadow: none;
      transition: ${theme('trans_ColorBgColor')};

      @media screen and (prefers-reduced-motion: reduce) {
        transition: none;
      }

      &:hover,
      &:focus {
        color: ${theme('fontButton_Color')};
        background-color: ${theme('intentSuccess_Color')};
      }

      &:active {
        background-color: ${theme('intentSuccess_Color__Active')};
      }
    `}

  ${({ intent }) =>
    intent === 'warning-invert' &&
    css`
      color: ${theme('intentWarning_Color')};
      background-color: initial;
      border: 1px solid ${theme('buttonInvert_Border_Color')};
      box-shadow: none;
      transition: ${theme('trans_ColorBgColor')};

      @media screen and (prefers-reduced-motion: reduce) {
        transition: none;
      }

      &:hover,
      &:focus {
        color: ${theme('fontButton_Color')};
        background-color: ${theme('intentWarning_Color')};
      }

      &:active {
        background-color: ${theme('intentWarning_Color__Active')};
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

export const Button: FC<ButtonProps> = ({
  children,
  variant,
  icon,
  ...props
}) => {
  return (
    <ButtonStyles
      variant={variant}
      isIconButton={isIconVariant(variant)}
      {...props}
    >
      {icon && (
        <Icon
          {...icon}
          size={icon.size || 16}
          className={cn({ rotate: props.loading })}
        />
      )}
      {isIconVariant(variant) ? <Icon {...variant} /> : children}
    </ButtonStyles>
  )
}
