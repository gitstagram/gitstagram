import React, { useState, useRef } from 'react'
import { Input } from 'reakit/Input'
import styled, { css } from 'styled-components'
import { Icon } from 'components/ui/icon/icon'
import { Button } from 'components/ui/button'
import { theme } from 'styles/themes'

interface TextInputStylesProps {
  placeholderPos?: PlaceholderPos
}

const TextInputStyles = styled.div<TextInputStylesProps>`
  position: relative;

  .placeholder {
    position: absolute;
    top: 50%;
    left: ${theme('sz12')};
    display: flex;
    align-items: center;
    width: 100%;
    color: ${theme('fontPlaceholder_Color')};
    font-size: ${theme('fontPlaceholder_FontSize')};
    transform: translate(0, -50%);
    pointer-events: none;

    [class^='bi-']::before,
    [class*=' bi-']::before {
      margin-right: ${theme('sz4')};
    }
  }

  .text-input {
    padding-left: ${theme('sz12')};
    border-color: ${theme('input_BorderColor')};
    border-radius: ${theme('rounded_BorderRadius')};
    outline: none;

    &:hover {
      border-color: ${theme('input_BorderColor__Hover')};
    }

    &:focus {
      border-color: ${theme('input_BorderColor__Focus')};
    }
  }

  .clear-input {
    position: absolute;
    top: 50%;
    right: ${theme('sz12')};
    transform: translate(0, -50%);
  }

  ${({ placeholderPos }) =>
    placeholderPos === 'center' &&
    css`
      .placeholder {
        left: 0;
        justify-content: center;
      }
    `}
`

export const TextInput = ({
  id,
  name,
  initialValue = '',
  placeholderText,
  placeholderIcon,
  onChange,
  clearable = false,
  ...props
}: IInputProps<string>): JSX.Element => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [value, setValue] = useState<string>(initialValue)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputVal = e.currentTarget.value
    setValue(inputVal)
    // enslint-disable-next-lie @typescript-eslint/no-unsafe-call
    onChange && onChange(`${inputVal}`, e)
  }

  const handleClear = () => {
    setValue('')
    inputRef?.current?.focus()
  }

  const hasPlaceholder = !!(placeholderText || placeholderIcon)

  return (
    <TextInputStyles {...props}>
      {hasPlaceholder && !value && (
        <span className='placeholder'>
          {placeholderIcon && <Icon {...placeholderIcon} $size={12} />}
          {placeholderText}
        </span>
      )}
      <Input
        ref={inputRef}
        id={id}
        name={name}
        value={value}
        className='text-input'
        onChange={handleChange}
      />
      {clearable && value && (
        <Button
          className='clear-input'
          onClick={handleClear}
          $variant={{
            icon: 'x-lg',
            $size: 12,
            ariaLabel: `Clear ${name} input`,
          }}
        />
      )}
    </TextInputStyles>
  )
}
