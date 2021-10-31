import React from 'react'
import styled from 'styled-components'
import { UntilTabletLandscape } from 'components/ui'
import { times } from 'helpers'
import { theme, themeConstant } from 'styles/themes'

const SkeletonProfileStyles = styled.div`
  .profile-title-section {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .profile-icon {
    flex-shrink: 0;
    width: ${theme('sz96')};
    height: ${theme('sz96')};
    border-radius: ${theme('roundedCircle_BorderRadius')};

    ${themeConstant('media__TabletLandscape')} {
      width: ${theme('sz128')};
      height: ${theme('sz128')};
    }
  }

  .profile-title {
    width: 100%;
    max-width: ${theme('sz256')};
    height: ${theme('sz80')};
    margin-left: ${theme('sz24')};

    ${themeConstant('media__TabletLandscape')} {
      max-width: ${theme('sz512')};
      height: ${theme('sz96')};
    }
  }

  .profile-description-section {
    width: 100%;
    max-width: ${theme('sz384')};
    height: ${theme('sz96')};
    margin-top: ${theme('sz12')};
    margin-right: auto;
    margin-left: auto;

    ${themeConstant('media__TabletLandscape')} {
      margin-top: 0;
      margin-left: calc(${theme('sz256')} - ${theme('sz16')});
    }
  }

  .profile-following-banner {
    width: 100vw;
    height: ${theme('sz96')};
    margin-top: ${theme('sz16')};
    margin-left: calc(-1 * ${theme('appPadding')});
  }

  .grid {
    width: 100vw;
    max-width: ${theme('maxWidth')};
    margin-top: ${theme('sz16')};
    margin-left: calc(-1 * ${theme('appPadding')});
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
        <div className='profile-icon glb-skeleton' />
        <div className='profile-title glb-skeleton' />
      </div>
      <div className='profile-description-section glb-skeleton' />
      <UntilTabletLandscape>
        <div className='profile-following-banner glb-skeleton' />
      </UntilTabletLandscape>
      <div className='grid'>
        {times(3).map((_, index) => {
          return (
            <div className='square-row' key={index}>
              <div className='square'>
                <div className='content glb-skeleton' />
              </div>
              <div className='square'>
                <div className='content glb-skeleton' />
              </div>
              <div className='square'>
                <div className='content glb-skeleton' />
              </div>
            </div>
          )
        })}
      </div>
    </SkeletonProfileStyles>
  )
}
