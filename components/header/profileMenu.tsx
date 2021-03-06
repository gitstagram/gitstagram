import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/client'
import styled from 'styled-components'
import { MenuButton, useMenuState } from 'reakit/Menu'
import { useViewerInfo } from 'components/data'
import { Icon, Menu, MenuSeparator, MenuItem } from 'components/ui'
import { ProfileIcon } from 'components/profileIcon'
import { SETTINGS, PROFILE, getProfilePath } from 'routes'

const ProfileMenuStyles = styled.div`
  display: flex;

  .profile-menu-button {
    border: none;
  }

  .logout {
    justify-content: center;
  }

  [data-leave] {
    visibility: hidden;
  }
`

export const ProfileMenu = (): JSX.Element => {
  const router = useRouter()
  const viewerInfo = useViewerInfo()
  const viewerLogin = viewerInfo.login

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

  const isProfilePath =
    router.pathname === PROFILE && router.query.userLogin === viewerLogin
  const isSettingsPath = router.pathname === SETTINGS

  return (
    <ProfileMenuStyles>
      <MenuButton {...menu} className='profile-menu-button'>
        <ProfileIcon
          interactive
          useViewer
          emph={menu.visible || isProfilePath}
        />
      </MenuButton>
      <Menu {...menu} ariaLabel='Profile menu' arrowHighlighted={isProfilePath}>
        <Link href={getProfilePath(viewerLogin)} passHref>
          <MenuItem
            {...menu}
            as='a'
            highlighted={isProfilePath}
            onClick={menu.hide}
          >
            <Icon icon='person' size={16} ariaHidden />
            Profile
          </MenuItem>
        </Link>
        <Link href={SETTINGS} passHref>
          <MenuItem
            {...menu}
            as='a'
            highlighted={isSettingsPath}
            onClick={menu.hide}
          >
            <Icon icon='gear' size={16} ariaHidden />
            Settings
          </MenuItem>
        </Link>
        <MenuSeparator {...menu} />
        <MenuItem {...menu} className='logout' onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </ProfileMenuStyles>
  )
}
