import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/client'
import styled from 'styled-components'
import { NextImgWrapper, Icon } from 'components/ui'
import { theme } from 'styles/themes'

const ProfileWrapper = styled.div`
  position: relative;
  width: ${theme('sz32')};
  height: ${theme('sz32')};
  border: 1px solid ${theme('iconNav_Color')};
  border-radius: ${theme('roundedCircle_BorderRadius')};

  .profile-image {
    border-radius: ${theme('roundedCircle_BorderRadius')};
  }

  &:hover,
  &:focus {
    border: 1px solid ${theme('iconNav_Color__Hover')};
  }

  &:active {
    border: 1px solid ${theme('iconNav_Color__Active')};
  }
`

const PlaceholderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${theme('sz32')};
  height: ${theme('sz32')};
  border: 1px solid ${theme('iconNav_Color')};
  border-radius: ${theme('roundedCircle_BorderRadius')};

  .profile-placeholder {
    color: ${theme('iconNav_Color')};
  }

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
`

export const ProfileIcon = (): JSX.Element => {
  const [session] = useSession()

  return session?.user?.image ? (
    <ProfileWrapper>
      <NextImgWrapper>
        <Image
          className='profile-image'
          unoptimized
          src={session.user.image}
          layout='fill'
          alt={`${session.user.name}'s avatar`}
        />
      </NextImgWrapper>
    </ProfileWrapper>
  ) : (
    <PlaceholderWrapper>
      <Icon
        className='profile-placeholder'
        icon='person'
        ariaLabel='Profile image placeholder'
        filled
      />
    </PlaceholderWrapper>
  )
}
