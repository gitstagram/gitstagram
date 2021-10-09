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
  FromTabletLandscape,
  UntilTabletLandscape,
} from 'components/ui'
import { ProfileMenu } from 'components/header/profileMenu'
import { SearchBox } from 'components/header/searchBox'
import { MobileTopNav } from 'components/header/mobileTopNav'
import { MobileTitle } from 'components/header/mobileTitle'
import { HOME } from 'routes'
import { theme } from 'styles/themes'
import { zIndicies } from 'styles/zIndicies'

const HeaderStyles = styled.header`
  z-index: ${zIndicies.header};
  padding-right: ${theme('sz32')};
  padding-left: ${theme('sz32')};
  background-color: ${theme('nav_Bg')};

  nav {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: ${theme('sz56')};
    background-color: ${theme('nav_Bg')};
  }

  .nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: ${theme('maxWidth')};
    height: 100%;
    margin-right: auto;
    margin-left: auto;
    padding-right: ${theme('sz32')};
    padding-left: ${theme('sz32')};
  }

  .sign-up {
    margin-left: ${theme('sz12')};
  }

  .left-content {
    z-index: ${zIndicies.headerLeftRightContents};
  }

  .right-content {
    position: inherit;
    z-index: ${zIndicies.headerLeftRightContents};
    display: flex;
    align-items: center;
  }

  .centered-content {
    position: absolute;
    right: 0;
    left: 0;
    z-index: ${zIndicies.headerCenterContent};
    display: flex;
    align-items: center;
    justify-content: center;
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

  const handleLogin = () => {
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
      <UntilTabletLandscape>
        <Button
          className='nav-icon'
          onClick={searchModeToggle}
          variant={{
            icon: 'search',
            ariaLabel: `Search`,
          }}
        />
      </UntilTabletLandscape>
      <FromTabletLandscape>
        <Button
          className='nav-icon'
          onClick={() => {
            throw new Error('Test Error')
          }}
          variant={{
            icon: 'camera',
            ariaLabel: 'Add a photo',
          }}
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
      </FromTabletLandscape>
    </>
  ) : (
    <>
      <Button onClick={handleLogin}>Log In</Button>
      <FromTabletLandscape>
        <TextLink
          className='sign-up'
          boldened
          external
          href='https://github.com/signup'
        >
          Sign Up
        </TextLink>
      </FromTabletLandscape>
    </>
  )

  return (
    <HeaderStyles>
      <nav>
        <div className='nav-container'>
          {!searchMode ? (
            <>
              {/* eslint-disable react/no-children-prop */}
              <div className='left-content'>
                <UntilTabletLandscape children={<MobileTopNav />} />
                <FromTabletLandscape children={<TextLogo href={HOME} />} />
              </div>
              <div className='centered-content'>
                <UntilTabletLandscape children={<MobileTitle />} />
                <FromTabletLandscape children={<SearchBox />} />
              </div>
              <div className='right-content'>{rightContent}</div>
              {/* eslint-enable */}
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
        </div>
      </nav>
    </HeaderStyles>
  )
}
