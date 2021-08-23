import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'

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
        {JSON.stringify(session)}
        <button onClick={handleLogout}>Logout</button>
      </>
    </div>
  ) : (
    <button onClick={handleLogin}>Login</button>
  )

  return <header>{headerContents}</header>
}
