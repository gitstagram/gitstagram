import React from 'react'
import { useSession } from 'next-auth/client'
import Link from 'next/link'
import styled from 'styled-components'
import { DialogStateReturn } from 'reakit/Dialog'
import { ProfileIcon } from 'components/profileIcon'
import { UserData } from 'components/profile/types'
import { FollowingButton } from 'components/profile/followingButton'
import { FollowButton } from 'components/profile/followButton'
import { FollowingBanner } from 'components/profile/followingBanner'
import { useFollowingVar } from 'components/data/gitstagramLibraryData'

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
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
  data: UserData
  followerDialog: DialogStateReturn
  followingDialog: DialogStateReturn
  bannerLoadState: LoadingStates
  bannerFollowingCount?: number
}

export const ProfileHeader = ({
  data,
  followerDialog,
  followingDialog,
  bannerLoadState,
  bannerFollowingCount,
}: ProfileProps): JSX.Element => {
  const following = useFollowingVar()
  const [session] = useSession()
  const viewerLogin = session?.user?.name

  const isViewer = viewerLogin === data.login
  const isFollowing = session && !isViewer && following.includes(data.login)
  const notFollowing = session && !isViewer && !isFollowing

  const loginTip = useTooltip()
  const nameTip = useTooltip()
  const twitterTip = useTooltip()
  const locTip = useTooltip()

  return (
    <ProfileHeaderStyles>
      <div className='profile-title-section'>
        <UntilTabletLandscape>
          <ProfileIcon
            className='profile-icon'
            url={data.avatarUrl as string}
            userLogin={data.login}
            size={96}
          />
        </UntilTabletLandscape>
        <FromTabletLandscape>
          <ProfileIcon
            className='profile-icon'
            url={data.avatarUrl as string}
            userLogin={data.login}
            size={128}
          />
        </FromTabletLandscape>
        <div className='profile-follower-actions'>
          <div className='profile-title-actions'>
            <loginTip.Ref {...loginTip.props}>
              <H2 className='profile-login-name'>{data.login}</H2>
            </loginTip.Ref>
            <loginTip.Tip {...loginTip.props}>{data.login}</loginTip.Tip>
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
            {isFollowing && <FollowingButton />}
            {notFollowing && <FollowButton />}
          </div>
          <FromTabletLandscape>
            <FollowingBanner
              data={data}
              followerDialog={followerDialog}
              followingDialog={followingDialog}
              loadState={bannerLoadState}
              followingCount={bannerFollowingCount}
            />
          </FromTabletLandscape>
        </div>
      </div>
      <div className='profile-bio-section'>
        {(data.name || data.twitterUsername) && (
          <div className='profile-names'>
            <nameTip.Ref {...nameTip.props}>
              <b className='profile-bio-name'>{data.name}</b>
            </nameTip.Ref>
            <nameTip.Tip {...nameTip.props}>{data.name}</nameTip.Tip>
            {data.twitterUsername && data.name && <Middot />}
            {data.twitterUsername && (
              <>
                <twitterTip.Ref {...twitterTip.props}>
                  <TextLink
                    className='profile-twitter-name'
                    href={`https://twitter.com/${data.twitterUsername}`}
                    external
                    deemph
                  >
                    @{data.twitterUsername}
                  </TextLink>
                </twitterTip.Ref>
                <twitterTip.Tip {...twitterTip.props}>
                  @{data.twitterUsername}
                </twitterTip.Tip>
              </>
            )}
          </div>
        )}
        {data.location && (
          <locTip.Ref {...locTip.props}>
            <TextInfo className='profile-location'>
              <Icon
                className='profile-location-icon'
                icon='geo-alt'
                ariaHidden
              />
              {data.location}
            </TextInfo>
          </locTip.Ref>
        )}
        <locTip.Tip {...locTip.props}>{data.location}</locTip.Tip>
        {data.bio && <div className='profile-bio-text'>{data.bio}</div>}
      </div>
    </ProfileHeaderStyles>
  )
}
