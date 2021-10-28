import React, { useState } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const TextAreaStyles = styled.div`
  label {
    display: block;
    font-weight: ${theme('fontLabel_FontWeight')};
    font-size: ${theme('fontLabel_FontSize')};
    cursor: pointer;
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

  textarea::placeholder {
    color: ${theme('fontPlaceholder_Color')};
    font-size: ${theme('fontPlaceholder_FontSize')};
    opacity: ${theme('fontPlaceholder_Opacity')};
  }

  &[disabled] {
    .text-input {
      -webkit-text-fill-color: ${theme('intentDisabled_Color__Accent')};
      color: ${theme('intentDisabled_Color__Accent')};
      background-color: ${theme('intentDisabled_Color')};

      &:hover,
      &:focus {
        border-color: ${theme('input_BorderColor')};
      }
    }

    label {
      cursor: not-allowed;

      &:hover,
      &:focus {
        ~ .text-input {
          border-color: ${theme('input_BorderColor')};
        }
      }
    }

    textarea::placeholder {
      color: ${theme('fontPlaceholder_Color__Deemph')};
      -webkit-text-fill-color: ${theme('fontPlaceholder_Color__Deemph')};
    }
  }
`

export const TextArea = ({
  id,
  name,
  initialValue,
  placeholderText,
  label,
  onChange,
  onFocus,
  ...props
}: InputProps<string>): JSX.Element => {
  const [value, setValue] = useState<string>(initialValue)

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const inputVal = e.currentTarget.value
    setValue(inputVal)
    onChange && onChange(`${inputVal}`, e)
  }

  return (
    <TextAreaStyles {...props}>
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        className='text-input'
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholderText}
        disabled={props.disabled}
        onFocus={onFocus}
      />
    </TextAreaStyles>
  )
}
