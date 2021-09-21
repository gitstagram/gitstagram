import React from 'react'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/client'
import {
  Menu,
  MenuArrow,
  MenuItem,
  MenuButton,
  MenuSeparator,
  useMenuState,
} from 'reakit/Menu'
import { NextImgWrapper, Icon } from 'components/ui'
import { ProfileMenuStyles } from 'components/header/profileMenuStyles'
import { themeProp } from 'styles/themes'

export const ProfileMenu = (): JSX.Element => {
  const [session] = useSession()
  const menu = useMenuState({
    animated: parseInt(themeProp('trans_Speed')),
    placement: 'bottom-end',
    gutter: 8,
  })

  const handleLogout = (): void => {
    menu.hide()
    void signOut()
  }

  const MenuButtonContent = session?.user?.image ? (
    <div className='profile'>
      <NextImgWrapper>
        <Image
          className='profile-image'
          unoptimized
          src={session.user.image}
          layout='fill'
          alt={`${session.user.name}'s avatar`}
        />
      </NextImgWrapper>
    </div>
  ) : (
    <div className='placeholder-wrapper'>
      <Icon
        className='profile-placeholder'
        icon='person'
        ariaLabel='Profile image placeholder'
        filled
      />
    </div>
  )

  return session?.user ? (
    <ProfileMenuStyles>
      <MenuButton {...menu} className='profile-menu-button'>
        {MenuButtonContent}
      </MenuButton>
      <Menu {...menu} aria-label='Profile menu'>
        <div className='profile-menu-items'>
          <MenuItem {...menu} as='a' href='#' onClick={menu.hide}>
            <Icon icon='person' $size={16} ariaHidden />
            Profile
          </MenuItem>
          <MenuItem {...menu} as='a' href='#' onClick={menu.hide}>
            <Icon icon='gear' $size={16} ariaHidden />
            Settings
          </MenuItem>
          <MenuSeparator {...menu} />
          <MenuItem {...menu} className='logout-button' onClick={handleLogout}>
            Logout
          </MenuItem>
          <MenuArrow {...menu} className='profile-menu-arrow' />
        </div>
      </Menu>
    </ProfileMenuStyles>
  ) : (
    <></>
  )
}
