/* eslint-disable */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Panel, TextInfo, SkeletonParagraph, TextAttn } from 'components/ui'
import { RateLimitTable } from 'components/settings/rateLimitTable'
import { theme } from 'styles/themes'

import { useGetRateLimitLazyQuery } from 'graphql/restOperations/restQueries'

const RateLimitsSectionStyles = styled(Panel)`
  .load-paragraph {
    margin-bottom: ${theme('sz24')};
  }

  .limit-info {
    max-width: 35ch;
    margin-top: ${theme('sz12')};
    margin-right: auto;
    margin-bottom: ${theme('sz24')};
    margin-left: auto;
    text-align: center;
  }

  .resource {
    margin-bottom: ${theme('sz24')};
  }

  .resource-title {
    margin-bottom: ${theme('sz4')};
  }
`

export const RateLimitsSection = (): JSX.Element => {
  const [getRateLimit, { data, loading }] = useGetRateLimitLazyQuery({
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    getRateLimit()
  }, [])

  const core = data?.restRateLimit.resources.core
  const graphql = data?.restRateLimit.resources.graphql
  const search = data?.restRateLimit.resources.search

  return (
    <RateLimitsSectionStyles>
      <TextInfo className='limit-info'>
        Gitstagram uses Github's REST, GraphQL, and Search APIs. Requests are
        made minimally and cached locally to preserve rate limit points
      </TextInfo>
      {loading ? (
        <>
          <SkeletonParagraph className='load-paragraph' />
          <SkeletonParagraph className='load-paragraph' />
          <SkeletonParagraph className='load-paragraph' />
        </>
      ) : (
        <>
          <div className='resource'>
            <TextAttn className='resource-title'>REST API:</TextAttn>
            <RateLimitTable resource={core} />
          </div>
          <div className='resource'>
            <TextAttn className='resource-title'>GraphQL API:</TextAttn>
            <RateLimitTable resource={graphql} />
          </div>
          <div className='resource'>
            <TextAttn className='resource-title'>Search API:</TextAttn>
            <RateLimitTable resource={search} />
          </div>
        </>
      )}
    </RateLimitsSectionStyles>
  )
}
