import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useBodyScrollListener } from 'components/hooks'
import { useGetFeedQuery, feedFetchMore } from 'graphql/operations'
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

  const { data, loading, error, fetchMore } = useGetFeedQuery()
  const posts =
    (data?.search?.nodes?.filter((item) => {
      return (
        item?.__typename === 'Issue' &&
        isGitstagramPost(item.body) &&
        item.authorAssociation === 'OWNER'
      )
    }) as Posts) || ([] as Posts)

  const handleMore = () => {
    if (data?.search.pageInfo.hasNextPage && !loading) {
      const cursor = data.search.pageInfo.endCursor
      cursor && feedFetchMore(fetchMore, cursor)
    }
  }

  useBodyScrollListener(handleMore)

  return (
    <FeedStyles>
      {posts.length === 0 && !error && (
        <Mistake
          className='feed-empty'
          mistake='Feed Empty'
          mistakeDescription='Why not follow somebody?'
        >
          <TextLink href={getProfilePath(viewerLogin)} variant='deemph'>
            See your profile and followings
          </TextLink>
        </Mistake>
      )}
      {posts.length !== 0 && (
        <div className='feed-container'>
          {posts.map((issue) => {
            const validPost = issue && isGitstagramPost(issue.body)
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
      {!error && loading && <SkeletonFeed />}
    </FeedStyles>
  )
}
