import React from 'react'
import styled from 'styled-components'
import { times } from 'helpers'
import { theme } from 'styles/themes'

const SkeletonProfileStyles = styled.div`
  .profile-title-section {
    display: inline-flex;
    width: 100%;
  }

  .profile-icon {
    flex-shrink: 0;
    width: ${theme('sz96')};
    height: ${theme('sz96')};
    border-radius: ${theme('roundedCircle_BorderRadius')};
  }

  .profile-title {
    width: 100%;
    height: ${theme('sz80')};
    margin-left: ${theme('sz24')};
  }

  .profile-description-section {
    width: 100%;
    height: ${theme('sz64')};
    margin-top: ${theme('sz24')};
  }

  .grid {
    width: 100vw;
    max-width: ${theme('maxWidth')};
    margin-top: ${theme('sz24')};
    margin-left: calc(-1 * ${theme('sz32')});
  }

  .square-row {
    display: flex;
    margin-bottom: ${theme('sz4')};
  }

  .square {
    position: relative;
    width: 100%;
    margin-right: ${theme('sz4')};
  }

  .square:last-child {
    margin-right: 0;
  }

  .square::after {
    display: block;
    padding-bottom: 100%;
    content: '';
  }

  .content {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`

export const SkeletonProfile = ({ ...props }: BaseProps): JSX.Element => {
  return (
    <SkeletonProfileStyles {...props}>
      <div className='profile-title-section'>
        <div className='profile-icon skeleton' />
        <div className='profile-title skeleton' />
      </div>
      <div className='profile-description-section skeleton' />
      <div className='grid'>
        {times(5).map((_, index) => {
          return (
            <div className='square-row' key={index}>
              <div className='square'>
                <div className='content skeleton' />
              </div>
              <div className='square'>
                <div className='content skeleton' />
              </div>
              <div className='square'>
                <div className='content skeleton' />
              </div>
            </div>
          )
        })}
      </div>
    </SkeletonProfileStyles>
  )
}
