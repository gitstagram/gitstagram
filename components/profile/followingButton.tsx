import React, { useState } from 'react'
import { Button } from 'components/ui'

export const FollowingButton = (): JSX.Element => {
  const [hovered, setHovered] = useState(false)

  const handleHover = () => {
    setHovered(!hovered)
  }

  const handleUnfollow = () => {
    return
  }

  return (
    <Button
      className='profile-title-button'
      onClick={handleUnfollow}
      intent='danger-invert'
      icon={{
        ariaHidden: true,
        icon: hovered ? 'person-x-fill' : 'person-check-fill',
      }}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onTouchStart={handleHover}
      onTouchEnd={handleHover}
    >
      {hovered ? 'Unfollow' : 'Following'}
    </Button>
  )
}
