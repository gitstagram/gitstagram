import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/client'
import styled from 'styled-components'
import { MenuButton, useMenuState } from 'reakit/Menu'
import { Icon, Menu, MenuSeparator, MenuItem } from 'components/ui'
import { ProfileIcon } from 'components/profileIcon'

const ProfileMenuStyles = styled.div`
  display: flex;

  .profile-menu-button {
    border: none;
  }

  .logout {
    justify-content: center;
  }
`

export const ProfileMenu = (): JSX.Element => {
  const [session] = useSession()
  const menu = useMenuState({
    animated: true,
    placement: 'bottom-end',
    gutter: 8,
  })

  const handleLogout = (): void => {
    menu.hide()
    void signOut()
  }

  return session?.user ? (
    <ProfileMenuStyles>
      <MenuButton {...menu} className='profile-menu-button'>
        <ProfileIcon />
      </MenuButton>
      <Menu {...menu} ariaLabel='Profile menu'>
        <MenuItem {...menu} as='div' onClick={menu.hide}>
          <Link href='#'>
            <a>
              <Icon icon='person' size={16} ariaHidden />
              Profile
            </a>
          </Link>
        </MenuItem>
        <MenuItem {...menu} as='div' onClick={menu.hide}>
          <Link href='#'>
            <a>
              <Icon icon='gear' size={16} ariaHidden />
              Settings
            </a>
          </Link>
        </MenuItem>
        <MenuSeparator {...menu} />
        <MenuItem {...menu} className='logout' onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </ProfileMenuStyles>
  ) : (
    <></>
  )
}
