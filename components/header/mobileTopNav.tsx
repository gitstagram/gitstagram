import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Button } from 'components/ui'

const MobileTopNavStyles = styled.div``

export const MobileTopNav = (): JSX.Element => {
  const router = useRouter()

  const handleBackClick = () => {
    router.back()
  }

  return (
    <MobileTopNavStyles>
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
