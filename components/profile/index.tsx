import React from 'react'

type ProfileProps = {
  userLogin: string
}

export const Profile = ({ userLogin }: ProfileProps): JSX.Element => {
  return <>{userLogin}</>
}
