import React from 'react'
import styled from 'styled-components'
import { Hr, TextDeemph, UntilTabletLandscape } from 'components/ui'
import { theme } from 'styles/themes'
import { toReadableNum, pluralize } from 'helpers'

const FollowingBannerStyles = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: ${theme('sz24')};
  margin-bottom: ${theme('sz24')};
  text-align: center;
`

export const FollowingBanner = (): JSX.Element => {
  return (
    <UntilTabletLandscape>
      <Hr dim />
      <FollowingBannerStyles>
        <div>
          <b>{toReadableNum(1789)}</b>
          <TextDeemph fontSize='normal'>
            {pluralize({ word: 'post', number: 1789 })}
          </TextDeemph>
        </div>
        <div>
          <b>{toReadableNum(2212321)}</b>
          <TextDeemph fontSize='normal'>
            {pluralize({ word: 'follower', number: 2212321 })}
          </TextDeemph>
        </div>
        <div>
          <b>{toReadableNum(14238)}</b>{' '}
          <TextDeemph fontSize='normal'>following</TextDeemph>
        </div>
      </FollowingBannerStyles>
      <Hr dim />
    </UntilTabletLandscape>
  )
}
