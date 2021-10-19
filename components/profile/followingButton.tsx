import React, { useState } from 'react'
import { Button } from 'components/ui'

type FollowingButtonProps = BaseProps & {
  variant?: 'small'
}

export const FollowingButton = ({
  variant,
  ...props
}: FollowingButtonProps): JSX.Element => {
  const [hovered, setHovered] = useState(false)

  const handleHover = () => {
    setHovered(!hovered)
  }

  const handleUnfollow = () => {
    return
  }

  return (
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
              icon: hovered ? 'person-x-fill' : 'person-check-fill',
            }
      }
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onTouchStart={handleHover}
      onTouchEnd={handleHover}
    >
      {hovered ? 'Unfollow' : 'Following'}
    </Button>
  )
}
