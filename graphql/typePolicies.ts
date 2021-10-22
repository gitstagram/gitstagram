import { TypePolicies } from '@apollo/client'
import type { StrictTypedTypePolicies } from 'graphql/generated/apolloHelpers'
import {
  Cache_Generate_ViewerInfoFragmentDoc,
  Cache_Generate_ViewerInfoFragment,
  Cache_ViewerInfoQuery,
  Cache_ViewerInfoDocument,
  User,
} from 'graphql/generated'

export const typePolicies: TypePolicies & StrictTypedTypePolicies = {
  User: {
    keyFields: ['login'],
    merge(_, incoming: User, options) {
      const { cache, variables, fieldName } = options
      if (fieldName === 'viewer') {
        const user = cache.readFragment<Cache_Generate_ViewerInfoFragment>({
          id: cache.identify(incoming),
          fragment: Cache_Generate_ViewerInfoFragmentDoc,
          variables,
        })

        if (user) {
          const { login, name, location, twitterUsername, bio } = user

          cache.writeQuery<Cache_ViewerInfoQuery>({
            query: Cache_ViewerInfoDocument,
            data: {
              viewerInfo: {
                login,
                avatarUrl: user.avatarUrl as Maybe<string>,
                name,
                location,
                twitterUsername,
                bio,
                currentOid: user.repository?.defaultBranchRef?.target
                  ?.oid as Maybe<string>,
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
