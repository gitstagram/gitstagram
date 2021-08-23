import React from 'react'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/client'
import { externalLoader } from 'helpers'

export const Header = (): JSX.Element => {
  const [session, loading] = useSession()

  const handleLogin = (): void => {
    void signIn()
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
            {session.user.image && (
              <Image
                loader={externalLoader}
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
    <button onClick={handleLogin}>Login</button>
  )

  return <header>{headerContents}</header>
}
