import React from 'react'
import styled from 'styled-components'
import {
  Dialog as ReakitDialog,
  DialogBackdrop,
  DialogStateReturn,
} from 'reakit/Dialog'
import { TextAttn, Button } from 'components/ui'
import { theme } from 'styles/themes'
import { zIndicies } from 'styles/zIndicies'

type DialogProps = DialogStateReturn &
  BaseProps & {
    ariaLabel: string
    title: JSX.Element | string
    disabled?: boolean
    clearable?: boolean
    footer?: JSX.Element | string
    hasFormAndOnSubmit?: React.FormEventHandler<HTMLFormElement>
  }

const DialogBackdropStyles = styled(DialogBackdrop)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${zIndicies.dialog};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme('dialog_BgColor')};
  opacity: 0;
  transition: ${theme('trans_Opacity')};

  @media screen and (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &[data-enter] {
    opacity: 1;
  }
`

const ReakitDialogStyles = styled(ReakitDialog)`
  z-index: ${zIndicies.dialog};
  min-width: ${theme('sz256')};
  max-height: 90vh;
  background: ${theme('base_BgColor')};
  border-radius: ${theme('rounded_BorderRadius')};
  box-shadow: ${theme('panel_BoxShadow')};
  transform: scale(0);
  opacity: 0;
  transition: ${theme('trans_OpacityTransform')};

  @media screen and (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &[data-enter] {
    transform: scaleY(1);
    opacity: 1;
  }

  .dialog-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${theme('sz16')};
    border-bottom: 1px solid ${theme('hr_BorderColor__Deemph')};
  }

  .dialog-footer {
    padding: ${theme('sz16')};
  }
`

export const Dialog = ({
  children,
  className,
  ariaLabel,
  disabled,
  title,
  footer,
  clearable = true,
  hasFormAndOnSubmit,
  ...props
}: DialogProps): JSX.Element => {
  const content = (
    <>
      <div className='dialog-title'>
        <TextAttn>{title}</TextAttn>
        {clearable && (
          <Button
            onClick={props.hide}
            disabled={disabled}
            variant={{
              icon: 'x-lg',
              size: 12,
              ariaLabel: `Close ${ariaLabel}`,
            }}
          />
        )}
      </div>
      {children}
      {footer && <div className='dialog-footer'>{footer}</div>}
    </>
  )

  return (
    <DialogBackdropStyles className={className} {...props}>
      <ReakitDialogStyles
        {...props}
        aria-label={ariaLabel}
        hideOnEsc={!disabled}
        hideOnClickOutside={!disabled}
      >
        {hasFormAndOnSubmit ? (
          <form onSubmit={hasFormAndOnSubmit}>{content}</form>
        ) : (
          content
        )}
      </ReakitDialogStyles>
    </DialogBackdropStyles>
  )
}
