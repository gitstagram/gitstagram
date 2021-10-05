import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/client'
import styled, { css } from 'styled-components'
import { NextImgWrapper, Icon } from 'components/ui'
import { theme } from 'styles/themes'

type ProfileIconStylesProps = {
  interactive?: boolean
  size?: 32 | 96
}

type ConditionalProps =
  | { fromSession?: never; url: string; name: string }
  | { fromSession: true; url?: never; name?: never }

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
    size === 96 &&
    css`
      width: ${theme('sz96')};
      height: ${theme('sz96')};
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
  fromSession,
  url,
  name,
  size = 32,
  ...props
}: ProfileIconProps): JSX.Element => {
  const [session] = useSession()

  const imgSrc = fromSession ? session?.user?.image : url
  const imgName = fromSession ? session?.user?.name : name

  return imgSrc && imgName ? (
    <ProfileWrapper size={size} {...props}>
      <NextImgWrapper>
        <Image
          className='profile-image'
          unoptimized
          src={imgSrc}
          layout='fill'
          alt={`${imgName}'s avatar`}
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
