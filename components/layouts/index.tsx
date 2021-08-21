import React, { PropsWithChildren, ReactNode } from 'react'
import { Header } from 'components/header'

export const DefaultLayout = ({
  children,
}: PropsWithChildren<ReactNode>): JSX.Element => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
