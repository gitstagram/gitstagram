import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { DialogStateReturn } from 'reakit/Dialog'
import { ProfileIcon } from 'components/profileIcon'
import { FollowingButton } from 'components/profile/followingButton'
import { FollowButton } from 'components/profile/followButton'
import { FollowingBanner } from 'components/profile/followingBanner'
import { useViewerInfo } from 'components/data/useViewerInfo'
import { useUserInfo } from 'components/data/useUserInfo'
import {
  H2,
  Button,
  Icon,
  TextInfo,
  Middot,
  TextLink,
  FromTabletLandscape,
  UntilTabletLandscape,
  useTooltip,
} from 'components/ui'
import { theme, themeConstant } from 'styles/themes'
import { SETTINGS } from 'routes'

const ProfileHeaderStyles = styled.div`
  max-width: 100%;
  margin-right: auto;
  margin-bottom: ${theme('sz16')};
  margin-left: auto;

  ${themeConstant('media__TabletLandscape')} {
    margin-top: ${theme('sz24')};
    margin-bottom: ${theme('sz32')};
  }

  .profile-title-section {
    display: inline-flex;
    max-width: 100%;
  }

  .profile-bio-section {
    margin-top: ${theme('sz8')};

    ${themeConstant('media__TabletLandscape')} {
      margin-left: calc(${theme('sz128')} + ${theme('sz24')});
    }
  }

  .profile-follower-actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 100%;
    margin-left: ${theme('sz24')};
    overflow: hidden;
  }

  .profile-title-actions {
    /* select button span wrapper */
    span {
      justify-content: left;
    }

    ${themeConstant('media__TabletLandscape')} {
      display: flex;
      align-items: center;

      .profile-title-button {
        margin-left: ${theme('sz32')};
      }
    }
  }

  .profile-login-name {
    margin-bottom: ${theme('sz8')};
    overflow: hidden;
    font-size: ${theme('fontH3_FontSize')};
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  ${themeConstant('media__TabletLandscape')} {
    .profile-login-name {
      font-size: ${theme('fontH2_FontSize')};
    }
  }

  .profile-icon {
    flex-shrink: 0;
  }

  .profile-title-button {
    width: ${theme('sz160')};
  }

  .profile-names {
    display: flex;
    align-items: center;
  }

  .profile-bio-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .profile-twitter-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .profile-location {
    margin-top: ${theme('sz4')};
  }

  .profile-location-icon {
    margin-right: ${theme('sz4')};
  }

  .profile-bio-text {
    max-width: ${theme('sz384')};
    margin-top: ${theme('sz4')};
  }
`

type ProfileProps = {
  userLogin: string
  followerDialog: DialogStateReturn
  followingDialog: DialogStateReturn
}

export const ProfileHeader = ({
  userLogin,
  followerDialog,
  followingDialog,
}: ProfileProps): JSX.Element => {
  const viewerInfo = useViewerInfo()
  const userInfo = useUserInfo(userLogin)

  const isViewer = viewerInfo.login === userLogin
  const isFollowing = !isViewer && viewerInfo.followingUsers.includes(userLogin)
  const notFollowing = !isViewer && !isFollowing

  const loginTip = useTooltip('login-tooltip')
  const nameTip = useTooltip('name-tooltip')
  const twitterTip = useTooltip('twitter-tooltip')

  const userData = isViewer ? viewerInfo : userInfo

  return (
    <ProfileHeaderStyles>
      <div className='profile-title-section'>
        <UntilTabletLandscape>
          <ProfileIcon
            className='profile-icon'
            url={userData.avatarUrl as string}
            userLogin={userData.login}
            size={96}
          />
        </UntilTabletLandscape>
        <FromTabletLandscape>
          <ProfileIcon
            className='profile-icon'
            url={userData.avatarUrl as string}
            userLogin={userData.login}
            size={128}
          />
        </FromTabletLandscape>
        <div className='profile-follower-actions'>
          <div className='profile-title-actions'>
            <loginTip.Ref
              {...loginTip.props}
              as={H2}
              className='profile-login-name'
            >
              {userData.login}
            </loginTip.Ref>
            {userData.login.length > 15 && (
              <loginTip.Tip {...loginTip.props}>{userData.login}</loginTip.Tip>
            )}
            {isViewer && (
              <Link href={SETTINGS} passHref>
                <Button
                  className='profile-title-button'
                  as='a'
                  href={SETTINGS}
                  icon={{ ariaHidden: true, icon: 'gear-fill' }}
                  intent='primary-invert'
                >
                  Edit Profile
                </Button>
              </Link>
            )}
            {!isViewer && (
              <>
                <FollowingButton
                  className='profile-title-button'
                  followUserLogin={userData.login}
                  show={isFollowing}
                />
                <FollowButton
                  className='profile-title-button'
                  followUserLogin={userData.login}
                  show={notFollowing}
                />
              </>
            )}
          </div>
          <FromTabletLandscape>
            <FollowingBanner
              followerDialog={followerDialog}
              followingDialog={followingDialog}
            />
          </FromTabletLandscape>
        </div>
      </div>
      <div className='profile-bio-section'>
        {(userData.name || userData.twitterUsername) && (
          <div className='profile-names'>
            {userData.name && (
              <>
                <nameTip.Ref
                  {...nameTip.props}
                  className='profile-bio-name'
                  as='b'
                >
                  {userData.name}
                </nameTip.Ref>
                {userData.name.length > 20 && (
                  <nameTip.Tip {...nameTip.props}>{userData.name}</nameTip.Tip>
                )}
              </>
            )}
            {userData.twitterUsername && userData.name && <Middot />}
            {userData.twitterUsername && (
              <>
                <twitterTip.Ref
                  {...twitterTip.props}
                  as={TextLink}
                  className='profile-twitter-name'
                  href={`https://twitter.com/${userData.twitterUsername}`}
                  external
                  deemph
                >
                  @{userData.twitterUsername}
                </twitterTip.Ref>
                {userData.twitterUsername.length > 20 && (
                  <twitterTip.Tip {...twitterTip.props}>
                    @{userData.twitterUsername}
                  </twitterTip.Tip>
                )}
              </>
            )}
          </div>
        )}
        {userData.location && (
          <TextInfo className='profile-location'>
            <Icon className='profile-location-icon' icon='geo-alt' ariaHidden />
            {userData.location}
          </TextInfo>
        )}
        {userData.bio && <div className='profile-bio-text'>{userData.bio}</div>}
      </div>
    </ProfileHeaderStyles>
  )
}
