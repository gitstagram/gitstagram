import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useGetFeedQuery } from 'graphql/operations'
import { GetFeedQuery } from 'graphql/generated'
import { SkeletonFeed } from 'components/feed/feedSkeleton'
import { FeedPost } from 'components/feed/feedPost'
import { TextLink } from 'components/ui'
import { Mistake } from 'components/mistake'
import { useViewerInfo } from 'components/data'
import { isGitstagramPost } from 'helpers'
import { getProfilePath } from 'routes'
import { theme, themeConstant } from 'styles/themes'

type SearchTypes = NonNullable<GetFeedQuery['search']['nodes']>[number]
type Posts = Extract<SearchTypes, { __typename?: 'Issue' }>[]

const FeedStyles = styled.div`
  .feed-empty {
    margin-top: ${theme('sz56')};
  }

  .feed-container {
    width: 100vw;
    max-width: ${theme('sz600')};
    margin-left: calc(-1 * ${theme('appPadding')});

    ${themeConstant('media__TabletPortrait')} {
      margin-right: auto;
      margin-left: auto;
    }
  }
`

export const Feed = (): JSX.Element => {
  const viewerInfo = useViewerInfo()
  const viewerLogin = viewerInfo.login
  const router = useRouter()

  const { data, loading, error } = useGetFeedQuery()
  const posts =
    data?.search?.nodes?.reduce((posts, item) => {
      return item?.__typename === 'Issue' &&
        isGitstagramPost(item.bodyText) &&
        item.authorAssociation === 'OWNER'
        ? [...posts, item]
        : posts
    }, [] as Posts) || []

  return (
    <FeedStyles>
      {!posts && !error && (
        <Mistake
          className='feed-empty'
          mistake='Feed Empty!'
          mistakeDescription='Why not follow somebody?'
        >
          <TextLink href={getProfilePath(viewerLogin)} variant='deemph'>
            See your profile and followings
          </TextLink>
        </Mistake>
      )}
      {!error && loading && <SkeletonFeed />}
      {data && (
        <div className='feed-container'>
          {posts.map((issue) => {
            const validPost = issue && isGitstagramPost(issue.bodyText)
            return validPost ? <FeedPost key={issue.id} issue={issue} /> : null
          })}
        </div>
      )}
      {error && (
        <Mistake
          className='feed-error'
          mistake='FEED ISSUE'
          mistakeDescription='An issue occurred fetching feed posts. Reload to try again'
        >
          <TextLink
            as='button'
            variant='deemph'
            onClick={() => router.reload()}
          >
            Reload page
          </TextLink>
        </Mistake>
      )}
    </FeedStyles>
  )
}
