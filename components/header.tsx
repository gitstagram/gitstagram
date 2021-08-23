import React from 'react'
import Image from 'next/image'
import { externalLoader } from 'helpers'

export const Header = (): JSX.Element => {
  const isAuthenticated = false
  const user = {
    picture: 'picture.png',
    alt: 'name',
    nickname: 'nickname',
  }

  const handleLogin = (): void => {
    return
  }

  const handleLogout = (): void => {
    return
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
