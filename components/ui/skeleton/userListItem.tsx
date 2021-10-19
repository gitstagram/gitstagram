import React from 'react'
import styled from 'styled-components'
import { theme } from 'styles/themes'

const SkeletonUserListItemStyles = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: ${theme('sz64')};
  padding: ${theme('sz12')};

  .user-img {
    width: ${theme('sz32')};
    height: ${theme('sz32')};
    margin-right: ${theme('sz12')};
    border-radius: ${theme('roundedCircle_BorderRadius')};
  }

  .user-info {
    width: 45%;
    height: ${theme('sz32')};
    margin-right: ${theme('sz24')};
  }

  .user-action {
    position: absolute;
    right: ${theme('sz12')};
    width: ${theme('sz80')};
    height: ${theme('sz24')};
  }
`

export const SkeletonUserListItem = ({ ...props }: BaseProps): JSX.Element => {
  return (
    <SkeletonUserListItemStyles {...props}>
      <div className='user-img skeleton' />
      <div className='user-info skeleton' />
      <div className='user-action skeleton' />
    </SkeletonUserListItemStyles>
  )
}
