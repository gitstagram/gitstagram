import React from 'react'
import styled from 'styled-components'
import cn from 'classnames'
import { Icon } from 'components/ui/icon/icon'
import { theme } from 'styles/themes'

const SpinnerStyles = styled.div`
  color: ${theme('intentDisabled_Color__Accent')};
`

type SpinnerProps = BaseProps & {
  ariaLabel: string
}

export const Spinner = ({
  className,
  ariaLabel,
  ...props
}: SpinnerProps): JSX.Element => {
  return (
    <SpinnerStyles {...props} className={cn(className, 'rotate')}>
      <Icon icon='gear' ariaLabel={ariaLabel} />
    </SpinnerStyles>
  )
}
