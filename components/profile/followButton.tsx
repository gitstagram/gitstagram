import React from 'react'
import { Button } from 'components/ui'

type FollowButtonProps = BaseProps & {
  variant?: 'small'
}

export const FollowButton = ({
  variant,
  ...props
}: FollowButtonProps): JSX.Element => {
  const handleFollow = () => {
    return
  }

  return (
    <Button
      {...props}
      variant={variant}
      onClick={handleFollow}
      icon={
        variant === 'small'
          ? undefined
          : {
              ariaHidden: true,
              icon: 'person-plus-fill',
            }
      }
    >
      Follow
    </Button>
  )
}
