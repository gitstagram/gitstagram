import React from 'react'
import styled from 'styled-components'
import { SkeletonPost } from 'components/ui/skeleton/post'
import { theme, themeConstant } from 'styles/themes'
import { times } from 'helpers'

const SkeletonFeedStyles = styled.div`
  width: 100vw;
  max-width: ${theme('sz600')};
  margin-left: calc(-1 * ${theme('appPadding')});

  ${themeConstant('media__TabletPortrait')} {
    margin-right: auto;
    margin-left: auto;
  }
`

export const SkeletonFeed = ({ ...props }: BaseProps): JSX.Element => {
  return (
    <SkeletonFeedStyles {...props}>
      {times(5).map((_, index) => (
        <SkeletonPost key={index} />
      ))}
    </SkeletonFeedStyles>
  )
}
