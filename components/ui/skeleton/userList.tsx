import React from 'react'
import styled from 'styled-components'
import { SkeletonUserListItem } from 'components/ui/skeleton/userListItem'

const SkeletonUserListStyles = styled.div``

export const SkeletonUserList = ({ ...props }: BaseProps): JSX.Element => {
  return (
    <SkeletonUserListStyles {...props}>
      <SkeletonUserListItem />
      <SkeletonUserListItem />
      <SkeletonUserListItem />
      <SkeletonUserListItem />
    </SkeletonUserListStyles>
  )
}
