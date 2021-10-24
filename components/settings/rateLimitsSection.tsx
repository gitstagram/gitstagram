import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
  Panel,
  TextInfo,
  SkeletonParagraph,
  TextAttn,
  TextLink,
} from 'components/ui'
import { RateLimitTable } from 'components/settings/rateLimitTable'
import { theme } from 'styles/themes'

import { useGetRateLimitLazyQuery } from 'graphql/restOperations'

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
  // Get rate limit once per page load, cache but also refresh with network
  const [getRateLimit, { data, loading }] = useGetRateLimitLazyQuery({
    fetchPolicy: 'cache-and-network',
  })
  useEffect(() => {
    getRateLimit()
  }, [getRateLimit])

  const core = data?.rateLimit.resources.core
  const graphql = data?.rateLimit.resources.graphql
  const search = data?.rateLimit.resources.search

  return (
    <RateLimitsSectionStyles>
      <TextInfo className='limit-info'>
        Gitstagram uses Github&apos;s REST, GraphQL, and Search APIs. Requests
        are made minimally and cached locally to preserve rate limit points
        <br />
        <TextLink
          href='https://docs.github.com/en/rest/reference/rate-limit'
          external
        >
          Github rate limit details
        </TextLink>
      </TextInfo>
      {loading && data ? (
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
