import React from 'react'
import { useSession } from 'next-auth/client'
import styled from 'styled-components'
import Link from 'next/link'
import { ProfileIcon } from 'components/profileIcon'
import { FollowingButton } from 'components/profile/followingButton'
import { FollowButton } from 'components/profile/followButton'
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
  TextDeemph,
} from 'components/ui'
import { toReadableNum, pluralize } from 'helpers'
import { theme, themeConstant } from 'styles/themes'
import { SETTINGS } from 'routes'

import { GetViewerGitstagramLibraryQueryResult } from 'graphql/generated'

const ProfileHeaderStyles = styled.div`
  margin-right: auto;
  margin-bottom: ${theme('sz16')};
  margin-left: auto;

  ${themeConstant('media__TabletLandscape')} {
    margin-top: ${theme('sz24')};
    margin-bottom: ${theme('sz32')};
  }

  .profile-title-section {
    display: inline-flex;
    width: 100%;
  }

  .profile-bio-section {
    margin-top: ${theme('sz12')};

    ${themeConstant('media__TabletLandscape')} {
      margin-left: calc(${theme('sz128')} + ${theme('sz24')});
    }
  }

  .profile-follower-actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
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
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .profile-icon {
    flex-shrink: 0;
  }

  .profile-title-button {
    width: 100%;
    max-width: ${theme('sz256')};
  }

  .profile-following-from-table {
    display: flex;
    margin-top: ${theme('sz24')};
  }

  .profile-following-item {
    display: flex;
    margin-right: ${theme('sz80')};

    b {
      margin-right: ${theme('sz4')};
    }

    &:last-child {
      margin-right: 0;
    }
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
  data: NonNullable<GetViewerGitstagramLibraryQueryResult['data']>['viewer']
}

export const ProfileHeader = ({ data }: ProfileProps): JSX.Element => {
  const following = useFollowingVar()
  const [session] = useSession()
  const viewerLogin = session?.user?.name

  const isViewer = viewerLogin === data.login
  const isFollowing = !isViewer && following.includes(data.login)
  const notFollowing = !isViewer && !isFollowing

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
            <H2 className='profile-login-name'>{data.login}</H2>
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
            <div className='profile-following-from-table'>
              <div className='profile-following-item'>
                <b>{toReadableNum(1789)}</b>
                <TextDeemph fontSize='normal'>
                  {pluralize({ word: 'post', number: 1789 })}
                </TextDeemph>
              </div>
              <div className='profile-following-item'>
                <b>{toReadableNum(2212321)}</b>
                <TextDeemph fontSize='normal'>
                  {pluralize({ word: 'follower', number: 2212321 })}
                </TextDeemph>
              </div>
              <div className='profile-following-item'>
                <b>{toReadableNum(14238)}</b>{' '}
                <TextDeemph fontSize='normal'>following</TextDeemph>
              </div>
            </div>
          </FromTabletLandscape>
        </div>
      </div>
      <div className='profile-bio-section'>
        {(data.name || data.twitterUsername) && (
          <div className='profile-names'>
            <b className='profile-bio-name'>{data.name}</b>
            {data.twitterUsername && data.name && <Middot />}
            {data.twitterUsername && (
              <TextLink
                className='profile-twitter-name'
                href={`https://twitter.com/${data.twitterUsername}`}
                external
                deemph
              >
                @{data.twitterUsername}
              </TextLink>
            )}
          </div>
        )}
        {data.location && (
          <TextInfo className='profile-location'>
            <Icon className='profile-location-icon' icon='geo-alt' ariaHidden />
            {data.location}
          </TextInfo>
        )}
        {data.bio && <div className='profile-bio-text'>{data.bio}</div>}
      </div>
    </ProfileHeaderStyles>
  )
}
