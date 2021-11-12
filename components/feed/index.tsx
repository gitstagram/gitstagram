import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useGetFeedQuery } from 'graphql/operations'
import { GetFeedQuery } from 'graphql/generated'
import { SkeletonFeed } from 'components/feed/feedSkeleton'
import { TextLink } from 'components/ui'
import { Mistake } from 'components/mistake'
import { useViewerInfo } from 'components/data'
import { getProfilePath } from 'routes'
import { theme } from 'styles/themes'

type SearchTypes = NonNullable<GetFeedQuery['search']['nodes']>[number]
type Posts = Extract<SearchTypes, { __typename?: 'Issue' }>[]

const FeedStyles = styled.div`
  .feed-empty {
    margin-top: ${theme('sz56')};
  }
`

export const Feed = (): JSX.Element => {
  const viewerInfo = useViewerInfo()
  const viewerLogin = viewerInfo.login
  const router = useRouter()

  const { data, loading, error } = useGetFeedQuery()
  const posts =
    data?.search?.nodes?.reduce((posts, item) => {
      return item?.__typename === 'Issue' ? [...posts, item] : posts
    }, [] as Posts) || []

  return (
    <FeedStyles>
      {!posts && !error && (
        <Mistake
          className='feed-empty'
          mistake='Feed Empty!'
          mistakeDescription='Why not follow somebody?'
        >
          <TextLink href={getProfilePath(viewerLogin)} deemph>
            See your profile and followings
          </TextLink>
        </Mistake>
      )}
      {!error && loading && <SkeletonFeed />}
      {data && <>{JSON.stringify(data)}</>}
      {error && (
        <Mistake
          className='feed-error'
          mistake='FEED ISSUE'
          mistakeDescription='An issue occurred fetching feed posts. Reload to try again'
        >
          <TextLink as='button' deemph onClick={() => router.reload()}>
            Reload page
          </TextLink>
        </Mistake>
      )}
    </FeedStyles>
  )
}
