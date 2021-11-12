import React from 'react'
import styled from 'styled-components'
import { Panel } from 'components/ui'
import { theme } from 'styles/themes'

const SkeletonPostStyles = styled.div`
  margin-bottom: ${theme('sz24')};

  .post-panel {
    padding: 0;
  }

  .post-header {
    display: flex;
    align-items: center;
    height: ${theme('sz64')};
  }

  .post-user {
    width: ${theme('sz32')};
    height: ${theme('sz32')};
    margin-right: ${theme('sz12')};
    margin-left: ${theme('sz24')};
    border-radius: ${theme('roundedCircle_BorderRadius')};
  }

  .post-user-login {
    width: ${theme('sz96')};
    height: ${theme('font_FontSize')};
  }

  .post-square {
    position: relative;
    width: 100%;
    border-top-left-radius: ${theme('roundedNone')};
    border-top-right-radius: ${theme('roundedNone')};
  }

  .post-square::after {
    display: block;
    padding-bottom: 100%;
    content: '';
  }
`

export const SkeletonPost = ({ ...props }: BaseProps): JSX.Element => {
  return (
    <SkeletonPostStyles {...props}>
      <Panel className='post-panel'>
        <div className='post-header'>
          <div className='post-user glb-skeleton' />
          <div className='post-user-login glb-skeleton' />
        </div>
        <div className='post-square glb-skeleton'></div>
      </Panel>
    </SkeletonPostStyles>
  )
}
