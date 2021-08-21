import React from 'react'
import Image from 'next/image'
import { useAuth0 } from '@auth0/auth0-react'

export const Header = (): JSX.Element => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0()

  const handleLogin = (): Promise<void> => {
    return loginWithRedirect()
  }

  const handleLogout = (): void => {
    logout({ returnTo: 'http://localhost:3000' })
  }

  const headerContents = isAuthenticated ? (
    <div>
      <>
        {user && user.picture && user.nickname ? (
          <>
            <Image
              src={user.picture}
              height={50}
              width={50}
              alt={user.nickname}
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
    <button onClick={handleLogin}>
      {isLoading ? 'Logging in...' : 'Login'}
    </button>
  )

  return <header>{headerContents}</header>
}
