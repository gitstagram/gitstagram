import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { Icon } from 'components/ui'
import { useViewerInfo } from 'components/data'
import { ProfileIcon } from 'components/profileIcon'
import { theme } from 'styles/themes'
import { HOME, getProfilePath, NEW } from 'routes'

const MobileBottomNavStyles = styled.nav`
  position: fixed;
  bottom: env(safe-area-inset-bottom);
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: ${theme('sz48')};
  background-color: ${theme('nav_Bg')};

  ::after {
    position: absolute;
    top: ${theme('sz48')};
    right: 0;
    left: 0;
    height: env(safe-area-inset-bottom);
    background-color: ${theme('nav_Bg')};
    content: '';
  }

  .nav-icon {
    margin-right: ${theme('sz16')};
  }
`

export const MobileBottomNav = (): JSX.Element => {
  const router = useRouter()
  const { userLogin } = router.query
  const viewerInfo = useViewerInfo()
  const viewerLogin = viewerInfo.login

  return (
    <MobileBottomNavStyles>
      <Link href={HOME}>
        <a>
          <Icon
            clickable
            className='nav-icon'
            icon='house-door'
            ariaLabel='Home'
            filled={router.pathname === HOME}
          />
        </a>
      </Link>
      <Link href={NEW}>
        <a>
          <Icon
            clickable
            className='nav-icon'
            icon='camera'
            ariaLabel='New post'
            filled={router.pathname === NEW}
          />
        </a>
      </Link>
      <Link href={getProfilePath(viewerLogin)}>
        <a>
          <ProfileIcon interactive useViewer emph={userLogin === viewerLogin} />
        </a>
      </Link>
    </MobileBottomNavStyles>
  )
}
