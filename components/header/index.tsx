import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/client'
import styled from 'styled-components'
import { TextLogo, TextLink, Icon } from 'components/ui'
import { ProfileMenu } from 'components/header/profileMenu'
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

  .auth-content {
    display: flex;
    align-items: center;
  }

  .nav-icon {
    margin-right: ${theme('sz12')};
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

export const Header = (): JSX.Element => {
  const router = useRouter()
  const [session] = useSession()

  const handleLogin = (): void => {
    void signIn('github')
  }

  const authenticatedContent = session ? (
    <>
      <Link href={HOME} passHref>
        <Icon
          as='a'
          clickable
          className='nav-icon'
          icon='house-door'
          ariaLabel='Home'
          filled={router.pathname === HOME}
        />
      </Link>
      <ProfileMenu />
    </>
  ) : (
    <>
      <button onClick={handleLogin}>Login with Github</button>
      <TextLink external href='https://github.com/signup'>
        Sign Up
      </TextLink>
    </>
  )

  return (
    <HeaderStyles>
      <nav>
        <TextLogo size='small' href={HOME}>
          Gitstagram
        </TextLogo>
        <div className='auth-content'>{authenticatedContent}</div>
      </nav>
    </HeaderStyles>
  )
}
