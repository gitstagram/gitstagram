import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/client'
import styled from 'styled-components'
import {
  TextLogo,
  TextLink,
  Icon,
  Button,
  DisplayFromTabletLandscape,
  DisplayUntilTabletLandscape,
} from 'components/ui'
import { ProfileMenu } from 'components/header/profileMenu'
import { SearchBox } from 'components/header/searchBox'
import { HOME } from 'routes'
import { theme } from 'styles/themes'

const HeaderStyles = styled.header`
  padding-right: ${theme('sz32')};
  padding-left: ${theme('sz32')};
  background-color: ${theme('nav_Bg')};

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: ${theme('maxWidth')};
    height: ${theme('sz56')};
    margin-right: auto;
    margin-left: auto;
  }

  .sign-up {
    margin-left: ${theme('sz12')};
  }

  .right-content {
    position: inherit;
    display: flex;
    align-items: center;
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

  .mobile-search-mode {
    display: flex;
    width: 100%;

    [role='menu'] {
      width: calc(90% - ${theme('sz32')});
    }
  }

  .mobile-search-box {
    width: 100%;
    margin-right: ${theme('sz16')};
  }
`

export const Header = (): JSX.Element => {
  const mobileSearchRef = useRef<HTMLButtonElement | null>(null)
  const router = useRouter()
  const [session] = useSession()

  const [searchMode, setSearchMode] = useState<boolean>(false)

  const handleLogin = (): void => {
    void signIn('github')
  }

  const searchModeToggle = () => {
    setSearchMode(!searchMode)
  }

  useEffect(() => {
    if (searchMode) {
      mobileSearchRef.current?.focus()
    }
  }, [searchMode])

  const rightContent = session ? (
    <>
      <DisplayUntilTabletLandscape>
        <Button
          className='nav-icon'
          onClick={searchModeToggle}
          variant={{
            icon: 'search',
            ariaLabel: `Search`,
          }}
        />
      </DisplayUntilTabletLandscape>
      <DisplayFromTabletLandscape>
        <Icon
          clickable
          className='nav-icon'
          icon='camera'
          ariaLabel='Add a photo'
        />
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
        <ProfileMenu />
      </DisplayFromTabletLandscape>
    </>
  ) : (
    <>
      <Button onClick={handleLogin}>Log In</Button>
      <DisplayFromTabletLandscape>
        <TextLink
          className='sign-up'
          boldened
          external
          href='https://github.com/signup'
        >
          Sign Up
        </TextLink>
      </DisplayFromTabletLandscape>
    </>
  )

  return (
    <HeaderStyles>
      <nav>
        {!searchMode ? (
          <>
            <TextLogo size='small' href={HOME}>
              Gitstagram
            </TextLogo>
            <DisplayFromTabletLandscape>
              <SearchBox />
            </DisplayFromTabletLandscape>
            <div className='right-content'>{rightContent}</div>
          </>
        ) : (
          <div className='mobile-search-mode'>
            <SearchBox
              ref={mobileSearchRef}
              className='mobile-search-box'
              expand
            />
            <Button onClick={searchModeToggle} variant='naked'>
              Cancel
            </Button>
          </div>
        )}
      </nav>
    </HeaderStyles>
  )
}
