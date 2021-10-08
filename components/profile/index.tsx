import React from 'react'

type ProfileProps = {
  name: string
}

export const Profile = ({ name }: ProfileProps): JSX.Element => {
  return <>{name}</>
}
