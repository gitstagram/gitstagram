import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'
import styled from 'styled-components'
import { MenuButton, useMenuState } from 'reakit/Menu'
import { Icon, Menu, MenuSeparator, MenuItem } from 'components/ui'
import { ProfileIcon } from 'components/profileIcon'
import { SETTINGS, PROFILE } from 'routes'

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
  const router = useRouter()
  const [session] = useSession()

  const menu = useMenuState({
    animated: true,
    placement: 'bottom-end',
    gutter: 8,
    baseId: 'ProfileMenu',
  })

  const handleLogout = (): void => {
    menu.hide()
    void signOut()
  }

  const isProfilePath = router.pathname === PROFILE
  const isSettingsPath = router.pathname === SETTINGS

  return session?.user ? (
    <ProfileMenuStyles>
      <MenuButton {...menu} className='profile-menu-button'>
        <ProfileIcon interactive fromSession />
      </MenuButton>
      <Menu {...menu} ariaLabel='Profile menu' arrowHighlighted={isProfilePath}>
        <MenuItem
          {...menu}
          as='div'
          onClick={menu.hide}
          highlighted={isProfilePath}
        >
          <Link href={`/${session?.user?.name}`}>
            <a>
              <Icon icon='person' size={16} ariaHidden />
              Profile
            </a>
          </Link>
        </MenuItem>
        <MenuItem
          {...menu}
          as='div'
          onClick={menu.hide}
          highlighted={isSettingsPath}
        >
          <Link href={SETTINGS}>
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
