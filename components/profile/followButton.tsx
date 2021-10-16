import React from 'react'
import { Button } from 'components/ui'

export const FollowButton = (): JSX.Element => {
  const handleFollow = () => {
    return
  }

  return (
    <Button
      className='profile-title-button'
      onClick={handleFollow}
      icon={{
        ariaHidden: true,
        icon: 'person-plus-fill',
      }}
    >
      Follow
    </Button>
  )
}
