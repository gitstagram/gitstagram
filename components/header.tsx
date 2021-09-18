import React from 'react'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/client'
import { Icon } from 'components/ui'

export const Header = (): JSX.Element => {
  const [session, loading] = useSession()

  const handleLogin = (): void => {
    void signIn('github')
  }

  const handleLogout = (): void => {
    void signOut()
  }

  if (loading) return <>Loading</>

  const headerContents = session ? (
    <div>
      <>
        {session && session.user && (
          <>
            <Icon icon='search' ariaLabel='Find users on Gitstagram' />
            {session.user.image && (
              <Image
                unoptimized
                src={session.user.image}
                height={50}
                width={50}
                alt={`${session.user.name}'s avatar`}
              />
            )}
            {session.user.name}
          </>
        )}
        <button onClick={handleLogout}>Logout</button>
      </>
    </div>
  ) : (
    <button onClick={handleLogin}>Login with Github</button>
  )

  return <header>{headerContents}</header>
}
