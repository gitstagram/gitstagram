import React, { useState, useRef } from 'react'
import { Input } from 'reakit/Input'
import { useForkRef } from 'reakit-utils'
import styled, { css } from 'styled-components'
import cn from 'classnames'
import { Icon } from 'components/ui/icon/icon'
import { Button } from 'components/ui/button'
import { theme, themeProp } from 'styles/themes'

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

  @media screen and (prefers-reduced-motion: reduce) {
    .clear-input {
      transition: none;
    }
  }

  .clear-input {
    position: absolute;
    top: 50%;
    right: ${theme('sz12')};
    transform: translate(0, -50%);
    visibility: hidden;
    opacity: 0;
    transition: ${themeProp('trans_Opacity')};

    &.show-clear-input {
      visibility: visible;
      opacity: 1;
    }
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

function TextInputBase(
  {
    id,
    name,
    initialValue = '',
    placeholderText,
    placeholderIcon,
    onChange,
    clearable = false,
    ...props
  }: InputProps<string>,
  ref: React.Ref<HTMLInputElement> | undefined
) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [value, setValue] = useState<string>(initialValue)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputVal = e.currentTarget.value
    setValue(inputVal)
    onChange && onChange(`${inputVal}`, e)
  }

  const handleClear: React.EventHandler<React.SyntheticEvent> = (e) => {
    setValue('')
    onChange && onChange('', e)
    inputRef?.current?.focus()
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLElement> = (e) => {
    const target = e.target as HTMLButtonElement
    const isConfirmKey = e.code === 'Enter' || e.code === 'Space'
    const isClearInput =
      target.tagName === 'BUTTON' &&
      target.className.includes('clear-input') &&
      isConfirmKey

    if (isClearInput) {
      handleClear(e)
      e.preventDefault()
    } else {
      props?.onKeyDown && props.onKeyDown(e)
    }
  }
  const hasPlaceholder = !!(placeholderText || placeholderIcon)

  return (
    <TextInputStyles {...props} onKeyDown={handleKeyDown}>
      {hasPlaceholder && !value && (
        <span className='placeholder'>
          {placeholderIcon && <Icon {...placeholderIcon} size={12} />}
          {placeholderText}
        </span>
      )}
      <Input
        ref={useForkRef(inputRef, ref)}
        id={id}
        name={name}
        value={value}
        className='text-input'
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {clearable && (
        <Button
          className={cn('clear-input', { 'show-clear-input': value })}
          aria-hidden={!!value}
          onClick={handleClear}
          variant={{
            icon: 'x-lg',
            size: 12,
            ariaLabel: `Clear ${name} input`,
          }}
        />
      )}
    </TextInputStyles>
  )
}

export const TextInput = React.forwardRef(TextInputBase)
