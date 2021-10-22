/* eslint-disable */
import { TypePolicies } from '@apollo/client'
import type { StrictTypedTypePolicies } from 'graphql/generated/apolloHelpers'
import * as frags from 'graphql/operations/cache'
import {
  Cache_Generate_ViewerInfoFragment,
  Cache_ViewerInfoQuery,
} from 'graphql/generated'

export const typePolicies: TypePolicies & StrictTypedTypePolicies = {
  User: {
    keyFields: ['login'],
    merge(_, incoming, options) {
      const { cache, variables, fieldName } = options
      if (fieldName === 'viewer') {
        const user = cache.readFragment<Cache_Generate_ViewerInfoFragment>({
          id: cache.identify(incoming),
          fragment: frags.CACHE_Generate_ViewerInfo,
          variables,
        })

        if (user) {
          const { login, avatarUrl, name, location, twitterUsername, bio } =
            user

          cache.writeQuery<Cache_ViewerInfoQuery>({
            query: frags.CACHE_ViewerInfo,
            data: {
              viewerInfo: {
                login,
                avatarUrl,
                name,
                location,
                twitterUsername,
                bio,
                currentOid: user.repository?.defaultBranchRef?.target?.oid,
                stargazerCount: user.repository?.stargazerCount,
                issuesTotalCount: user.repository?.issues.totalCount,
                following: [],
                followingTags: [],
                saved: [],
              },
            },
          })
        }
      }

      return incoming
    },
  },
  Repository: {
    keyFields: ['nameWithOwner'],
  },
  Issue: {
    keyFields: ['number'],
  },
}
