import React from 'react'
import Image from 'next/image'
import styled, { css } from 'styled-components'
import { NextImgWrapper, Icon } from 'components/ui'
import { theme } from 'styles/themes'
import { useViewerInfo } from 'components/data/useViewerInfo'

type ProfileIconStylesProps = {
  interactive?: boolean
  size?: 32 | 48 | 96 | 128
  emph?: boolean
}

type ConditionalProps =
  | { useViewer?: never; url?: string; userLogin: string }
  | { useViewer: true; url?: never; userLogin?: never }

type ProfileIconProps = ProfileIconStylesProps &
  ComponentProps &
  ConditionalProps

const ProfileWrapper = styled.div<ProfileIconStylesProps>`
  position: relative;
  border-radius: ${theme('roundedCircle_BorderRadius')};

  .profile-image {
    border-radius: ${theme('roundedCircle_BorderRadius')};
  }

  ${({ size }) =>
    size === 32 &&
    css`
      width: ${theme('sz32')};
      height: ${theme('sz32')};
    `}

  ${({ size }) =>
    size == 48 &&
    css`
      width: ${theme('sz48')};
      height: ${theme('sz48')};
    `}

  ${({ size }) =>
    size === 96 &&
    css`
      width: ${theme('sz96')};
      height: ${theme('sz96')};
    `}

  ${({ size }) =>
    size === 128 &&
    css`
      width: ${theme('sz128')};
      height: ${theme('sz128')};
    `}

  ${({ interactive }) =>
    interactive &&
    css`
      border: 1px solid ${theme('iconNav_Color')};
      cursor: pointer;

      &:hover,
      &:focus {
        border: 1px solid ${theme('iconNav_Color__Hover')};
      }

      &:active {
        border: 1px solid ${theme('iconNav_Color__Active')};
      }
    `}

  ${({ emph }) =>
    emph &&
    css`
      border: 1px solid ${theme('intentPrimary_Color')};

      &:hover,
      &:focus {
        border: 1px solid ${theme('intentPrimary_Color__Hover')};
      }

      &:active {
        border: 1px solid ${theme('intentPrimary_Color__Active')};
      }
    `}
`

const PlaceholderWrapper = styled.div<ProfileIconStylesProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme('roundedCircle_BorderRadius')};

  .profile-placeholder {
    color: ${theme('iconNav_Color')};
  }

  ${({ size }) =>
    size === 32 &&
    css`
      width: ${theme('sz32')};
      height: ${theme('sz32')};
    `}

  ${({ size }) =>
    size === 48 &&
    css`
      width: ${theme('sz48')};
      height: ${theme('sz48')};
    `}

  ${({ size }) =>
    size === 96 &&
    css`
      width: ${theme('sz96')};
      height: ${theme('sz96')};

      .profile-placeholder {
        font-size: ${theme('sz96')};
      }
    `}

  ${({ interactive }) =>
    interactive &&
    css`
      border: 1px solid ${theme('iconNav_Color')};
      cursor: pointer;

      &:hover,
      &:focus {
        border: 1px solid ${theme('iconNav_Color__Hover')};

        .profile-placeholder {
          color: ${theme('iconNav_Color__Hover')};
        }
      }

      &:active {
        border: 1px solid ${theme('iconNav_Color__Active')};

        .profile-placeholder {
          color: ${theme('iconNav_Color__Active')};
        }
      }
    `}
`

export const ProfileIcon = ({
  useViewer,
  url,
  userLogin,
  size = 32,
  ...props
}: ProfileIconProps): JSX.Element => {
  const viewerInfo = useViewerInfo()
  const viewerLogin = viewerInfo.login
  const viewerImgUrl = viewerInfo.avatarUrl

  const imgUrl = useViewer ? viewerImgUrl : url
  const imgLogin = useViewer ? viewerLogin : userLogin

  return imgUrl && imgLogin ? (
    <ProfileWrapper size={size} {...props}>
      <NextImgWrapper>
        <Image
          className='profile-image'
          unoptimized
          src={imgUrl}
          layout='fill'
          alt={`${imgLogin}'s avatar`}
        />
      </NextImgWrapper>
    </ProfileWrapper>
  ) : (
    <PlaceholderWrapper size={size} {...props}>
      <Icon
        className='profile-placeholder'
        icon='person'
        ariaLabel='Profile image placeholder'
        filled
      />
    </PlaceholderWrapper>
  )
}
