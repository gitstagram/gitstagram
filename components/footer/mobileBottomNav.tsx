import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { Icon } from 'components/ui'
import { ProfileIcon } from 'components/profileIcon'
import { theme } from 'styles/themes'
import { HOME } from 'routes'

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
    color: ${theme('iconNav_Color')};

    &:hover,
    &:focus {
      color: ${theme('iconNav_Color__Hover')};
    }

    &:active {
      color: ${theme('iconNav_Color__Active')};
    }
  }
`

export const MobileBottomNav = (): JSX.Element => {
  const router = useRouter()

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
      <Icon
        clickable
        className='nav-icon'
        icon='camera'
        ariaLabel='Add a photo'
      />
      <Link href={HOME}>
        <a>
          <ProfileIcon interactive fromSession />
        </a>
      </Link>
    </MobileBottomNavStyles>
  )
}
