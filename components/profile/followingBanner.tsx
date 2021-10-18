import React from 'react'
import styled from 'styled-components'
import { DialogDisclosure, DialogStateReturn } from 'reakit/Dialog'
import { UserData } from 'components/profile/types'
import { TextDeemph } from 'components/ui'
import { theme, themeConstant } from 'styles/themes'
import { toReadableNum, pluralize } from 'helpers'

const FollowingBannerStyles = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: ${theme('sz8')};
  margin-bottom: ${theme('sz8')};
  text-align: center;

  ${themeConstant('media__TabletLandscape')} {
    .following-banner-item {
      display: flex;
      align-items: center;
      margin-right: ${theme('sz80')};

      b {
        margin-right: ${theme('sz4')};
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .following-load {
    width: ${theme('sz48')};
    height: ${theme('sz16')};
    margin-right: auto;
    margin-left: auto;
    ${themeConstant('media__TabletLandscape')} {
      margin-right: ${theme('sz4')};
    }
  }

  button {
    border: none;

    &:hover,
    &:focus {
      color: ${theme('font_Color__Hilite')};

      p {
        color: ${theme('font_Color__Hilite')};
      }
    }

    &:active {
      color: ${theme('font_Color__Hilite_Active')};

      p {
        color: ${theme('font_Color__Hilite_Active')};
      }
    }
  }
`

type FollowingBannerProps = {
  data: UserData
  followerDialog: DialogStateReturn
  followingDialog: DialogStateReturn
  loadState: LoadingStates
  followingCount?: number
}

export const FollowingBanner = ({
  data,
  followerDialog,
  followingDialog,
  loadState,
  followingCount,
}: FollowingBannerProps): JSX.Element => {
  const postCount = data?.repository?.issues.totalCount
  const followerCount = data?.repository?.stargazerCount

  return (
    <FollowingBannerStyles>
      <div className='following-banner-item'>
        <b>{toReadableNum(postCount)}</b>
        <TextDeemph fontSize='normal'>
          {pluralize({ word: 'post', number: postCount })}
        </TextDeemph>
      </div>
      <DialogDisclosure className='following-banner-item' {...followerDialog}>
        <b>{toReadableNum(followerCount)}</b>
        <TextDeemph fontSize='normal'>
          {pluralize({ word: 'follower', number: followerCount })}
        </TextDeemph>
      </DialogDisclosure>
      <DialogDisclosure className='following-banner-item' {...followingDialog}>
        {loadState === 'complete' ? (
          <b>{toReadableNum(followingCount)}</b>
        ) : (
          <div className='following-load skeleton' />
        )}
        <TextDeemph fontSize='normal'>following</TextDeemph>
      </DialogDisclosure>
    </FollowingBannerStyles>
  )
}
