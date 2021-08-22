import React from 'react'
import Image from 'next/image'
import { useAuth0 } from '@auth0/auth0-react'
import { externalLoader } from 'helpers'

export const Header = (): JSX.Element => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0()

  const handleLogin = (): Promise<void> => {
    return loginWithRedirect()
  }

  const handleLogout = (): void => {
    logout({ returnTo: process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL })
  }

  if (isLoading) {
    return <>Auth0 Loading</>
  }

  const headerContents = isAuthenticated ? (
    <div>
      <>
        {user && user.picture && user.nickname ? (
          <>
            <Image
              loader={externalLoader}
              src={user.picture}
              height={50}
              width={50}
              alt={`${user.nickname}'s avatar`}
            />
            {user.nickname}
          </>
        ) : (
          'User load failed'
        )}
        <button onClick={handleLogout}>Logout</button>
      </>
    </div>
  ) : (
    <button onClick={handleLogin}>Login</button>
  )

  return <header>{headerContents}</header>
}
