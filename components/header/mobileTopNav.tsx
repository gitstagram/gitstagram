import React from 'react'
import styled, { css } from 'styled-components'
import { useRouter } from 'next/router'
import { Button } from 'components/ui'
import { HOME } from 'routes'

type MobileTopNavStylesProps = {
  hide?: boolean
}

type MobileTopNavProps = MobileTopNavStylesProps & BaseProps

const MobileTopNavStyles = styled.div<MobileTopNavStylesProps>`
  ${({ hide }) =>
    hide &&
    css`
      visibility: hidden;
    `}
`

export const MobileTopNav = ({ ...props }: MobileTopNavProps): JSX.Element => {
  const router = useRouter()

  const handleBackClick = () => {
    router.back()
  }

  const hide = router.pathname === HOME

  return (
    <MobileTopNavStyles aria-hidden={hide} hide={hide} {...props}>
      <Button
        onClick={handleBackClick}
        variant={{
          icon: 'chevron-left',
          ariaLabel: 'Go Back',
        }}
      />
    </MobileTopNavStyles>
  )
}
