import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { Checkbox as ReakitCheckbox } from 'reakit/Checkbox'
import { theme } from 'styles/themes'

type CheckboxStylesProps = {
  disabled?: boolean
}

const CheckboxStyles = styled.div<CheckboxStylesProps>`
  display: flex;
  align-items: center;
  margin-bottom: ${theme('sz16')};

  label {
    margin-right: ${theme('sz12')};
    cursor: pointer;
  }

  input {
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${theme('sz24')};
    height: ${theme('sz24')};
    background-color: ${theme('checkbox_BgColor')};
    border: 1px solid ${theme('input_BorderColor')};
    border-radius: ${theme('roundedSmall_BorderRadius')};
    cursor: pointer;
    appearance: none;

    &:hover,
    &:focus {
      border-color: ${theme('input_BorderColor__Hover')};
    }

    &:active {
      border-color: ${theme('input_BorderColor__Active')};
    }

    &::after {
      display: none;
      color: ${theme('fontCheckbox_Color')};
      font-weight: ${theme('fontCheckbox_FontWeight')};
      font-size: ${theme('fontCheckbox_FontSize')};
      content: '✓';
    }

    &:checked {
      background-color: ${theme('checkbox_BgColor__Checked')};

      &::after {
        display: block;
      }
    }

    &:disabled {
      background-color: ${theme('intentDisabled_Color')};

      &::after {
        color: ${theme('intentDisabled_Color__Accent')};
      }
    }
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;

      label {
        cursor: not-allowed;

        &:hover,
        &:focus,
        &:active {
          ~ input {
            border: 1px solid ${theme('input_BorderColor')};
          }
        }
      }
    `}
`

export const Checkbox = ({
  id,
  name,
  initialValue,
  onChange,
  disabled,
  label,
  ...props
}: CheckboxProps): JSX.Element => {
  const [checked, setChecked] = useState(initialValue)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.checked
    setChecked(value)
    onChange && onChange(value, e)
  }

  return (
    <CheckboxStyles {...props} disabled={disabled}>
      {label && <label htmlFor={id}>{label}</label>}
      <ReakitCheckbox
        id={id}
        name={name}
        disabled={disabled}
        checked={checked}
        onChange={handleChange}
      />
    </CheckboxStyles>
  )
}
