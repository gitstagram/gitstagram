import React, { useState, useRef } from 'react'
import { Input } from 'reakit/Input'
import { useForkRef } from 'reakit-utils'
import styled, { css } from 'styled-components'
import cn from 'classnames'
import { Icon } from 'components/ui/icon/icon'
import { Button } from 'components/ui/button'
import { theme } from 'styles/themes'

interface TextInputStylesProps {
  placeholderPos?: PlaceholderPos
}

const TextInputStyles = styled.div<TextInputStylesProps>`
  position: relative;

  .input-container {
    position: relative;
  }

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
    width: 100%;
    padding-left: ${theme('sz12')};
    border-color: ${theme('input_BorderColor')};
    border-radius: ${theme('rounded_BorderRadius')};
    outline: none;

    &:hover {
      border-color: ${theme('input_BorderColor__Hover')};
    }

    &:focus {
      border-color: ${theme('input_BorderColor__Focus')};
      box-shadow: ${theme('input_BoxShadow__Focus')};
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
    transition: ${theme('trans_Opacity')};

    &.show-clear-input {
      visibility: visible;
      opacity: 1;
    }
  }

  label {
    display: block;
    font-weight: ${theme('fontLabel_FontWeight')};
    font-size: ${theme('fontLabel_FontSize')};
  }

  ${({ placeholderPos }) =>
    placeholderPos === 'center' &&
    css`
      .placeholder {
        left: 0;
        justify-content: center;
      }
    `}

  &[disabled] {
    .text-input {
      -webkit-text-fill-color: ${theme('intentDisabled_Color__Accent')};
      color: ${theme('intentDisabled_Color__Accent')};
      background-color: ${theme('intentDisabled_Color')};
    }

    label {
      cursor: not-allowed;

      &:hover,
      &:focus {
        ~ .input-container {
          .text-input {
            border-color: ${theme('input_BorderColor')};
          }
        }
      }
    }

    .placeholder {
      color: ${theme('fontPlaceholder_Color__Deemph')};
    }
  }

  .loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${theme('sz12')};
    width: 50%;
    height: ${theme('font_FontSize__Skeleton')};
    margin-top: auto;
    margin-bottom: auto;
  }
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
    label,
    loading,
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
      {label && <label htmlFor={id}>{label}</label>}
      <div className='input-container'>
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
          type='text'
          disabled={props.disabled}
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
        {loading && <div className='loading skeleton' />}
      </div>
    </TextInputStyles>
  )
}

export const TextInput = React.forwardRef(TextInputBase)
