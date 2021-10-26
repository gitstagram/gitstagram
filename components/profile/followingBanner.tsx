import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { DialogDisclosure, DialogStateReturn } from 'reakit/Dialog'
import { TextDeemph } from 'components/ui'
import { theme, themeConstant } from 'styles/themes'
import { toReadableNum, pluralize } from 'helpers'
import { useUserInfo } from 'components/data/useUserInfo'
import { useViewerInfo } from 'components/data/useViewerInfo'
import { UserHasBeen } from 'graphql/generated'

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
  followerDialog: DialogStateReturn
  followingDialog: DialogStateReturn
}

export const FollowingBanner = ({
  followerDialog,
  followingDialog,
}: FollowingBannerProps): JSX.Element => {
  const router = useRouter()
  const userLogin = router.query.userLogin as string
  const userInfo = useUserInfo(userLogin)
  const viewerInfo = useViewerInfo()
  const isViewer = viewerInfo.login === userLogin

  const postCount = isViewer
    ? viewerInfo.issuesTotalCount
    : userInfo.issuesTotalCount
  const followingCount = isViewer
    ? viewerInfo.followingUsers.length
    : userInfo.followingUsers?.length

  let followerCount
  if (isViewer) {
    followerCount = viewerInfo.stargazerCount
  } else {
    const adjustmentMap = {
      [UserHasBeen.Untouched]: 0,
      [UserHasBeen.Followed]: 1,
      [UserHasBeen.Unfollowed]: -1,
    }
    const adjustment = adjustmentMap[userInfo.hasBeen]
    const stargazerCount = userInfo.stargazerCount || 0
    followerCount = stargazerCount + adjustment
  }

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
        <b>{toReadableNum(followingCount)}</b>
        <TextDeemph fontSize='normal'>following</TextDeemph>
      </DialogDisclosure>
    </FollowingBannerStyles>
  )
}
