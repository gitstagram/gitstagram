import React from 'react'
import styled from 'styled-components'
import { Button } from 'components/ui'

type FollowingButtonProps = BaseProps & {
  variant?: 'small'
}

const FollowingButtonStyles = styled.span`
  button {
    ::after {
      content: 'Following';
    }

    &:hover,
    &:focus {
      ::after {
        content: 'Unfollow';
      }
    }
  }
`

export const FollowingButton = ({
  variant,
  ...props
}: FollowingButtonProps): JSX.Element => {
  const handleUnfollow = () => {
    return
  }

  return (
    <FollowingButtonStyles>
      <Button
        {...props}
        variant={variant}
        onClick={handleUnfollow}
        intent='danger-invert'
        icon={
          variant === 'small'
            ? undefined
            : {
                ariaHidden: true,
                icon: 'person-fill',
              }
        }
      />
    </FollowingButtonStyles>
  )
}
